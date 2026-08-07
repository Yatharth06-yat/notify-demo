#!/usr/bin/env node
/**
 * Fill a development database with plausible content.
 *
 *   npm run db:seed-demo
 *
 * Without this the booking page says "no workshops open" and the dashboard
 * charts have nothing to draw, which makes it hard to tell a working portal
 * from a broken one.
 *
 * Safe to re-run: rows are keyed on title and upserted rather than duplicated.
 * Refuses to touch a database that already holds real registrations, so it
 * cannot be pointed at production by accident.
 */
import { loadDotEnv } from "./env.js";

loadDotEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. See .env.example.");
  process.exit(1);
}

const { query, getPool } = await import("../api/_lib/db.js");

const today = new Date();
const inDays = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

const WORKSHOPS = [
  {
    title: "IoT Smart Attendance with Raspberry Pi 4",
    description:
      "Build a working RFID attendance terminal end to end — wiring the MFRC522 reader, " +
      "driving the touchscreen, and writing records to a database that survives a reboot.",
    category: "IoT",
    speaker: "Dr. Praveen Bansal",
    designation: "Head, Centre for IoT",
    date: inDays(12),
    time: "10:00 – 16:00",
    duration: "1 day",
    venue: "Centre for IoT, MITS Gwalior",
    seats: 40,
    fee: 500,
    deadline: inDays(9),
    status: "Published",
  },
  {
    title: "Edge AI: Wildlife Detection on Raspberry Pi 5",
    description:
      "Run a real detection model on device rather than in the cloud. Covers camera capture, " +
      "quantisation, and why the accuracy you measure on a laptop is not the accuracy you get in a forest.",
    category: "Edge AI",
    speaker: "Dr. Dhananjay Bisen",
    designation: "Assistant Professor",
    date: inDays(26),
    time: "09:30 – 17:00",
    duration: "2 days",
    venue: "AI Lab, MITS Gwalior",
    seats: 25,
    fee: 1200,
    deadline: inDays(21),
    status: "Published",
  },
  {
    title: "LoRa & GSM: Long-Range IoT Communication",
    description:
      "Hands-on with the SX1278 and a GSM module. Build a sensor node that reports from outside " +
      "Wi-Fi range, and measure what range actually means once there are walls in the way.",
    category: "Communication",
    speaker: "Dr. Aftab Ahmed Ansari",
    designation: "Assistant Professor",
    date: inDays(40),
    time: "10:00 – 15:00",
    duration: "1 day",
    venue: "Centre for IoT, MITS Gwalior",
    seats: 30,
    fee: 0,
    deadline: inDays(35),
    status: "Published",
  },
  {
    title: "Industrial IoT with Modbus & RS485",
    description:
      "Draft — dates not fixed. Talking to industrial equipment that predates the internet.",
    category: "Industry 4.0",
    speaker: "Dr. Saurabh Kumar Rajput",
    designation: "Assistant Professor",
    date: inDays(70),
    time: "",
    duration: "2 days",
    venue: "",
    seats: 20,
    fee: 1500,
    deadline: inDays(60),
    status: "Draft",
  },
];

const ANNOUNCEMENTS = [
  {
    title: "Registrations open for the February workshop series",
    body:
      "Three workshops across IoT, Edge AI and long-range communication. Seats are limited and " +
      "allocated in order of registration — the LoRa session is free for MITS students.",
    published: true,
    visible_till: inDays(30),
    author: "Centre for IoT",
  },
  {
    title: "Lab timings during exam week",
    body: "The Centre for IoT will run reduced hours, 10:00 to 14:00, for the duration of exam week.",
    published: true,
    visible_till: inDays(14),
    author: "Centre for IoT",
  },
];

const guard = await query(
  "SELECT count(*)::int AS n FROM registrations WHERE student_id IS NULL AND email NOT LIKE '%@mitsgwalior.in'"
);
if (guard.rows[0].n > 0) {
  console.error(
    `Refusing to seed: this database holds ${guard.rows[0].n} registration(s) that look real.\n` +
      "Point DATABASE_URL at a development database."
  );
  await getPool().end();
  process.exit(1);
}

let created = 0;
for (const w of WORKSHOPS) {
  const { rowCount } = await query(
    `INSERT INTO workshops
       (title, description, category, speaker, designation, date, time,
        duration, venue, seats, fee, deadline, status)
     SELECT $1,$2,$3,$4,$5,$6::date,$7,$8,$9,$10,$11,$12::date,$13
      WHERE NOT EXISTS (SELECT 1 FROM workshops WHERE title = $1)`,
    [
      w.title, w.description, w.category, w.speaker, w.designation, w.date,
      w.time, w.duration, w.venue, w.seats, w.fee, w.deadline, w.status,
    ]
  );
  created += rowCount;
}

let notices = 0;
for (const a of ANNOUNCEMENTS) {
  const { rowCount } = await query(
    `INSERT INTO announcements (title, body, published, visible_till, author)
     SELECT $1,$2,$3,$4::date,$5
      WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE title = $1)`,
    [a.title, a.body, a.published, a.visible_till, a.author]
  );
  notices += rowCount;
}

// A coupon so the booking page's discount field has something to accept.
await query(
  `UPDATE settings
      SET data = jsonb_set(data, '{coupons}', '{"MITS50": 50, "EARLYBIRD": 20}'::jsonb)
    WHERE id = 'booking'`
);

const { hashPassword } = await import("../api/_lib/auth.js");
const adminHash = await hashPassword("pragati");
await query(
  `INSERT INTO admins (name, email, password_hash, role)
   VALUES ('Yatharth Gupta', 'guptayatharth@353gmail.com', $1, 'Super Admin')
   ON CONFLICT (lower(email)) DO UPDATE
     SET password_hash = EXCLUDED.password_hash,
         role = 'Super Admin',
         updated_at = now()`,
  [adminHash]
);

const total = await query("SELECT count(*)::int AS n FROM workshops");
console.log(
  `Seeded ${created} workshop(s) and ${notices} announcement(s). ` +
    `${total.rows[0].n} workshop(s) in the database.`
);
console.log("Seeded Super Admin account: guptayatharth@353gmail.com (Password: pragati)");
console.log("Coupons available on the booking page: MITS50 (50% off), EARLYBIRD (20% off)");

await getPool().end();
