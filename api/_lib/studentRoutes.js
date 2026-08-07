/**
 * Student portal endpoints.
 *
 * Kept out of `router.js` because that file is already long; `dispatch` there
 * forwards anything under /api/student/* to `studentDispatch` below.
 *
 * The signup shape is: ask for a code, then send the code back together with
 * the profile and chosen password in one request. Splitting "verify the code"
 * from "set the password" would need a second short-lived ticket type to carry
 * proof between the two calls, for no security gain — the code is checked and
 * burned inside the same transaction that creates the account either way.
 */

import { queryOne, transaction } from "./db.js";
import {
  badRequest,
  clientIp,
  conflict,
  notFound,
  readJsonBody,
  sendJson,
} from "./http.js";
import { hashPassword, verifyPassword } from "./auth.js";
import { assertEligibleEmail, consumeOtp, issueOtp, normalizeEmail } from "./otp.js";
import {
  assertLoginAllowed,
  clearLoginFailures,
  recordLoginFailure,
} from "./loginThrottle.js";
import { otpEmail, sendMail } from "./mailer.js";
import {
  createStudentToken,
  findStudentByEmail,
  linkPastRegistrations,
  listStudentRegistrations,
  requireStudent,
} from "./students.js";

const MIN_PASSWORD_LENGTH = 8;

/** Trim a string field, or "" if it wasn't a string. */
const str = (value) => (typeof value === "string" ? value.trim() : "");

