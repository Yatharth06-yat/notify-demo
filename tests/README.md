# API tests

Two shell suites that exercise the student portal against a **running dev
server and a real database**. They are integration tests on purpose: the things
most worth checking here — a transaction that must commit before it throws, a
unique index, a token that must not work on the other portal — are exactly the
things a mocked test would have agreed with while production stayed broken.

## Running them

```bash
docker compose up -d                       # Postgres on :55432
npm run db:migrate

npm run dev > /tmp/iotify-dev.log 2>&1 &   # the log matters, see below

./tests/student-auth.sh
./tests/registration-linking.sh
```

Both exit non-zero if anything fails, so they work in CI as-is.

### Why they read the dev server's log

One-time codes are stored as scrypt hashes, so there is no way to read a usable
code back out of the database — that is the entire point of hashing them. With
no mail provider configured, `api/_lib/mailer.js` prints the message to the
server log instead of sending it, and the tests scrape the code from there, the
same way a student would read it out of an inbox.

Point `DEV_LOG` somewhere else if you redirect the dev server elsewhere:

```bash
DEV_LOG=/path/to/your.log ./tests/student-auth.sh
```

## What they cover

`student-auth.sh` (43 checks)

- institute-domain allowlist, and malformed addresses
- codes stored hashed, never in plaintext
- wrong / malformed / expired codes, and the attempt counter behind them
- replay: a consumed code cannot be reused
- audience separation — a student token is refused by admin routes and vice versa
- login, including case-insensitivity and wrong passwords
- enumeration resistance: identical responses whether or not an account exists
- all three code rate limits — 3 codes/hour/address, 5 tries/code, 10 failures/24h
- sign-in throttling on both portals, and that a success clears the budget

`registration-linking.sh` (12 checks)

- a booking made before the account existed is back-linked at signup
- a booking made while signed in is stamped with `student_id` at insert
- a signed-in booking is recorded under the *verified* address, not whatever
  was typed into the form
- the student's own bookings list, with workshop details joined on

## Test data

Both suites create and delete their own rows, keyed to
`@mitsgwalior.in` addresses that no real student would hold
(`test.student@`, `link.test@`) and a workshop titled `Linking Test Workshop`.
They clean up after themselves, but they do **delete** those rows on the way in,
so point them at a development database rather than anything you care about.
