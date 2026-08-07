import pg from "pg";

const { Pool, types } = pg;

// NUMERIC comes back as a string by default (it can hold values a JS number
// can't). Fees and amounts here are rupees, well inside the safe range, and the
// UI does arithmetic on them — so parse them as numbers.
types.setTypeParser(types.builtins.NUMERIC, (value) => (value === null ? null : Number(value)));

// DATE columns are calendar dates the UI compares and renders as plain
// 'YYYY-MM-DD' strings. Handing back a JS Date would drag the browser's
// timezone into it and shift the day. Keep the text.
types.setTypeParser(types.builtins.DATE, (value) => value);

const connectionString = process.env.DATABASE_URL;

/**
 * Managed Postgres (Neon, Supabase, Railway, Vercel Postgres…) requires TLS but
 * serves a certificate the default CA bundle doesn't chain to. A local database
 * usually has no TLS at all. `PGSSLMODE=disable` forces it off explicitly.
 */
function sslConfig() {
  if (process.env.PGSSLMODE === "disable") return false;
  if (!connectionString) return false;
  const local = /@(localhost|127\.0\.0\.1|\[::1\])[:/]/.test(connectionString);
  return local ? false : { rejectUnauthorized: false };
}

// One pool per warm serverless instance. `global` survives module re-evaluation
// in dev (Vite HMR) and across invocations on the same Vercel lambda, so we
// don't leak a new pool every time.
const globalForPg = globalThis;

/** @returns {pg.Pool} */
export function getPool() {
  if (!connectionString) {
    throw Object.assign(new Error("DATABASE_URL is not set"), { statusCode: 503 });
  }
  if (!globalForPg.__iotifyPool) {
    globalForPg.__iotifyPool = new Pool({
      connectionString,
      ssl: sslConfig(),
      max: Number(process.env.PGPOOL_MAX || 5),
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    });
    // A pool error with no listener would crash the process.
    globalForPg.__iotifyPool.on("error", (error) => {
      console.error("[db] idle client error", error);
    });
  }
  return globalForPg.__iotifyPool;
}

/**
 * Run a parameterised query. Always pass values as `$1, $2…` — never build SQL
 * by concatenating user input.
 */
export async function query(text, params = []) {
  return getPool().query(text, params);
}

/** First row, or null. */
export async function queryOne(text, params = []) {
  const { rows } = await query(text, params);
  return rows[0] ?? null;
}

/**
 * Run `fn` inside a transaction on a dedicated client, rolling back if it
 * throws. Used where a read and a write have to agree — booking a seat, say.
 */
export async function transaction(fn) {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}
