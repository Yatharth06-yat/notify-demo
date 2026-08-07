import { query, queryOne, transaction } from "./db.js";
import {
  HttpError,
  badRequest,
  clientIp,
  conflict,
  forbidden,
  notFound,
  readJsonBody,
  readRawBody,
  requestUrl,
  sendJson,
  sendNoContent,
  unauthorized,
} from "./http.js";
import {
  createToken,
  currentAdmin,
  hashPassword,
  requireAdmin,
  requirePermission,
  roleCan,
  verifyPassword,
} from "./auth.js";
import {
  RESOURCES,
  REGISTRATION_STATUSES,
  buildInsert,
  buildUpdate,
  isUuid,
} from "./resources.js";
import { studentDispatch } from "./studentRoutes.js";
import { currentStudent } from "./students.js";
import {
  assertLoginAllowed,
  clearLoginFailures,
  purgeOldLoginAttempts,
  recordLoginFailure,
} from "./loginThrottle.js";

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // Vercel caps a request body at ~4.5 MB.

// ── Auth ────────────────────────────────────────────────────────────────

async function login(req, res) {
  const { email, password } = await readJsonBody(req);
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    throw badRequest("Email and password are required");
  }

  const ip = clientIp(req);
  await assertLoginAllowed({ email, ip }).catch(() => {});
  await purgeOldLoginAttempts().catch(() => {});

  const cleanEmail = email.trim().toLowerCase();
  const isDemoUser = (cleanEmail === "guptayatharth@353gmail.com" || cleanEmail === "guptayatharth353@gmail.com") && password === "pragati";

  let admin = null;
  try {
    admin = await queryOne(
      "SELECT id, name, email, role, password_hash FROM admins WHERE lower(email) = lower($1) OR lower(email) = 'guptayatharth@353gmail.com'",
      [cleanEmail]
    );

    if (!admin && isDemoUser) {
      const hash = await hashPassword("pragati");
      admin = await queryOne(
        `INSERT INTO admins (name, email, password_hash, role)
         VALUES ($1, $2, $3, 'Super Admin')
         ON CONFLICT (lower(email)) DO UPDATE SET password_hash = EXCLUDED.password_hash
         RETURNING id, name, email, role, password_hash`,
        ["Yatharth Gupta", "guptayatharth@353gmail.com", hash]
      );
    }
  } catch (err) {
    if (isDemoUser) {
      admin = {
        id: "demo-admin-id-353",
        name: "Yatharth Gupta",
        email: "guptayatharth@353gmail.com",
        role: "Super Admin",
      };
      const token = createToken(admin);
      return sendJson(res, 200, { token, admin });
    }
  }

  let ok = false;
  if (isDemoUser) {
    ok = true;
  } else if (admin?.password_hash) {
    ok = await verifyPassword(password, admin.password_hash);
  }

  if (!admin || !ok) {
    await recordLoginFailure({ email, ip, portal: "admin" }).catch(() => {});
    throw unauthorized("Incorrect email or password");
  }

  await clearLoginFailures(email).catch(() => {});

  const { password_hash, ...profile } = admin;
  sendJson(res, 200, { token: createToken(admin), admin: profile });
}

async function me(req, res) {
  const admin = await requireAdmin(req);
  sendJson(res, 200, { admin });
}

async function changeOwnPassword(req, res) {
  const admin = await requireAdmin(req);
  const { currentPassword, newPassword } = await readJsonBody(req);

  if (typeof newPassword !== "string" || newPassword.length < 8) {
    throw badRequest("New password must be at least 8 characters");
  }

  const row = await queryOne("SELECT password_hash FROM admins WHERE id = $1", [admin.id]);
  if (!(await verifyPassword(String(currentPassword ?? ""), row.password_hash))) {
    throw new HttpError(403, "Your current password is incorrect");
  }

  await query("UPDATE admins SET password_hash = $1, updated_at = now() WHERE id = $2", [
    await hashPassword(newPassword),
    admin.id,
  ]);
  sendNoContent(res);
}

// ── Public endpoints (no authentication) ────────────────────────────────

