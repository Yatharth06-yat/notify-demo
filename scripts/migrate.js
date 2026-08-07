#!/usr/bin/env node
/**
 * Apply db/schema.sql to the database in DATABASE_URL.
 *
 *   npm run db:migrate
 *
 * Every statement in the schema is idempotent, so this is safe to re-run after
 * pulling changes.
 */
import { readFile } from "node:fs/promises";
import { loadDotEnv } from "./env.js";

loadDotEnv();

if (!process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is not set.\n" +
      "Copy .env.example to .env and point DATABASE_URL at your PostgreSQL database."
  );
  process.exit(1);
}

const { getPool } = await import("../api/_lib/db.js");

const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
const pool = getPool();

try {
  // One transaction: a partial schema is worse than no schema.
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(schema);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }

  const { rows } = await pool.query(
    `SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' ORDER BY table_name`
  );
  console.log("Schema applied. Tables:", rows.map((r) => r.table_name).join(", "));

  const { rows: admins } = await pool.query("SELECT count(*)::int AS n FROM admins");
  if (admins[0].n === 0) {
    console.log("\nNo admin accounts yet. Create the first Super Admin with:");
    console.log("  npm run db:create-admin -- you@example.com 'a-strong-password' 'Your Name'");
  }
} catch (error) {
  console.error("Migration failed:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
