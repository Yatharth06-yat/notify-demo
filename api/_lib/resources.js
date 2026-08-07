import { badRequest } from "./http.js";

/**
 * Field definitions for the CRUD resources.
 *
 * Everything the client sends goes through a coercer here before it reaches
 * SQL, and the CHECK constraints in db/schema.sql back that up — so a bad
 * value has to get past both the API and the database to be stored.
 *
 * Column names are snake_case in Postgres and camelCase over the wire; the
 * mapping lives in one place so neither side has to think about the other.
 */

// ── Coercers ────────────────────────────────────────────────────────────

const text =
  ({ max = 500, min = 0, lower = false } = {}) =>
  (value, field) => {
    if (value === null || value === undefined) return "";
    if (typeof value !== "string") throw badRequest(`${field} must be text`);
    const trimmed = lower ? value.trim().toLowerCase() : value.trim();
    if (trimmed.length < min) {
      throw badRequest(`${field} must be at least ${min} characters`);
    }
    if (trimmed.length > max) {
      throw badRequest(`${field} must be ${max} characters or fewer`);
    }
    return trimmed;
  };

const email = () => (value, field) => {
  const v = text({ max: 200, lower: true })(value, field);
  if (v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
    throw badRequest(`${field} is not a valid email address`);
  }
  return v;
};

const phone = () => (value, field) => {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    throw badRequest(`${field} must be a 10–15 digit number`);
  }
  return digits;
};

const integer =
  ({ min = 0, max = Number.MAX_SAFE_INTEGER } = {}) =>
  (value, field) => {
    const n = Number(value === "" || value === null || value === undefined ? 0 : value);
    if (!Number.isInteger(n) || n < min || n > max) {
      throw badRequest(`${field} must be a whole number between ${min} and ${max}`);
    }
    return n;
  };

const decimal =
  ({ min = 0, max = 10_000_000 } = {}) =>
  (value, field) => {
    const n = Number(value === "" || value === null || value === undefined ? 0 : value);
    if (!Number.isFinite(n) || n < min || n > max) {
      throw badRequest(`${field} must be a number between ${min} and ${max}`);
    }
    return Math.round(n * 100) / 100;
  };

/** HTML date inputs send 'YYYY-MM-DD', or '' when cleared. '' becomes NULL. */
const dateOnly = () => (value, field) => {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw badRequest(`${field} must be a date in YYYY-MM-DD form`);
  }
  if (Number.isNaN(new Date(`${value}T00:00:00Z`).getTime())) {
    throw badRequest(`${field} is not a real date`);
  }
  return value;
};

const boolean = () => (value) => value !== false && value !== "false" && value != null;

const oneOf = (allowed) => (value, field) => {
  const v = String(value ?? "").trim();
  if (!allowed.includes(v)) {
    throw badRequest(`${field} must be one of: ${allowed.join(", ")}`);
  }
  return v;
};

export const isUuid = (value) =>
  typeof value === "string" &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

// ── Resource definitions ────────────────────────────────────────────────

export const WORKSHOP_STATUSES = ["Draft", "Published", "Closed"];
export const REGISTRATION_STATUSES = ["Pending", "Approved", "Rejected"];

const workshopFields = {
  title: { column: "title", coerce: text({ min: 2, max: 200 }), required: true },
  description: { column: "description", coerce: text({ max: 5000 }) },
  category: { column: "category", coerce: text({ max: 100 }) },
  speaker: { column: "speaker", coerce: text({ max: 150 }) },
  designation: { column: "designation", coerce: text({ max: 150 }) },
  date: { column: "date", coerce: dateOnly(), required: true },
  time: { column: "time", coerce: text({ max: 100 }) },
  duration: { column: "duration", coerce: text({ max: 100 }) },
  venue: { column: "venue", coerce: text({ min: 1, max: 200 }), required: true },
  seats: { column: "seats", coerce: integer({ min: 1, max: 100000 }), required: true },
  fee: { column: "fee", coerce: decimal() },
  deadline: { column: "deadline", coerce: dateOnly() },
  status: { column: "status", coerce: oneOf(WORKSHOP_STATUSES) },
  banner: { column: "banner", coerce: text({ max: 2000 }) },
  speakerPhotoUrl: { column: "speaker_photo_url", coerce: text({ max: 2000 }) },
};

const registrationFields = {
  name: { column: "name", coerce: text({ min: 2, max: 120 }), required: true },
  enrollment: { column: "enrollment", coerce: text({ min: 1, max: 60 }), required: true },
  email: { column: "email", coerce: email(), required: true },
  phone: { column: "phone", coerce: phone(), required: true },
  gender: { column: "gender", coerce: text({ max: 20 }) },
  department: { column: "department", coerce: text({ max: 120 }), required: true },
  year: { column: "year", coerce: text({ max: 40 }), required: true },
  semester: { column: "semester", coerce: text({ max: 40 }) },
  collegeName: { column: "college_name", coerce: text({ max: 200 }) },
  workshopTitle: { column: "workshop_title", coerce: text({ max: 200 }) },
  couponCode: { column: "coupon_code", coerce: text({ max: 40 }) },
  amount: { column: "amount", coerce: decimal() },
  status: { column: "status", coerce: oneOf(REGISTRATION_STATUSES) },
  reviewedBy: { column: "reviewed_by", coerce: text({ max: 200 }) },
};

