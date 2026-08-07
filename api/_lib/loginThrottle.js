/**
 * Sign-in throttling, shared by the admin and student portals.
 *
 * scrypt already makes a single guess expensive, which is a different property
 * from limiting how many guesses are available. Without a cap, someone working
 * through a leaked password list gets as many tries as they have patience for;
 * the cost per guess only decides how long that takes.
 *
 * Counted per address *and* per IP. Per-address alone lets one host spray a
 * single common password across many accounts — each address stays under its
 * own limit while the host works through the whole directory.
 */

import { query } from "./db.js";
import { tooManyRequests } from "./http.js";

const WINDOW = "15 minutes";

/** Failed sign-ins allowed per address before it is paused. */
const MAX_FAILURES_PER_IDENTIFIER = 10;

/** Failed sign-ins allowed per IP across every address it tries. */
const MAX_FAILURES_PER_IP = 50;

/**
 * Refuse the attempt if either budget is spent.
 *
 * Both limits answer with the same message. Telling the caller which one they
 * hit would say whether the address exists and is being targeted, or whether
 * they are simply on a busy network.
 */
export async function assertLoginAllowed({ email, ip }) {
  const identifier = String(email ?? "").trim().toLowerCase();

  const { rows } = await query(
    `SELECT
       count(*) FILTER (
         WHERE identifier = $1 AND created_at > now() - interval '${WINDOW}'
       )::int AS by_identifier,
       count(*) FILTER (
         WHERE request_ip = $2 AND $2 <> '' AND created_at > now() - interval '${WINDOW}'
       )::int AS by_ip
     FROM login_attempts`,
    [identifier, ip || ""]
  );

  const { by_identifier: byIdentifier, by_ip: byIp } = rows[0];

  if (byIdentifier >= MAX_FAILURES_PER_IDENTIFIER || byIp >= MAX_FAILURES_PER_IP) {
    throw tooManyRequests(
      "Too many sign-in attempts. Wait a few minutes and try again."
    );
  }
}

export async function recordLoginFailure({ email, ip, portal }) {
  await query(
    `INSERT INTO login_attempts (identifier, request_ip, portal)
     VALUES ($1, $2, $3)`,
    [String(email ?? "").trim().toLowerCase(), ip || "", portal]
  );
}

/** Signing in successfully returns the address's full budget. */
export async function clearLoginFailures(email) {
  await query("DELETE FROM login_attempts WHERE identifier = $1", [
    String(email ?? "").trim().toLowerCase(),
  ]);
}

/**
 * Drop rows no counter looks at any more.
 *
 * Called opportunistically rather than on a schedule — there is no cron in a
 * serverless deployment, and a table that only ever grows is its own problem.
 * The guard keeps it to roughly once an hour per warm instance.
 */
let lastPurge = 0;
export async function purgeOldLoginAttempts() {
  const now = Date.now();
  if (now - lastPurge < 60 * 60 * 1000) return;
  lastPurge = now;
  await query(
    "DELETE FROM login_attempts WHERE created_at < now() - interval '7 days'"
  ).catch(() => {});
}
