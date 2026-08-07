/**
 * Student accounts — sessions and the queries behind the student portal.
 *
 * Deliberately separate from `auth.js`: students and admins are different
 * populations with different lifecycles, and the one thing they must never
 * share is a token that works in both places. They do share the crypto —
 * scrypt hashing and HMAC signing come from `auth.js` rather than being
 * reimplemented here.
 */

import { query, queryOne } from "./db.js";
import { bearerToken, createSignedToken, verifyToken } from "./auth.js";
import { unauthorized } from "./http.js";

const AUDIENCE = "student";

/** Columns safe to hand back to the browser — never `password_hash`. */
const PUBLIC_COLUMNS = `
  id, email, recovery_email, name, enrollment, branch, year, phone,
  email_verified_at, created_at
`;

export const createStudentToken = (student) =>
  createSignedToken({ sub: student.id, email: student.email, audience: AUDIENCE });

/**
 * Resolve the signed-in student, or null.
 *
 * Re-read from the database on every request rather than trusted from the
 * token, matching `currentAdmin` — a deleted account stops working at once
 * instead of whenever its token happens to expire.
 */
export async function currentStudent(req) {
  const claims = verifyToken(bearerToken(req));
  if (!claims?.sub) return null;
  if (claims.aud !== AUDIENCE) return null;

  return queryOne(`SELECT ${PUBLIC_COLUMNS} FROM students WHERE id = $1`, [claims.sub]);
}

/** Like `currentStudent`, but 401s instead of returning null. */
export async function requireStudent(req) {
  const student = await currentStudent(req);
  if (!student) throw unauthorized("Sign in to continue");
  return student;
}

export async function findStudentByEmail(email) {
  return queryOne(
    `SELECT ${PUBLIC_COLUMNS}, password_hash FROM students WHERE lower(email) = lower($1)`,
    [email]
  );
}

export async function studentPublicView(id) {
  return queryOne(`SELECT ${PUBLIC_COLUMNS} FROM students WHERE id = $1`, [id]);
}

/**
 * Attach past registrations to a newly created account.
 *
 * Matched on the email the student just proved they own, and only rows that
 * aren't already claimed. Runs at account creation rather than as a background
 * sweep so a student never sees someone else's booking because two people once
 * typed the same address.
 */
export async function linkPastRegistrations(studentId, email) {
  const { rowCount } = await query(
    `UPDATE registrations
        SET student_id = $1
      WHERE student_id IS NULL
        AND lower(email) = lower($2)`,
    [studentId, email]
  );
  return rowCount;
}

/** A student's own bookings, newest first, with the workshop joined on. */
export async function listStudentRegistrations(studentId) {
  const { rows } = await query(
    `SELECT r.id, r.workshop_id, r.workshop_title, r.status, r.amount,
            r.coupon_code, r.created_at, r.reviewed_at,
            w.date AS workshop_date, w.time AS workshop_time,
            w.venue, w.speaker, w.category, w.banner
       FROM registrations r
       LEFT JOIN workshops w ON w.id = r.workshop_id
      WHERE r.student_id = $1
      ORDER BY r.created_at DESC`,
    [studentId]
  );
  return rows;
}
