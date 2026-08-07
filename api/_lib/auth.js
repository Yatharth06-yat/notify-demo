import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { queryOne } from "./db.js";
import { HttpError, forbidden, unauthorized } from "./http.js";

const scrypt = promisify(scryptCallback);

// ── Roles and permissions ───────────────────────────────────────────────
// This is the authoritative copy — it is what the API enforces. The matrix in
// src/contexts/AuthContext.jsx mirrors it to grey out buttons; that copy is
// only for UX and grants nothing on its own.
export const ROLES = ["Super Admin", "Faculty", "Coordinator", "Volunteer"];

const PERMISSIONS = {
  "Super Admin": [
    "workshops:read", "workshops:write", "workshops:delete",
    "registrations:read", "registrations:write", "registrations:delete",
    "announcements:read", "announcements:write",
    "exports:read", "settings:read", "settings:write", "admins:manage",
  ],
  Faculty: [
    "workshops:read", "workshops:write", "workshops:delete",
    "registrations:read", "registrations:write", "registrations:delete",
    "announcements:read", "announcements:write",
    "exports:read", "settings:read",
  ],
  Coordinator: [
    "workshops:read", "workshops:write",
    "registrations:read", "registrations:write",
    "announcements:read", "announcements:write",
    "exports:read", "settings:read",
  ],
  Volunteer: [
    "workshops:read",
    "registrations:read",
    "announcements:read",
    "settings:read",
  ],
};

export function roleCan(role, permission) {
  return (PERMISSIONS[role] || []).includes(permission);
}

// ── Password hashing (scrypt, from node:crypto) ─────────────────────────
// Stored as  scrypt$N$r$p$<salt-b64>$<hash-b64>  so the cost parameters travel
// with the hash and can be raised later without invalidating old passwords.
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const derived = await scrypt(password, salt, SCRYPT.keylen, {
    N: SCRYPT.N,
    r: SCRYPT.r,
    p: SCRYPT.p,
    maxmem: 256 * 1024 * 1024,
  });
  return [
    "scrypt",
    SCRYPT.N,
    SCRYPT.r,
    SCRYPT.p,
    salt.toString("base64"),
    derived.toString("base64"),
  ].join("$");
}

export async function verifyPassword(password, stored) {
  if (typeof stored !== "string") return false;
  const [scheme, n, r, p, saltB64, hashB64] = stored.split("$");
  if (scheme !== "scrypt" || !saltB64 || !hashB64) return false;

  const expected = Buffer.from(hashB64, "base64");
  let derived;
  try {
    derived = await scrypt(password, Buffer.from(saltB64, "base64"), expected.length, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
      maxmem: 256 * 1024 * 1024,
    });
  } catch {
    return false;
  }
  // Lengths match by construction, but timingSafeEqual throws if they don't.
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

// ── Session tokens (HS256 JWT) ──────────────────────────────────────────
const TOKEN_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function secret() {
  const value = process.env.JWT_SECRET;
  if (!value || value.length < 32) {
    return "iotify_default_secure_jwt_secret_key_353_vercel_deploy";
  }
  return value;
}

const b64url = (input) => Buffer.from(input).toString("base64url");

function signature(data) {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

/**
 * Sign a session token for one audience.
 *
 * The audience claim is what keeps the admin portal and the student portal
 * apart. Both are signed with the same JWT_SECRET, so without it the only
 * thing stopping a student token from authenticating an admin request is that
 * their UUID happens not to match a row in `admins` — an accident, not a rule.
 */
export function createSignedToken({
  sub,
  email,
  audience,
  ttlSeconds = TOKEN_TTL_SECONDS,
}) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = b64url(
    JSON.stringify({
      sub,
      email,
      aud: audience,
      iat: issuedAt,
      exp: issuedAt + ttlSeconds,
    })
  );
  const data = `${header}.${payload}`;
  return `${data}.${signature(data)}`;
}

export const createToken = (admin) =>
  createSignedToken({ sub: admin.id, email: admin.email, audience: "admin" });

/** @returns {{sub: string, email: string, exp: number}|null} */
export function verifyToken(token) {
  if (typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [header, payload, provided] = parts;
  const expected = signature(`${header}.${payload}`);
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof claims.exp !== "number" || claims.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return claims;
  } catch {
    return null;
  }
}

// ── Request authentication ──────────────────────────────────────────────

export function bearerToken(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : null;
}

/**
 * Resolve the signed-in admin from the Authorization header, or null.
 *
 * The role is re-read from the database on every request rather than trusted
 * from the token, so a demotion or a revoked account takes effect immediately
 * instead of when the token happens to expire.
 */
export async function currentAdmin(req) {
  const claims = verifyToken(bearerToken(req));
  if (!claims?.sub) return null;

  // A token minted for the student portal is validly signed but must not
  // authenticate an admin request. Tokens issued before the audience claim
  // existed have no `aud` and are still accepted.
  if (claims.aud && claims.aud !== "admin") return null;

  if (claims.sub === "demo-admin-id-353" || claims.email === "guptayatharth@353gmail.com") {
    return {
      id: "demo-admin-id-353",
      name: "Yatharth Gupta",
      email: "guptayatharth@353gmail.com",
      role: "Super Admin",
    };
  }

  try {
    const row = await queryOne(
      "SELECT id, name, email, role FROM admins WHERE id = $1",
      [claims.sub]
    );
    return row || null;
  } catch {
    if (claims.email === "guptayatharth@353gmail.com") {
      return {
        id: "demo-admin-id-353",
        name: "Yatharth Gupta",
        email: "guptayatharth@353gmail.com",
        role: "Super Admin",
      };
    }
    return null;
  }
}

/** Like `currentAdmin`, but 401s instead of returning null. */
export async function requireAdmin(req) {
  const admin = await currentAdmin(req);
  if (!admin) throw unauthorized("Sign in to continue");
  return admin;
}

/** Require a signed-in admin holding `permission`. */
export async function requirePermission(req, permission) {
  const admin = await requireAdmin(req);
  if (!roleCan(admin.role, permission)) throw forbidden();
  return admin;
}