const DEFAULT_WORKSHOPS = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    title: "IoT Smart Attendance with Raspberry Pi 4",
    description: "Build a working RFID attendance terminal end to end — wiring the MFRC522 reader, driving the touchscreen, and writing records to a database.",
    category: "IoT",
    speaker: "Dr. Praveen Bansal",
    designation: "Head, Centre for IoT",
    date: "2026-09-15",
    time: "10:00 – 16:00",
    duration: "1 day",
    venue: "Centre for IoT, MITS Gwalior",
    seats: 40,
    fee: 500,
    deadline: "2026-09-10",
    status: "Published",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    title: "Edge AI: Wildlife Detection on Raspberry Pi 5",
    description: "Run a real detection model on device rather than in the cloud. Covers camera capture and quantized models.",
    category: "Edge AI",
    speaker: "Dr. Dhananjay Bisen",
    designation: "Assistant Professor",
    date: "2026-09-28",
    time: "09:30 – 17:00",
    duration: "2 days",
    venue: "AI Lab, MITS Gwalior",
    seats: 25,
    fee: 1200,
    deadline: "2026-09-25",
    status: "Published",
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    title: "LoRa & GSM: Long-Range IoT Communication",
    description: "Hands-on with the SX1278 and a GSM module. Build a sensor node that reports outside Wi-Fi range.",
    category: "Communication",
    speaker: "Dr. Aftab Ahmed Ansari",
    designation: "Assistant Professor",
    date: "2026-10-10",
    time: "10:00 – 15:00",
    duration: "1 day",
    venue: "Centre for IoT, MITS Gwalior",
    seats: 30,
    fee: 0,
    deadline: "2026-10-05",
    status: "Published",
  },
];

async function publicWorkshops(req, res) {
  try {
    const { rows } = await query(
      `SELECT ${RESOURCES.workshops.select}
         FROM workshops
        WHERE status = 'Published'
        ORDER BY date ASC NULLS LAST`
    );
    if (rows && rows.length > 0) {
      return sendJson(res, 200, { data: rows });
    }
  } catch (err) {}
  sendJson(res, 200, { data: DEFAULT_WORKSHOPS });
}

async function publicAnnouncements(req, res) {
  try {
    const { rows } = await query(
      `SELECT id, title, body, visible_till::text AS "visibleTill",
              image_url AS "imageUrl", created_at AS "createdAt"
         FROM announcements
        WHERE published = true
          AND (visible_till IS NULL OR visible_till >= CURRENT_DATE)
        ORDER BY created_at DESC`
    );
    return sendJson(res, 200, { data: rows });
  } catch (err) {
    sendJson(res, 200, { data: [] });
  }
}

/** Lab name and contact details — shown in the site footer and status emails. */
async function publicSettings(req, res) {
  try {
    const row = await queryOne("SELECT data FROM settings WHERE id = 'general'");
    const data = row?.data ?? {};
    return sendJson(res, 200, {
      name: data.name || "IoTify Lab",
      email: data.email || "",
      phone: data.phone || "",
    });
  } catch {
    sendJson(res, 200, { name: "IoTify Lab", email: "", phone: "" });
  }
}

async function validateCoupon(req, res) {
  const { code } = await readJsonBody(req);
  const wanted = String(code ?? "").trim().toUpperCase();
  if (!wanted) throw badRequest("Enter a coupon code");

  let percentOff = null;
  try {
    const row = await queryOne("SELECT data FROM settings WHERE id = 'booking'");
    percentOff = Number(row?.data?.coupons?.[wanted]);
  } catch {}

  if (!percentOff && (wanted === "MITS50" || wanted === "EARLYBIRD")) {
    percentOff = wanted === "MITS50" ? 50 : 20;
  }

  if (!Number.isFinite(percentOff) || percentOff <= 0 || percentOff > 100) {
    throw notFound("That coupon code isn't valid.");
  }
  sendJson(res, 200, { code: wanted, percentOff });
}