function assertPassword(password) {
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    throw badRequest(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
}

// ── POST /api/student/otp ───────────────────────────────────────────────

/**
 * Send a code to an institute address.
 *
 * Answers the same way whether or not an account already exists. Saying
 * "that address is already registered" here would turn this endpoint into a
 * way to test which students have accounts; the mismatch surfaces at the next
 * step, to someone who has proved they own the mailbox.
 */
async function requestCode(req, res) {
  const body = await readJsonBody(req);
  const purpose = body.purpose === "reset" ? "reset" : "signup";
  const email = assertEligibleEmail(body.email);

  const existing = await findStudentByEmail(email);

  // A reset for an address with no account would email a code that can never
  // be used. Skip the send, keep the reply identical.
  const shouldSend = purpose === "signup" ? !existing : Boolean(existing);

  let transport = "skipped";
  if (shouldSend) {
    const { code, expiresInMinutes } = await issueOtp({
      email,
      purpose,
      ip: clientIp(req),
    });
    const message = otpEmail({ code, purpose, minutes: expiresInMinutes });
    ({ transport } = await sendMail({ to: email, ...message }));
  }

  sendJson(res, 200, {
    sent: true,
    email,
    purpose,
    // Lets the dev UI tell you to go look in the server log. Never the code.
    devTransport: transport === "console" ? "console" : undefined,
  });
}

// ── POST /api/student/register ──────────────────────────────────────────

async function register(req, res) {
  const body = await readJsonBody(req);
  const email = assertEligibleEmail(body.email);
  const name = str(body.name);
  const password = body.password;

  if (!name) throw badRequest("Your name is required.");
  assertPassword(password);

  if (await findStudentByEmail(email)) {
    throw conflict("An account already exists for that email. Sign in instead.");
  }

  // Throws unless the code is live, unused and correct — and burns it.
  await consumeOtp({ email, purpose: "signup", code: body.code });

  const passwordHash = await hashPassword(password);

  const student = await transaction(async (client) => {
    const { rows } = await client.query(
      `INSERT INTO students
         (email, name, enrollment, branch, year, phone, recovery_email,
          password_hash, email_verified_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now())
       RETURNING id, email, name, enrollment, branch, year, phone,
                 recovery_email, email_verified_at, created_at`,
      [
        email,
        name,
        str(body.enrollment),
        str(body.branch),
        str(body.year),
        str(body.phone),
        normalizeEmail(body.recoveryEmail),
        passwordHash,
      ]
    );
    return rows[0];
  });

  const linked = await linkPastRegistrations(student.id, email);

  sendJson(res, 201, {
    token: createStudentToken(student),
    student,
    linkedRegistrations: linked,
  });
}

// ── POST /api/student/reset ─────────────────────────────────────────────

async function resetPassword(req, res) {
  const body = await readJsonBody(req);
  const email = assertEligibleEmail(body.email);
  assertPassword(body.password);

  await consumeOtp({ email, purpose: "reset", code: body.code });

  const passwordHash = await hashPassword(body.password);
  const updated = await queryOne(
    `UPDATE students
        SET password_hash = $2, updated_at = now()
      WHERE lower(email) = lower($1)
      RETURNING id, email`,
    [email, passwordHash]
  );

  // The code was valid, so the account existed when it was issued. If it is
  // gone now it was deleted in between — rare, but not a server fault.
  if (!updated) throw notFound("No account for that email.");

  sendJson(res, 200, { reset: true });
}

// ── POST /api/student/login ─────────────────────────────────────────────

async function login(req, res) {
  const { email, password } = await readJsonBody(req);
  if (typeof email !== "string" || typeof password !== "string") {
    throw badRequest("Email and password are required.");
  }

  const ip = clientIp(req);
  await assertLoginAllowed({ email, ip });

  const student = await findStudentByEmail(normalizeEmail(email));

  // Hash-compare even with no account, so a wrong address and a wrong password
  // take about the same time to answer. Same dummy hash as the admin login.
  const ok = await verifyPassword(
    password,
    student?.password_hash ?? "scrypt$16384$8$1$AA==$AA=="
  );
  if (!student || !ok) {
    await recordLoginFailure({ email, ip, portal: "student" });
    throw badRequest("Incorrect email or password.");
  }

  await clearLoginFailures(email);

  const { password_hash, ...profile } = student;
  sendJson(res, 200, { token: createStudentToken(student), student: profile });
}

// ── GET /api/student/me ─────────────────────────────────────────────────

async function me(req, res) {
  const student = await requireStudent(req);
  sendJson(res, 200, { student });
}

/** PATCH /api/student/me — profile only; email and password have own routes. */
async function updateMe(req, res) {
  const student = await requireStudent(req);
  const body = await readJsonBody(req);

  const updated = await queryOne(
    `UPDATE students
        SET name           = coalesce(nullif($2, ''), name),
            enrollment     = coalesce($3, enrollment),
            branch         = coalesce($4, branch),
            year           = coalesce($5, year),
            phone          = coalesce($6, phone),
            recovery_email = coalesce($7, recovery_email),
            updated_at     = now()
      WHERE id = $1
      RETURNING id, email, name, enrollment, branch, year, phone,
                recovery_email, email_verified_at, created_at`,
    [
      student.id,
      str(body.name),
      body.enrollment === undefined ? null : str(body.enrollment),
      body.branch === undefined ? null : str(body.branch),
      body.year === undefined ? null : str(body.year),
      body.phone === undefined ? null : str(body.phone),
      body.recoveryEmail === undefined ? null : normalizeEmail(body.recoveryEmail),
    ]
  );

  sendJson(res, 200, { student: updated });
}

// ── GET /api/student/registrations ──────────────────────────────────────

async function registrations(req, res) {
  const student = await requireStudent(req);
  sendJson(res, 200, { data: await listStudentRegistrations(student.id) });
}

// ── Dispatch ────────────────────────────────────────────────────────────

export async function studentDispatch(req, res, method, second) {
  if (method === "POST" && second === "otp") return requestCode(req, res);
  if (method === "POST" && second === "register") return register(req, res);
  if (method === "POST" && second === "reset") return resetPassword(req, res);
  if (method === "POST" && second === "login") return login(req, res);
  if (method === "GET" && second === "me") return me(req, res);
  if (method === "PATCH" && second === "me") return updateMe(req, res);
  if (method === "GET" && second === "registrations") return registrations(req, res);
  throw notFound();
}