const announcementFields = {
  title: { column: "title", coerce: text({ min: 1, max: 200 }), required: true },
  body: { column: "body", coerce: text({ min: 1, max: 5000 }), required: true },
  visibleTill: { column: "visible_till", coerce: dateOnly() },
  published: { column: "published", coerce: boolean() },
  imageUrl: { column: "image_url", coerce: text({ max: 2000 }) },
  author: { column: "author", coerce: text({ max: 150 }) },
};

const adminFields = {
  name: { column: "name", coerce: text({ min: 1, max: 150 }), required: true },
  email: { column: "email", coerce: email(), required: true },
  role: { column: "role", coerce: oneOf(["Super Admin", "Faculty", "Coordinator", "Volunteer"]) },
};

export const RESOURCES = {
  workshops: {
    table: "workshops",
    fields: workshopFields,
    select: `id, title, description, category, speaker, designation,
             date::text AS "date", time, duration, venue, seats, fee,
             deadline::text AS "deadline", status, banner,
             speaker_photo_url AS "speakerPhotoUrl",
             created_at AS "createdAt", updated_at AS "updatedAt"`,
    orderBy: "date DESC NULLS LAST, created_at DESC",
    permissions: { read: "workshops:read", write: "workshops:write", delete: "workshops:delete" },
  },

  registrations: {
    table: "registrations",
    fields: registrationFields,
    select: `id, name, enrollment, email, phone, gender, department, year, semester,
             college_name AS "collegeName", workshop_id AS "workshopId",
             workshop_title AS "workshopTitle", coupon_code AS "couponCode",
             amount, status, reviewed_by AS "reviewedBy", reviewed_at AS "reviewedAt",
             created_at AS "createdAt", updated_at AS "updatedAt"`,
    orderBy: "created_at DESC",
    permissions: {
      read: "registrations:read",
      write: "registrations:write",
      delete: "registrations:delete",
    },
    // Registrations are created by students through /api/public/registrations,
    // never by an admin posting arbitrary rows.
    noCreate: true,
  },

  announcements: {
    table: "announcements",
    fields: announcementFields,
    select: `id, title, body, visible_till::text AS "visibleTill", published,
             image_url AS "imageUrl", author,
             created_at AS "createdAt", updated_at AS "updatedAt"`,
    orderBy: "created_at DESC",
    permissions: {
      read: "announcements:read",
      write: "announcements:write",
      delete: "announcements:write",
    },
  },

  admins: {
    table: "admins",
    fields: adminFields,
    // password_hash is deliberately absent — it must never leave the server.
    select: `id, name, email, role, created_at AS "createdAt", updated_at AS "updatedAt"`,
    orderBy: "created_at ASC",
    permissions: { read: null, write: "admins:manage", delete: "admins:manage" },
  },
};

// ── SQL builders ────────────────────────────────────────────────────────

/**
 * Validate `input` against a resource's fields.
 *
 * @param {object} resource  entry from RESOURCES
 * @param {object} input     raw JSON body
 * @param {boolean} partial  true for PATCH — only validate what was sent, and
 *                           don't insist on required fields
 * @returns {{columns: string[], values: unknown[]}}
 */
export function coerceFields(resource, input, { partial = false } = {}) {
  const columns = [];
  const values = [];

  for (const [name, spec] of Object.entries(resource.fields)) {
    const present = Object.prototype.hasOwnProperty.call(input, name);

    if (!present) {
      if (partial) continue;
      if (spec.required) throw badRequest(`${name} is required`);
      continue; // let the column default apply
    }

    const value = spec.coerce(input[name], name);
    if (spec.required && (value === null || value === "")) {
      throw badRequest(`${name} is required`);
    }
    columns.push(spec.column);
    values.push(value);
  }

  if (columns.length === 0) throw badRequest("No recognised fields to write");
  return { columns, values };
}

/**
 * `INSERT INTO t (a, b) VALUES ($1, $2) RETURNING <select>`
 *
 * @param {object} extra  raw column → value pairs the client may not set
 *                        itself (workshop_id, password_hash…). These bypass
 *                        the field coercers, so only ever pass server-derived
 *                        values here.
 */
export function buildInsert(resource, input, extra = {}) {
  const { columns, values } = coerceFields(resource, input);

  for (const [column, value] of Object.entries(extra)) {
    columns.push(column);
    values.push(value);
  }

  const placeholders = columns.map((_, i) => `$${i + 1}`);
  return {
    text: `INSERT INTO ${resource.table} (${columns.join(", ")})
           VALUES (${placeholders.join(", ")})
           RETURNING ${resource.select}`,
    values,
  };
}

/** `UPDATE t SET a = $1, updated_at = now() WHERE id = $n RETURNING <select>` */
export function buildUpdate(resource, id, input) {
  const { columns, values } = coerceFields(resource, input, { partial: true });
  const assignments = columns.map((column, i) => `${column} = $${i + 1}`);
  assignments.push("updated_at = now()");
  return {
    text: `UPDATE ${resource.table}
           SET ${assignments.join(", ")}
           WHERE id = $${values.length + 1}
           RETURNING ${resource.select}`,
    values: [...values, id],
  };
}
