# IoTify Lab — Admin Portal Setup

One-time setup to get the booking → admin flow running end to end.

The site is a React SPA plus a small API (`api/`) that talks to PostgreSQL.
The browser never holds database credentials: it calls the API, and the API
enforces every permission.

---

## 1. Get a PostgreSQL database

Any Postgres 13+ will do.

**Hosted** (recommended for Vercel) — [Neon](https://neon.tech),
[Supabase](https://supabase.com), [Railway](https://railway.app) or Vercel
Postgres. Create a database and copy its connection string.

**Local**

```bash
createdb iotify
# connection string: postgres://<you>@localhost:5432/iotify
```

## 2. Configure

```bash
cp .env.example .env
```

Fill in two values:

| Variable | What it is |
|---|---|
| `DATABASE_URL` | The connection string from step 1 |
| `JWT_SECRET` | Any random string, 32+ characters — it signs admin sessions |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

> Neither has a `VITE_` prefix, and that is deliberate: that prefix is what
> tells Vite to inline a value into the JavaScript sent to the browser.

## 3. Create the tables

```bash
npm run db:migrate
```

This applies `db/schema.sql`. Every statement is idempotent, so re-run it
freely after pulling changes.

## 4. Create the first Super Admin

```bash
npm run db:create-admin -- you@example.com 'a-strong-password' 'Your Name'
```

The first account is a Super Admin automatically. Re-running with an existing
email resets that account's password — that is the way back in if you ever
lock yourself out.

Now start the app and sign in at **`/admin`**:

```bash
npm run dev
```

Every later admin is created from **Settings → Manage Admins**, which sets
their password at the same time. An admin row *is* the authorisation: delete
it and access ends immediately.

## 5. Deploy

On Vercel, add `DATABASE_URL` and `JWT_SECRET` under **Project → Settings →
Environment Variables**, then deploy. `api/[...path].js` runs as a single
serverless function covering every `/api/*` route; the SPA rewrite in
`vercel.json` already excludes it.

Run `npm run db:migrate` once against the production database (locally, with
`DATABASE_URL` pointing at it) before the first deploy.

---

## Roles

| | Super Admin | Faculty | Coordinator | Volunteer |
|---|:-:|:-:|:-:|:-:|
| View everything | ✅ | ✅ | ✅ | ✅ |
| Create / edit workshops | ✅ | ✅ | ✅ | — |
| Delete workshops | ✅ | ✅ | — | — |
| Approve / reject registrations | ✅ | ✅ | ✅ | — |
| Delete registrations | ✅ | ✅ | — | — |
| Post announcements | ✅ | ✅ | ✅ | — |
| Edit settings / manage admins | ✅ | — | — | — |

Enforced in `api/_lib/auth.js`. The matching table in
`src/contexts/AuthContext.jsx` only decides which buttons to grey out — it
grants nothing, and the API re-reads the role from the database on every
request, so a demotion takes effect immediately rather than when the token
expires.

## What the API protects

| Route | Public | Admin |
|---|---|---|
| `GET /api/public/workshops` | Published workshops only | — |
| `GET /api/public/announcements` | Published and unexpired only | — |
| `POST /api/public/coupon` | Checks one code it was given | — |
| `POST /api/public/registrations` | Create, validated and re-priced | — |
| `/api/workshops`, `/api/announcements` | none | full CRUD by role |
| `/api/registrations` | none | read / review / delete |
| `/api/settings` | lab contact details only | Super Admin writes |
| `/api/admins` | none | Super Admin writes |
| `/api/activity-logs` | none | append-only |
| `/api/files/:id` | read (images on the public site) | admins upload |

The public can never *read* registrations — student names, emails and phone
numbers are not exposed by any endpoint.

A booking is checked entirely server-side: the workshop must be Published,
its deadline must not have passed, a seat must be free, and the amount is
recomputed from the fee and coupon on record rather than trusted from the
browser. Seat capacity is enforced with `SELECT … FOR UPDATE` inside a
transaction, so simultaneous bookings cannot overshoot `seats`.

## Daily flow

1. **Workshops → Create Workshop** → set status **Published**
2. It appears in the dropdown on `/book` — drafts and closed workshops never do
3. Students register → rows land in **Registrations**
4. Approve / reject individually or with **Approve all in view**
5. **Exports** → CSV or Excel, filtered by workshop / status / department / year
6. **Workshops → Close registrations** (padlock icon) when the workshop is full

## Optional: status emails

Students are emailed on approve/reject only if EmailJS is configured. Without
the keys the portal skips sending — nothing errors.

1. Create a free account at <https://dashboard.emailjs.com>
2. Add an email service and two templates (approved / rejected)
3. Fill `VITE_EMAILJS_*` in `.env`

Template variables: `to_name`, `to_email`, `workshop_name`, `status`,
`lab_name`, `lab_email`, `lab_phone`.

## Routes

| Path | Page |
|---|---|
| `/book` | Public booking form |
| `/admin` | Admin login |
| `/admin/dashboard` | Stats and charts |
| `/admin/workshops` | Workshop CRUD |
| `/admin/registrations` | Search, filter, approve, reject |
| `/admin/announcements` | Public notices |
| `/admin/exports` | CSV / Excel |
| `/admin/logs` | Audit trail |
| `/admin/settings` | Profile, lab info, coupons, admins |

Deep links need a server rewrite to `index.html`, otherwise `/admin` 404s in
production. `vercel.json` handles this; on another host add the equivalent SPA
fallback, excluding `/api`.

## Student accounts

Students sign up with their institute email. The address is the identity — the
university already issued it, so owning it is the enrolment proof, and no
manual approval step is needed.

Set the domains that may hold an account (defaults to `mitsgwalior.in`;
subdomains are matched too):

```
STUDENT_EMAIL_DOMAINS=mitsgwalior.in
```

### Codes need a server-side mailer

The EmailJS block sends approval notices **from the browser**. That cannot
carry a one-time code — anything the browser can send, it can also read. Codes
go out through `api/_lib/mailer.js` instead:

| `RESEND_API_KEY` | Behaviour |
|---|---|
| set | Delivered over Resend |
| blank, development | Printed to the `npm run dev` terminal |
| blank, production | Refused, so a missing key fails loudly rather than logging codes |

### Endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/student/otp` | Send a code (`purpose`: `signup` or `reset`) |
| POST | `/api/student/register` | Verify the code and create the account |
| POST | `/api/student/login` | Email + password |
| POST | `/api/student/reset` | Verify the code and set a new password |
| GET / PATCH | `/api/student/me` | Own profile |
| GET | `/api/student/registrations` | Own bookings |

### How bookings connect to accounts

Booking stays open to anyone — no account is required. A registration made
while signed in is stamped with `student_id` as it is inserted, and recorded
under the verified address rather than whatever was typed into the form.
Registrations made earlier are matched by email and back-linked when the
student signs up.

### Limits on codes

Six digits is only worth something if guessing is metered, so: codes expire
after 15 minutes, allow 5 tries each, 3 codes per address per hour, 10 per IP
per hour, and 10 failed tries in 24 hours locks the address until the next day.
Codes are stored as scrypt hashes and consumed the moment they match, in the
same transaction as the check.

Email proves ownership at signup and password reset only. It is deliberately
not a per-login second factor: NIST does not accept email as an out-of-band
channel, because the inbox is reachable from the same place the password is.

### Sign-in throttling

Both portals cap failed sign-ins: 10 per address and 50 per IP in a rolling 15
minutes, tracked in `login_attempts`. Signing in successfully clears the
address's failures. scrypt already makes each guess expensive, which is not the
same as limiting how many guesses are available — the cost per attempt only
decides how long a password list takes to work through.

The per-IP limit matters separately: without it one host can spray a single
common password across every address in the directory, each staying under its
own cap.

### Tests

`tests/student-auth.sh` (43 checks) and `tests/registration-linking.sh` (12)
cover all of the above against a running server. See `tests/README.md`.

## Known limits

- **Screens refresh by polling, not a live socket.** Anything you change shows
  up immediately on your own screen; a change made on someone else's machine
  arrives within 20 seconds, or as soon as you click the refresh control in the
  top bar. The top bar always says how fresh the data is.
- **Uploaded images live in the database** (`files` table) and are served from
  `/api/files/:id`. Fine for banners and speaker photos; a bucket would be
  better if this ever grows to thousands of images. Uploads are capped at 4 MB
  because serverless request bodies are.
- **Payment is recorded, not collected.** The fee and coupon are stored on the
  registration; there is no gateway integration.
- **Deleting a workshop with registrations is refused** by the foreign key.
  Delete the registrations first, or close the workshop instead.

## Troubleshooting

| Symptom | Cause |
|---|---|
| "The portal isn't configured yet" | `DATABASE_URL` or `JWT_SECRET` missing — check `.env`, restart `npm run dev` |
| "Incorrect email or password" for a known-good account | Reset it: `npm run db:create-admin -- <email> <new-password>` |
| Everyone signed out at once | `JWT_SECRET` changed — every existing token is void |
| `db:migrate` fails on TLS | Set `PGSSLMODE=disable` for a local database without TLS |
