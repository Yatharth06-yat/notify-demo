-- IoTify Lab — PostgreSQL schema
--
-- Apply with:  npm run db:migrate
-- Safe to re-run; every statement is idempotent.
--
-- What used to be Firestore collections are ordinary tables. The two places
-- where the data really is schemaless — the settings documents and the coupon
-- map — stay as JSONB rather than being forced into columns.

-- gen_random_uuid() is built in from PostgreSQL 13 onward.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── admins ────────────────────────────────────────────────────────────
-- Replaces Firebase Auth users + the /admins/{uid} authorisation document.
-- A row here is both the credential and the grant: deleting it revokes access.
CREATE TABLE IF NOT EXISTS admins (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  password_hash TEXT        NOT NULL,
  role          TEXT        NOT NULL DEFAULT 'Volunteer'
                CHECK (role IN ('Super Admin', 'Faculty', 'Coordinator', 'Volunteer')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Logins are case-insensitive, so uniqueness has to be too.
CREATE UNIQUE INDEX IF NOT EXISTS admins_email_key ON admins (lower(email));

-- ── files ─────────────────────────────────────────────────────────────
-- Replaces Firebase Storage. Banners, speaker photos and announcement images
-- live in the database and are served back through GET /api/files/:id.
CREATE TABLE IF NOT EXISTS files (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename     TEXT        NOT NULL,
  content_type TEXT        NOT NULL,
  size         INTEGER     NOT NULL,
  bytes        BYTEA       NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── workshops ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS workshops (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title              TEXT        NOT NULL,
  description        TEXT        NOT NULL DEFAULT '',
  category           TEXT        NOT NULL DEFAULT '',
  speaker            TEXT        NOT NULL DEFAULT '',
  designation        TEXT        NOT NULL DEFAULT '',
  date               DATE,
  time               TEXT        NOT NULL DEFAULT '',
  duration           TEXT        NOT NULL DEFAULT '',
  venue              TEXT        NOT NULL DEFAULT '',
  seats              INTEGER     NOT NULL DEFAULT 0 CHECK (seats >= 0),
  fee                NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (fee >= 0),
  deadline           DATE,
  status             TEXT        NOT NULL DEFAULT 'Draft'
                     CHECK (status IN ('Draft', 'Published', 'Closed')),
  banner             TEXT        NOT NULL DEFAULT '',
  speaker_photo_url  TEXT        NOT NULL DEFAULT '',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS workshops_status_date_idx ON workshops (status, date DESC);

-- ── registrations ─────────────────────────────────────────────────────
-- ON DELETE RESTRICT: a workshop with students booked onto it cannot be
-- deleted out from under them by accident.
CREATE TABLE IF NOT EXISTS registrations (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT        NOT NULL,
  enrollment     TEXT        NOT NULL,
  email          TEXT        NOT NULL,
  phone          TEXT        NOT NULL,
  gender         TEXT        NOT NULL DEFAULT '',
  department     TEXT        NOT NULL DEFAULT '',
  year           TEXT        NOT NULL DEFAULT '',
  semester       TEXT        NOT NULL DEFAULT '',
  college_name   TEXT        NOT NULL DEFAULT '',
  workshop_id    UUID        NOT NULL REFERENCES workshops (id) ON DELETE RESTRICT,
  workshop_title TEXT        NOT NULL DEFAULT '',
  coupon_code    TEXT        NOT NULL DEFAULT '',
  amount         NUMERIC(10, 2) NOT NULL DEFAULT 0,
  status         TEXT        NOT NULL DEFAULT 'Pending'
                 CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  reviewed_by    TEXT        NOT NULL DEFAULT '',
  reviewed_at    TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS registrations_workshop_created_idx
  ON registrations (workshop_id, created_at DESC);
CREATE INDEX IF NOT EXISTS registrations_status_created_idx
  ON registrations (status, created_at DESC);

-- One student, one seat: the same email cannot book the same workshop twice.
-- Firestore had no way to express this, so duplicates had to be cleaned up by
-- hand. Here the database refuses them.
CREATE UNIQUE INDEX IF NOT EXISTS registrations_workshop_email_key
  ON registrations (workshop_id, lower(email));

-- ── announcements ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS announcements (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  body         TEXT        NOT NULL DEFAULT '',
  visible_till DATE,
  published    BOOLEAN     NOT NULL DEFAULT true,
  image_url    TEXT        NOT NULL DEFAULT '',
  author       TEXT        NOT NULL DEFAULT '',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS announcements_published_idx
  ON announcements (published, created_at DESC);

-- ── settings ──────────────────────────────────────────────────────────
-- Two singleton documents: 'general' (lab name / contact) and 'booking'
-- (the coupon map). Genuinely open-ended, so it stays a JSONB document.
CREATE TABLE IF NOT EXISTS settings (
  id         TEXT PRIMARY KEY,
  data       JSONB       NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO settings (id, data) VALUES
  ('general', '{"name": "IoTify Lab", "email": "", "phone": ""}'::jsonb),
  ('booking', '{"coupons": {}}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- ── activity_logs ─────────────────────────────────────────────────────
-- Append-only audit trail. The API never exposes UPDATE or DELETE for it.
-- actor_id is nullable so revoking an admin doesn't erase their history.
CREATE TABLE IF NOT EXISTS activity_logs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id   UUID REFERENCES admins (id) ON DELETE SET NULL,
  actor_name TEXT        NOT NULL DEFAULT 'Unknown',
  action     TEXT        NOT NULL,
  target     TEXT        NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS activity_logs_created_idx ON activity_logs (created_at DESC);

-- ── students ──────────────────────────────────────────────────────────
-- Registrations used to be anonymous rows: a student typed their name and
-- enrolment number afresh for every workshop, and the only thing linking two
-- bookings together was a string match on the email column. That made booking
-- history, certificates and "how many students have we actually taught?"
-- impossible to answer. A row here is the identity those rows hang off.
--
-- The institute address is the natural key — the university already issued it,
-- so owning it is the enrolment proof. recovery_email exists because that
-- mailbox is deactivated within a year of graduating and the account is meant
-- to outlive it.
CREATE TABLE IF NOT EXISTS students (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email             TEXT        NOT NULL,
  recovery_email    TEXT        NOT NULL DEFAULT '',
  name              TEXT        NOT NULL,
  enrollment        TEXT        NOT NULL DEFAULT '',
  branch            TEXT        NOT NULL DEFAULT '',
  year              TEXT        NOT NULL DEFAULT '',
  phone             TEXT        NOT NULL DEFAULT '',
  password_hash     TEXT        NOT NULL,
  email_verified_at TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Same case-insensitive uniqueness as admins: logins must not depend on caps.
CREATE UNIQUE INDEX IF NOT EXISTS students_email_key ON students (lower(email));

-- ── email_otps ────────────────────────────────────────────────────────
-- One-time codes for proving someone owns an address, at signup and at
-- password reset. Codes are hashed with the same scrypt helper as passwords,
-- so a leaked backup does not hand anyone a working code.
--
-- Rows are kept after they are consumed rather than deleted: the 24-hour
-- failure count is derived from them, and clearing them would reset an
-- attacker's budget for free. `purge_expired_otps()` trims the old ones.
CREATE TABLE IF NOT EXISTS email_otps (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT        NOT NULL,
  otp_hash    TEXT        NOT NULL,
  purpose     TEXT        NOT NULL
              CHECK (purpose IN ('signup', 'reset')),
  attempts    INT         NOT NULL DEFAULT 0,
  expires_at  TIMESTAMPTZ NOT NULL,
  consumed_at TIMESTAMPTZ,
  request_ip  TEXT        NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Every read is "the newest live code for this address and purpose", and the
-- rate limiter counts recent rows per address and per IP.
CREATE INDEX IF NOT EXISTS email_otps_lookup_idx
  ON email_otps (lower(email), purpose, created_at DESC);
CREATE INDEX IF NOT EXISTS email_otps_ip_idx
  ON email_otps (request_ip, created_at DESC);

-- ── login_attempts ────────────────────────────────────────────────────
-- Failed sign-ins, for throttling. scrypt makes each guess expensive, but
-- expensive is not the same as limited: an attacker with a password list and
-- patience gets unlimited tries against both portals without this.
--
-- Only failures are stored, and a successful sign-in clears the address's
-- rows — so a student who mistypes twice and then gets in starts clean rather
-- than carrying a budget around for the next quarter of an hour.
CREATE TABLE IF NOT EXISTS login_attempts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT        NOT NULL,
  request_ip TEXT        NOT NULL DEFAULT '',
  portal     TEXT        NOT NULL CHECK (portal IN ('admin', 'student')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS login_attempts_identifier_idx
  ON login_attempts (identifier, created_at DESC);
CREATE INDEX IF NOT EXISTS login_attempts_ip_idx
  ON login_attempts (request_ip, created_at DESC);

-- ── registrations → students ──────────────────────────────────────────
-- Nullable and ON DELETE SET NULL on purpose. Registrations taken before
-- accounts existed have no student, and a booking is a record of something
-- that happened — deleting the account must not erase it.
ALTER TABLE registrations
  ADD COLUMN IF NOT EXISTS student_id UUID REFERENCES students (id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS registrations_student_idx
  ON registrations (student_id, created_at DESC);
