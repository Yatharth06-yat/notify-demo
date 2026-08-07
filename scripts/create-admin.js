#!/usr/bin/env node
/**
 * Create (or re-password) an admin account.
 *
 *   npm run db:create-admin -- you@example.com 'a-strong-password' 'Your Name' 'Super Admin'
 *
 * Role defaults to "Super Admin" for the very first account and "Volunteer"
 * afterwards. Re-running with an existing email resets that account's password
 * — which is the way back in if you lock yourself out.
 */
import { loadDotEnv } from "./env.js";

loadDotEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. See .env.example.");
  process.exit(1);
}

const [email, password, name, role] = process.argv.slice(2);

if (!email || !password) {
  console.error(
    "Usage: npm run db:create-admin -- <email> <password> [name] [role]\n" +
      "Roles: Super Admin | Faculty | Coordinator | Volunteer"
  );
  process.exit(1);
}

if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const { getPool } = await import("../api/_lib/db.js");
const { hashPassword, ROLES } = await import("../api/_lib/auth.js");

const pool = getPool();

try {
  const { rows: existing } = await pool.query(
    "SELECT count(*)::int AS n FROM admins"
  );
  const chosenRole = role || (existing[0].n === 0 ? "Super Admin" : "Volunteer");

  if (!ROLES.includes(chosenRole)) {
    console.error(`Unknown role "${chosenRole}". Valid roles: ${ROLES.join(", ")}`);
    process.exit(1);
  }

  const hash = await hashPassword(password);
  const { rows } = await pool.query(
    `INSERT INTO admins (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (lower(email)) DO UPDATE
       SET password_hash = EXCLUDED.password_hash,
           name = EXCLUDED.name,
           role = EXCLUDED.role,
           updated_at = now()
     RETURNING id, name, email, role, (xmax = 0) AS inserted`,
    [name || email, email.trim().toLowerCase(), hash, chosenRole]
  );

  const admin = rows[0];
  console.log(
    `${admin.inserted ? "Created" : "Updated"} ${admin.role}: ${admin.email} (${admin.id})`
  );
  console.log("Sign in at /admin with that email and password.");
} catch (error) {
  console.error("Failed:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
