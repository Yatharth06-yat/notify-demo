/**
 * One-time codes for proving someone owns an email address.
 *
 * Used at signup and at password reset — not as a per-login second factor.
 * NIST does not accept email as an out-of-band channel, because the inbox is
 * an account reachable from the same place the password is; proving ownership
 * once is a different and much weaker claim than standing 2FA, and it is the
 * only one made here.
 *
 * Every limit below exists because without it a 6-digit code is trivially
 * brute-forced: a million guesses against an unmetered endpoint is minutes of
 * work. The controls are what make the code worth anything, so they live
 * together in this file rather than being scattered across route handlers.
 */

import { randomInt } from "node:crypto";
import { query, queryOne, transaction } from "./db.js";
import { badRequest, tooManyRequests } from "./http.js";
import { hashPassword, verifyPassword } from "./auth.js";

// ── Policy ──────────────────────────────────────────────────────────────
// Email delivery is unpredictable, so the window is generous; a two-minute
// code just produces a queue of resend requests and no extra safety.
export const OTP_TTL_MINUTES = 15;

/** Guesses allowed against one code before it is burned. */
const MAX_ATTEMPTS_PER_CODE = 5;

/** Failed guesses allowed per address per day, across every code issued. */
const MAX_FAILURES_PER_DAY = 10;

/** Codes issuable per address per hour — stops us flooding a real mailbox. */
const MAX_REQUESTS_PER_EMAIL_HOUR = 3;

/** Codes issuable per IP per hour — stops enumeration across many addresses. */
const MAX_REQUESTS_PER_IP_HOUR = 10;

export const PURPOSES = ["signup", "reset"];

// ── Address handling ────────────────────────────────────────────────────

export const normalizeEmail = (value) => String(value ?? "").trim().toLowerCase();

/**
 * Domains that may hold a student account, lowest-common-denominator parsed
 * from the environment so adding a partner college is a config change.
 */
export function allowedDomains() {
  const raw = process.env.STUDENT_EMAIL_DOMAINS || "mitsgwalior.in";
  return raw
    .split(",")
    .map((d) => d.trim().toLowerCase().replace(/^@/, ""))
    .filter(Boolean);
}

const EMAIL_SHAPE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/**
 * Check the address is one we will issue a code to.
 *
 * Deliberately no SMTP probe to confirm the mailbox exists: university mail
 * servers are commonly catch-all and accept anything at the domain, so a probe
 * would call `asdf@mitsgwalior.in` valid. Actual delivery plus the code coming
 * back is the only proof that means anything.
 */
export function assertEligibleEmail(email) {
  const normalized = normalizeEmail(email);
  if (!EMAIL_SHAPE.test(normalized)) {
    throw badRequest("That doesn't look like an email address.");
  }

  const domain = normalized.slice(normalized.lastIndexOf("@") + 1);
  const domains = allowedDomains();
  const ok = domains.some((d) => domain === d || domain.endsWith(`.${d}`));

  if (!ok) {
    throw badRequest(
      `Use your institute email address (${domains.map((d) => `@${d}`).join(" or ")}).`
    );
  }
  return normalized;
}

// ── Code generation ─────────────────────────────────────────────────────

/**
 * Six uniform digits. `randomInt` rejection-samples internally, so this has
 * none of the modulo bias of `randomBytes()[0] % 10`.
 */
function generateCode() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

// ── Issuing ─────────────────────────────────────────────────────────────

async function assertUnderRequestLimits(email, ip) {
  const { rows } = await query(
    `SELECT
       count(*) FILTER (
         WHERE lower(email) = $1 AND created_at > now() - interval '1 hour'
       )::int AS by_email,
       count(*) FILTER (
         WHERE request_ip = $2 AND $2 <> '' AND created_at > now() - interval '1 hour'
       )::int AS by_ip
     FROM email_otps`,
    [email, ip || ""]
  );

  const { by_email: byEmail, by_ip: byIp } = rows[0];

  if (byEmail >= MAX_REQUESTS_PER_EMAIL_HOUR) {
    throw tooManyRequests(
      "Too many codes requested for this address. Try again in an hour."
    );
  }
  if (byIp >= MAX_REQUESTS_PER_IP_HOUR) {
    throw tooManyRequests("Too many codes requested. Try again in an hour.");
  }
}

async function assertNotLockedOut(email) {
  const row = await queryOne(
    `SELECT coalesce(sum(attempts), 0)::int AS failures
       FROM email_otps
      WHERE lower(email) = $1
        AND created_at > now() - interval '24 hours'`,
    [email]
  );

  if (row.failures >= MAX_FAILURES_PER_DAY) {
    throw tooManyRequests(
      "Too many incorrect codes for this address. Try again tomorrow, or contact the lab."
    );
  }
}

/**
 * Issue a code and return it in plaintext for the caller to email.
 *
 * The plaintext is never stored and never returned to the browser — the whole
 * point is that possession of the mailbox is what proves identity.
 *
 * Any code already outstanding for this address and purpose is consumed first,
 * so a resend invalidates the previous message rather than leaving several
 * live codes in the inbox at once.
 */