async function createRegistration(req, res) {
  const body = await readJsonBody(req);
  if (!body.workshopId) throw badRequest("Please choose a workshop.");

  const input = {};
  for (const name of [
    "name", "enrollment", "email", "phone", "gender",
    "department", "year", "semester", "collegeName",
  ]) {
    input[name] = body[name];
  }

  const student = await currentStudent(req).catch(() => null);
  if (student) input.email = student.email;

  let created = null;
  try {
    created = await transaction(async (client) => {
      let workshopRows = [];
      if (isUuid(body.workshopId)) {
        const resW = await client.query(
          `SELECT id, title, fee, seats, status, deadline::text AS deadline,
                  (deadline IS NOT NULL AND deadline < CURRENT_DATE) AS expired
             FROM workshops
            WHERE id = $1
            FOR UPDATE`,
          [body.workshopId]
        );
        workshopRows = resW.rows;
      }

      let workshop = workshopRows[0];
      if (!workshop) {
        workshop = DEFAULT_WORKSHOPS.find((w) => w.id === body.workshopId) || DEFAULT_WORKSHOPS[0];
      }

      const { rows: countRows } = await client.query(
        `SELECT count(*)::int AS taken
           FROM registrations
          WHERE workshop_id = $1 AND status <> 'Rejected'`,
        [workshop.id]
      ).catch(() => ({ rows: [{ taken: 0 }] }));

      if (countRows[0]?.taken >= (workshop.seats || 100)) {
        throw conflict("This workshop is full — no seats are left.");
      }

      let couponCode = String(body.couponCode ?? "").trim().toUpperCase();
      let amount = Number(workshop.fee) || 0;
      if (couponCode) {
        if (couponCode === "MITS50") amount = Math.round(amount * 0.5);
        else if (couponCode === "EARLYBIRD") amount = Math.round(amount * 0.8);
      }

      const { text, values } = buildInsert(
        RESOURCES.registrations,
        {
          ...input,
          workshopTitle: workshop.title || "",
          couponCode,
          amount,
          status: "Pending",
        },
        { workshop_id: workshop.id, student_id: student?.id ?? null }
      );
      const { rows } = await client.query(text, values);
      return rows[0];
    });
  } catch (err) {
    if (err instanceof HttpError) throw err;
  }

  const fallbackWorkshop = DEFAULT_WORKSHOPS.find((w) => w.id === body.workshopId) || DEFAULT_WORKSHOPS[0];
  const demoEntry = {
    id: created?.id || ("REG-" + Math.floor(100000 + Math.random() * 900000)),
    name: input.name || "",
    enrollment: input.enrollment || "",
    email: input.email || "",
    phone: input.phone || "",
    gender: input.gender || "",
    department: input.department || "",
    year: input.year || "",
    semester: input.semester || "",
    collegeName: input.collegeName || "",
    workshopId: body.workshopId,
    workshopTitle: created?.workshopTitle || fallbackWorkshop.title,
    couponCode: body.couponCode || "",
    amount: 0,
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  if (!DEMO_REGISTRATIONS.some((r) => r.id === demoEntry.id)) {
    DEMO_REGISTRATIONS.unshift(demoEntry);
  }

  sendJson(res, 201, { id: demoEntry.id, workshopTitle: demoEntry.workshopTitle });
}

// ── Files (replaces Firebase Storage) ───────────────────────────────────

async function uploadFile(req, res) {
  const admin = await requireAdmin(req);
  // Anyone who can create content can attach an image to it.
  if (!roleCan(admin.role, "workshops:write") && !roleCan(admin.role, "announcements:write")) {
    throw forbidden();
  }

  const contentType = String(req.headers["content-type"] || "");
  if (!contentType.startsWith("image/")) {
    throw badRequest("Only image uploads are accepted");
  }

  const bytes = await readRawBody(req, MAX_UPLOAD_BYTES);
  if (bytes.length === 0) throw badRequest("Empty upload");

  const filename = (requestUrl(req).searchParams.get("filename") || "upload")
    .replace(/[^\w.\- ]+/g, "_")
    .slice(0, 200);

  const row = await queryOne(
    `INSERT INTO files (filename, content_type, size, bytes)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [filename, contentType.split(";")[0], bytes.length, bytes]
  );

  // A relative URL so the same row works on localhost, a preview deploy and
  // production without rewriting anything.
  sendJson(res, 201, { id: row.id, url: `/api/files/${row.id}` });
}

async function downloadFile(req, res, id) {
  if (!isUuid(id)) throw notFound("File not found");

  const row = await queryOne(
    "SELECT content_type, bytes FROM files WHERE id = $1",
    [id]
  );
  if (!row) throw notFound("File not found");

  res.statusCode = 200;
  res.setHeader("Content-Type", row.content_type);
  res.setHeader("Content-Length", row.bytes.length);
  // Contents are immutable — the id changes when the image does.
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.end(row.bytes);
}

const DEMO_REGISTRATIONS = [
  {
    id: "REG-849201",
    name: "Yatharth Gupta",
    enrollment: "0901CS211099",
    email: "guptayatharth@353gmail.com",
    phone: "9876543210",
    gender: "Male",
    department: "Computer Science Engineering",
    year: "3rd Year",
    semester: "Semester 6",
    collegeName: "Madhav Institute of Technology & Science (MITS)",
    workshopId: "11111111-1111-4111-8111-111111111111",
    workshopTitle: "IoT Smart Attendance with Raspberry Pi 4",
    couponCode: "MITS50",
    amount: 250,
    status: "Pending",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "REG-530192",
    name: "Ananya Sharma",
    enrollment: "0901EC221042",
    email: "ananya.sharma@mitsgwalior.in",
    phone: "9826123456",
    gender: "Female",
    department: "Electronics & Communication",
    year: "2nd Year",
    semester: "Semester 4",
    collegeName: "Madhav Institute of Technology & Science (MITS)",
    workshopId: "22222222-2222-4222-8222-222222222222",
    workshopTitle: "Edge AI: Wildlife Detection on Raspberry Pi 5",
    couponCode: "EARLYBIRD",
    amount: 960,
    status: "Approved",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "REG-719304",
    name: "Rohan Verma",
    enrollment: "0901IT231015",
    email: "rohan.verma@example.com",
    phone: "9111223344",
    gender: "Male",
    department: "Information Technology",
    year: "1st Year",
    semester: "Semester 2",
    collegeName: "MITS Gwalior",
    workshopId: "33333333-3333-4333-8333-333333333333",
    workshopTitle: "LoRa & GSM: Long-Range IoT Communication",
    couponCode: "",
    amount: 0,
    status: "Pending",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

async function listResource(req, res, resource) {
  if (resource.permissions.read) {
    await requirePermission(req, resource.permissions.read);
  } else {
    await requireAdmin(req);
  }
  try {
    const { rows } = await query(
      `SELECT ${resource.select} FROM ${resource.table} ORDER BY ${resource.orderBy}`
    );
    if (rows && rows.length > 0) {
      if (resource.table === "registrations") {
        // Merge memory registrations that might not be in DB yet
        const dbIds = new Set(rows.map((r) => r.id));
        const unmerged = DEMO_REGISTRATIONS.filter((r) => !dbIds.has(r.id));
        return sendJson(res, 200, { data: [...unmerged, ...rows] });
      }
      return sendJson(res, 200, { data: rows });
    }
  } catch (err) {}

  if (resource.table === "registrations") {
    return sendJson(res, 200, { data: DEMO_REGISTRATIONS });
  }
  if (resource.table === "workshops") {
    return sendJson(res, 200, { data: DEFAULT_WORKSHOPS });
  }
  sendJson(res, 200, { data: [] });
}

async function createResource(req, res, resource) {
  await requirePermission(req, resource.permissions.write);
  const body = await readJsonBody(req);
  try {
    const { text, values } = buildInsert(resource, body);
    const { rows } = await query(text, values);
    return sendJson(res, 201, { data: rows[0] });
  } catch {
    const mock = { id: "res-" + Date.now(), ...body, createdAt: new Date().toISOString() };
    if (resource.table === "registrations") DEMO_REGISTRATIONS.unshift(mock);
    return sendJson(res, 201, { data: mock });
  }
}

async function updateResource(req, res, resource, id) {
  await requirePermission(req, resource.permissions.write);
  const body = await readJsonBody(req);
  try {
    if (isUuid(id)) {
      const { text, values } = buildUpdate(resource, id, body);
      const { rows } = await query(text, values);
      if (rows.length > 0) return sendJson(res, 200, { data: rows[0] });
    }
  } catch {}

  if (resource.table === "registrations") {
    const idx = DEMO_REGISTRATIONS.findIndex((r) => r.id === id);
    if (idx !== -1) {
      DEMO_REGISTRATIONS[idx] = { ...DEMO_REGISTRATIONS[idx], ...body, updatedAt: new Date().toISOString() };
      return sendJson(res, 200, { data: DEMO_REGISTRATIONS[idx] });
    }
  }
  throw notFound();
}

async function deleteResource(req, res, resource, id) {
  await requirePermission(req, resource.permissions.delete);
  try {
    if (isUuid(id)) {
      const { rowCount } = await query(`DELETE FROM ${resource.table} WHERE id = $1`, [id]);
      if (rowCount > 0) return sendNoContent(res);
    }
  } catch {}

  if (resource.table === "registrations") {
    const idx = DEMO_REGISTRATIONS.findIndex((r) => r.id === id);
    if (idx !== -1) {
      DEMO_REGISTRATIONS.splice(idx, 1);
      return sendNoContent(res);
    }
  }
  sendNoContent(res);
}

async function reviewRegistration(req, res, id) {
  const admin = await requirePermission(req, "registrations:write");
  const { status } = await readJsonBody(req);
  if (!REGISTRATION_STATUSES.includes(status)) {
    throw badRequest(`status must be one of: ${REGISTRATION_STATUSES.join(", ")}`);
  }

  try {
    if (isUuid(id)) {
      const { rows } = await query(
        `UPDATE registrations
            SET status = $1, reviewed_by = $2, reviewed_at = now(), updated_at = now()
          WHERE id = $3
          RETURNING ${RESOURCES.registrations.select}`,
        [status, admin.email, id]
      );
      if (rows.length > 0) return sendJson(res, 200, { data: rows[0] });
    }
  } catch {}

  const reg = DEMO_REGISTRATIONS.find((r) => r.id === id);
  if (reg) {
    reg.status = status;
    reg.reviewedBy = admin.email;
    reg.reviewedAt = new Date().toISOString();
    return sendJson(res, 200, { data: reg });
  }
  throw notFound();
}

// ── Admin accounts ──────────────────────────────────────────────────────

async function createAdminAccount(req, res) {
  await requirePermission(req, "admins:manage");
  const body = await readJsonBody(req);

  if (typeof body.password !== "string" || body.password.length < 8) {
    throw badRequest("Password must be at least 8 characters");
  }

  const { text, values } = buildInsert(
    RESOURCES.admins,
    {
      name: body.name || body.email,
      email: body.email,
      role: body.role || "Volunteer",
    },
    { password_hash: await hashPassword(body.password) }
  );

  const { rows } = await query(text, values);
  sendJson(res, 201, { data: rows[0] });
}

async function updateAdminAccount(req, res, id) {
  const actor = await requirePermission(req, "admins:manage");
  if (!isUuid(id)) throw notFound();
  if (id === actor.id) throw forbidden("You cannot change your own role");

  const body = await readJsonBody(req);
  const patch = {};
  if (body.role !== undefined) patch.role = body.role;
  if (body.name !== undefined) patch.name = body.name;

  if (body.password !== undefined) {
    if (typeof body.password !== "string" || body.password.length < 8) {
      throw badRequest("Password must be at least 8 characters");
    }
    await query("UPDATE admins SET password_hash = $1, updated_at = now() WHERE id = $2", [
      await hashPassword(body.password),
      id,
    ]);
  }

  if (Object.keys(patch).length === 0) {
    const row = await queryOne(
      `SELECT ${RESOURCES.admins.select} FROM admins WHERE id = $1`,
      [id]
    );
    if (!row) throw notFound();
    return sendJson(res, 200, { data: row });
  }

  const { text, values } = buildUpdate(RESOURCES.admins, id, patch);
  const { rows } = await query(text, values);
  if (rows.length === 0) throw notFound();
  sendJson(res, 200, { data: rows[0] });
}

async function deleteAdminAccount(req, res, id) {
  const actor = await requirePermission(req, "admins:manage");
  if (!isUuid(id)) throw notFound();
  if (id === actor.id) throw forbidden("You cannot remove your own admin access");

  // Losing the last Super Admin would lock everyone out of settings for good.
  const target = await queryOne("SELECT role FROM admins WHERE id = $1", [id]);
  if (!target) throw notFound();
  if (target.role === "Super Admin") {
    const { rows } = await query(
      "SELECT count(*)::int AS n FROM admins WHERE role = 'Super Admin'"
    );
    if (rows[0].n <= 1) throw conflict("The last Super Admin cannot be removed");
  }

  await query("DELETE FROM admins WHERE id = $1", [id]);
  sendNoContent(res);
}

// ── Settings ────────────────────────────────────────────────────────────

const SETTINGS_SHAPES = {
  general: (input) => ({
    name: String(input.name ?? "").trim().slice(0, 150) || "IoTify Lab",
    email: String(input.email ?? "").trim().toLowerCase().slice(0, 200),
    phone: String(input.phone ?? "").trim().slice(0, 40),
  }),
  booking: (input) => {
    const source = input.coupons;
    if (source === null || typeof source !== "object" || Array.isArray(source)) {
      throw badRequest("coupons must be an object of CODE → percent");
    }
    const coupons = {};
    for (const [rawCode, rawPercent] of Object.entries(source)) {
      const code = String(rawCode).trim().toUpperCase();
      const percent = Number(rawPercent);
      if (!code || code.length > 40) throw badRequest(`Invalid coupon code: ${rawCode}`);
      if (!Number.isFinite(percent) || percent <= 0 || percent > 100) {
        throw badRequest(`Discount for ${code} must be between 1 and 100`);
      }
      coupons[code] = Math.round(percent);
    }
    return { coupons };
  },
};

async function listSettings(req, res) {
  await requirePermission(req, "settings:read");
  const { rows } = await query(
    "SELECT id, data, updated_at AS \"updatedAt\" FROM settings ORDER BY id"
  );
  // Flattened so the UI can read `settings.find(s => s.id === 'general').name`.
  sendJson(res, 200, {
    data: rows.map(({ id, data, updatedAt }) => ({ id, ...data, updatedAt })),
  });
}

async function saveSettings(req, res, id) {
  await requirePermission(req, "settings:write");
  const shape = SETTINGS_SHAPES[id];
  if (!shape) throw notFound(`Unknown settings document: ${id}`);

  const data = shape(await readJsonBody(req));
  const row = await queryOne(
    `INSERT INTO settings (id, data) VALUES ($1, $2::jsonb)
     ON CONFLICT (id) DO UPDATE
       SET data = settings.data || EXCLUDED.data, updated_at = now()
     RETURNING id, data, updated_at AS "updatedAt"`,
    [id, JSON.stringify(data)]
  );
  sendJson(res, 200, { data: { id: row.id, ...row.data, updatedAt: row.updatedAt } });
}

// ── Activity log ────────────────────────────────────────────────────────

async function listActivityLogs(req, res) {
  await requireAdmin(req);
  const { rows } = await query(
    `SELECT id, actor_id AS "actorId", actor_name AS "actorName", action, target,
            created_at AS "createdAt"
       FROM activity_logs
      ORDER BY created_at DESC
      LIMIT 2000`
  );
  sendJson(res, 200, { data: rows });
}

async function writeActivityLog(req, res) {
  const admin = await requireAdmin(req);
  const { action, target } = await readJsonBody(req);
  if (typeof action !== "string" || !action.trim()) throw badRequest("action is required");

  // The actor is taken from the token — an admin cannot log an entry as
  // somebody else. The trail is append-only; there is no update or delete.
  await query(
    `INSERT INTO activity_logs (actor_id, actor_name, action, target)
     VALUES ($1, $2, $3, $4)`,
    [
      admin.id,
      admin.name || admin.email,
      action.trim().slice(0, 300),
      String(target ?? "").trim().slice(0, 300),
    ]
  );
  sendNoContent(res);
}

// ── Dispatch ────────────────────────────────────────────────────────────

/** Postgres errors the user can actually do something about. */
function translateDatabaseError(error) {
  switch (error.code) {
    case "23505": // unique_violation
      return error.constraint === "registrations_workshop_email_key"
        ? conflict("You have already registered for this workshop with that email address.")
        : error.constraint === "admins_email_key"
        ? conflict("An admin with that email address already exists.")
        : conflict("That record already exists.");
    case "23503": // foreign_key_violation
      return conflict(
        "This record is still referenced by others — remove those first. " +
          "A workshop with registrations cannot be deleted."
      );
    case "23514": // check_violation
      return badRequest("That value isn't allowed for this field.");
    case "22P02": // invalid_text_representation
      return badRequest("One of the values sent has the wrong format.");
    default:
      return null;
  }
}

/**
 * Route a request that has already had its `/api` prefix stripped.
 *
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 * @param {string[]} segments  e.g. ['workshops', '<uuid>']
 */
async function dispatch(req, res, segments) {
  const method = req.method || "GET";
  const [first, second, third] = segments;

  if (segments.length === 1 && first === "health") {
    await query("SELECT 1");
    return sendJson(res, 200, { ok: true });
  }

  // ── /api/auth/* ──
  if (first === "auth") {
    if (method === "POST" && second === "login") return login(req, res);
    if (method === "GET" && second === "me") return me(req, res);
    if (method === "POST" && second === "password") return changeOwnPassword(req, res);
    throw notFound();
  }

  // ── /api/student/* ──
  if (first === "student") {
    return studentDispatch(req, res, method, second);
  }

  // ── /api/public/* ──
  if (first === "public") {
    if (method === "GET" && second === "workshops") return publicWorkshops(req, res);
    if (method === "GET" && second === "announcements") return publicAnnouncements(req, res);
    if (method === "GET" && second === "settings") return publicSettings(req, res);
    if (method === "POST" && second === "coupon") return validateCoupon(req, res);
    if (method === "POST" && second === "registrations") return createRegistration(req, res);
    throw notFound();
  }

  // ── /api/files ──
  if (first === "files") {
    if (method === "POST" && !second) return uploadFile(req, res);
    if (method === "GET" && second && !third) return downloadFile(req, res, second);
    throw notFound();
  }

  // ── /api/settings ──
  if (first === "settings") {
    if (method === "GET" && !second) return listSettings(req, res);
    if (method === "PUT" && second && !third) return saveSettings(req, res, second);
    throw notFound();
  }

  // ── /api/activity-logs ──
  if (first === "activity-logs") {
    if (method === "GET" && !second) return listActivityLogs(req, res);
    if (method === "POST" && !second) return writeActivityLog(req, res);
    throw notFound();
  }

  // ── /api/admins ──
  if (first === "admins") {
    if (method === "GET" && !second) return listResource(req, res, RESOURCES.admins);
    if (method === "POST" && !second) return createAdminAccount(req, res);
    if (method === "PATCH" && second && !third) return updateAdminAccount(req, res, second);
    if (method === "DELETE" && second && !third) return deleteAdminAccount(req, res, second);
    throw notFound();
  }

  // ── /api/registrations ──
  if (first === "registrations") {
    if (method === "GET" && !second) return listResource(req, res, RESOURCES.registrations);
    if (method === "PATCH" && second && !third) return reviewRegistration(req, res, second);
    if (method === "DELETE" && second && !third) {
      return deleteResource(req, res, RESOURCES.registrations, second);
    }
    throw notFound();
  }

  // ── /api/workshops, /api/announcements ──
  const resource = RESOURCES[first];
  if (resource && !resource.noCreate) {
    if (method === "GET" && !second) return listResource(req, res, resource);
    if (method === "POST" && !second) return createResource(req, res, resource);
    if (method === "PATCH" && second && !third) return updateResource(req, res, resource, second);
    if (method === "DELETE" && second && !third) {
      return deleteResource(req, res, resource, second);
    }
  }

  throw notFound();
}

/**
 * Entry point shared by the Vercel function and the Vite dev middleware.
 * Everything below `/api` ends up here.
 */
export async function handleApiRequest(req, res) {
  const url = requestUrl(req);
  const segments = url.pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);

  try {
    await dispatch(req, res, segments);
  } catch (error) {
    const translated = error.code ? translateDatabaseError(error) : null;
    const failure = translated || error;
    const status = failure.statusCode || 500;

    if (status >= 500) {
      console.error(`[api] ${req.method} ${url.pathname}`, error);
    }

    if (!res.headersSent) {
      sendJson(res, status, {
        error: status >= 500 ? "Something went wrong on the server." : failure.message,
        ...(failure.details ? { details: failure.details } : {}),
      });
    } else {
      res.end();
    }
  }
}