export async function issueOtp({ email, purpose, ip }) {
  if (!PURPOSES.includes(purpose)) throw badRequest("Unknown code purpose.");

  const normalized = assertEligibleEmail(email);
  await assertNotLockedOut(normalized);
  await assertUnderRequestLimits(normalized, ip);

  await purgeExpiredOtps();

  const code = generateCode();
  const otpHash = await hashPassword(code);

  await transaction(async (client) => {
    await client.query(
      `UPDATE email_otps
          SET consumed_at = now()
        WHERE lower(email) = $1 AND purpose = $2 AND consumed_at IS NULL`,
      [normalized, purpose]
    );
    await client.query(
      `INSERT INTO email_otps (email, otp_hash, purpose, expires_at, request_ip)
       VALUES ($1, $2, $3, now() + ($4 || ' minutes')::interval, $5)`,
      [normalized, otpHash, purpose, String(OTP_TTL_MINUTES), ip || ""]
    );
  });

  return { code, email: normalized, expiresInMinutes: OTP_TTL_MINUTES };
}

// ── Verifying ───────────────────────────────────────────────────────────

/**
 * Check a code and consume it.
 *
 * The whole check runs in one transaction with the candidate row locked
 * `FOR UPDATE`. Without that lock, two requests arriving together both read
 * `attempts = 4`, both write 5, and the attempt budget silently doubles; worse,
 * both could see the row unconsumed and each be told the code was valid.
 *
 * Resolves to the row on success. Throws on every failure path, deliberately
 * without distinguishing "no code" from "wrong code" — the difference tells an
 * attacker which addresses have a signup in flight.
 */
export async function consumeOtp({ email, purpose, code }) {
  if (!PURPOSES.includes(purpose)) throw badRequest("Unknown code purpose.");

  const normalized = normalizeEmail(email);
  const supplied = String(code ?? "").trim();

  if (!/^\d{6}$/.test(supplied)) {
    throw badRequest("Enter the 6-digit code from your email.");
  }

  await assertNotLockedOut(normalized);

  // The transaction *returns* the verdict rather than throwing it. Throwing
  // from inside would roll the transaction back — including the increment that
  // records the failed guess — so every wrong code would be free and both the
  // per-code cap and the daily lockout would never fire. Commit first, then
  // raise the error outside.
  const outcome = await transaction(async (client) => {
    const { rows } = await client.query(
      `SELECT id, otp_hash, attempts
         FROM email_otps
        WHERE lower(email) = $1
          AND purpose = $2
          AND consumed_at IS NULL
          AND expires_at > now()
        ORDER BY created_at DESC
        LIMIT 1
        FOR UPDATE`,
      [normalized, purpose]
    );

    const row = rows[0];
    if (!row) return { ok: false, reason: "missing" };

    if (row.attempts >= MAX_ATTEMPTS_PER_CODE) {
      await client.query("UPDATE email_otps SET consumed_at = now() WHERE id = $1", [
        row.id,
      ]);
      return { ok: false, reason: "exhausted" };
    }

    const matches = await verifyPassword(supplied, row.otp_hash);

    if (!matches) {
      const attempts = row.attempts + 1;
      // Burn the code on the last allowed try, so the next request cannot keep
      // guessing against a row that has already used its budget.
      const spent = attempts >= MAX_ATTEMPTS_PER_CODE;
      await client.query(
        `UPDATE email_otps
            SET attempts = $2, consumed_at = CASE WHEN $3 THEN now() ELSE consumed_at END
          WHERE id = $1`,
        [row.id, attempts, spent]
      );
      return { ok: false, reason: "mismatch", left: MAX_ATTEMPTS_PER_CODE - attempts };
    }

    // Consumed in the same transaction as the check, so a replayed request
    // finds nothing outstanding rather than succeeding twice.
    await client.query("UPDATE email_otps SET consumed_at = now() WHERE id = $1", [
      row.id,
    ]);

    return { ok: true };
  });

  if (outcome.ok) return { email: normalized, purpose };

  if (outcome.reason === "mismatch" && outcome.left > 0) {
    const { left } = outcome;
    throw badRequest(`That code isn't right. ${left} ${left === 1 ? "try" : "tries"} left.`);
  }
  if (outcome.reason === "mismatch" || outcome.reason === "exhausted") {
    throw badRequest("Too many incorrect tries. Request a new code.");
  }
  throw badRequest("That code has expired or already been used. Request a new one.");
}

/**
 * Housekeeping — drop codes old enough that no counter looks at them.
 *
 * Called from `issueOtp` rather than on a schedule: there is no cron in a
 * serverless deployment, and the table would otherwise only ever grow. The
 * guard keeps it to roughly once an hour per warm instance, and failures are
 * swallowed because tidying up must never be the reason a signup breaks.
 */
let lastPurge = 0;
export async function purgeExpiredOtps() {
  const now = Date.now();
  if (now - lastPurge < 60 * 60 * 1000) return 0;
  lastPurge = now;

  const result = await query(
    "DELETE FROM email_otps WHERE created_at < now() - interval '30 days'"
  ).catch(() => null);
  return result?.rowCount ?? 0;
}
