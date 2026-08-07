#!/usr/bin/env bash
# End-to-end exercise of the student auth flow against the running dev server.
# Reads OTP codes straight out of the database, the way a real inbox would.
set -uo pipefail

API=http://localhost:5173/api
PSQL="docker exec -i iotify-db psql -U postgres -d iotify -tAX"
EMAIL="test.student@mitsgwalior.in"
PASS="correct-horse-battery"

pass=0; fail=0
check() { # check <label> <expected> <actual>
  if [ "$2" = "$3" ]; then printf '  ok    %-52s %s\n' "$1" "$2"; pass=$((pass+1))
  else printf '  FAIL  %-52s expected=%s got=%s\n' "$1" "$2" "$3"; fail=$((fail+1)); fi
}
code_for() { $PSQL -c "SELECT id FROM email_otps WHERE lower(email)='$EMAIL' AND purpose='$1' AND consumed_at IS NULL ORDER BY created_at DESC LIMIT 1"; }
status() { curl -s -o /tmp/body.json -w '%{http_code}' "$@"; }
body()   { cat /tmp/body.json; }

echo "── reset test state ──────────────────────────────────────────────"
$PSQL -c "DELETE FROM registrations WHERE lower(email)='$EMAIL';" >/dev/null
$PSQL -c "DELETE FROM students WHERE lower(email)='$EMAIL';" >/dev/null
$PSQL -c "DELETE FROM email_otps WHERE lower(email)='$EMAIL';" >/dev/null

echo
echo "── domain allowlist ──────────────────────────────────────────────"
s=$(status -X POST "$API/student/otp" -H 'Content-Type: application/json' -d '{"email":"someone@gmail.com"}')
check "outside domain rejected" 400 "$s"
s=$(status -X POST "$API/student/otp" -H 'Content-Type: application/json' -d '{"email":"not-an-email"}')
check "malformed address rejected" 400 "$s"

echo
echo "── request a code ────────────────────────────────────────────────"
s=$(status -X POST "$API/student/otp" -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\"}")
check "code issued" 200 "$s"
stored=$(code_for signup)
check "row created, hash only" 1 "$( [ -n "$stored" ] && echo 1 || echo 0 )"
plain=$($PSQL -c "SELECT otp_hash FROM email_otps WHERE id='$stored'")
check "code not stored in plaintext" 1 "$(echo "$plain" | grep -qE '^scrypt\$' && echo 1 || echo 0)"

# Pull the real code out of the dev mail log, as a student would from an inbox.
CODE=$(grep -aoE 'Your code is [0-9]{6}' "${DEV_LOG:-/tmp/iotify-dev.log}" | tail -1 | grep -oE '[0-9]{6}')
check "code delivered to dev transport" 6 "${#CODE}"
# Everything below needs a real code. Bail loudly rather than reporting a dozen
# cascading failures that all trace back to an unreadable log.
if [ "${#CODE}" -ne 6 ]; then
  echo "  ABORT: no code found in ${DEV_LOG:-/tmp/iotify-dev.log}."
  echo "         Start the server with: npm run dev > /tmp/iotify-dev.log 2>&1 &"
  exit 1
fi

echo
echo "── wrong code paths ──────────────────────────────────────────────"
WRONG=$(printf '%06d' $(( (10#$CODE + 1) % 1000000 )))
s=$(status -X POST "$API/student/register" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"code\":\"$WRONG\",\"name\":\"Test\",\"password\":\"$PASS\"}")
check "wrong code rejected" 400 "$s"
check "attempt counted" 1 "$($PSQL -c "SELECT attempts FROM email_otps WHERE id='$stored'")"
s=$(status -X POST "$API/student/register" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"code\":\"12345\",\"name\":\"Test\",\"password\":\"$PASS\"}")
check "non-6-digit rejected" 400 "$s"
s=$(status -X POST "$API/student/register" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"code\":\"$CODE\",\"name\":\"Test\",\"password\":\"short\"}")
check "weak password rejected" 400 "$s"

echo
echo "── register ──────────────────────────────────────────────────────"
s=$(status -X POST "$API/student/register" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"code\":\"$CODE\",\"name\":\"Test Student\",\"password\":\"$PASS\",\"branch\":\"IoT\",\"year\":\"3\"}")
check "account created" 201 "$s"
TOKEN=$(body | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>console.log(JSON.parse(d).token||""))')
check "token returned" 1 "$( [ -n "$TOKEN" ] && echo 1 || echo 0 )"
check "email marked verified" 1 "$($PSQL -c "SELECT count(*) FROM students WHERE lower(email)='$EMAIL' AND email_verified_at IS NOT NULL")"

echo
echo "── replay protection ─────────────────────────────────────────────"
check "code consumed" 1 "$($PSQL -c "SELECT count(*) FROM email_otps WHERE id='$stored' AND consumed_at IS NOT NULL")"
s=$(status -X POST "$API/student/register" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"code\":\"$CODE\",\"name\":\"Impostor\",\"password\":\"$PASS\"}")
check "same code cannot be reused" 409 "$s"

echo
echo "── session ───────────────────────────────────────────────────────"
s=$(status "$API/student/me" -H "Authorization: Bearer $TOKEN")
check "me with token" 200 "$s"
s=$(status "$API/student/me")
check "me without token" 401 "$s"
s=$(status "$API/student/registrations" -H "Authorization: Bearer $TOKEN")
check "own registrations" 200 "$s"

echo
echo "── audience separation ───────────────────────────────────────────"
s=$(status "$API/auth/me" -H "Authorization: Bearer $TOKEN")
check "student token rejected by admin route" 401 "$s"
ADMIN_TOKEN=$(curl -s -X POST "$API/auth/login" -H 'Content-Type: application/json' \
  -d '{"email":"admin@mitsgwalior.in","password":"iotify-dev-2026"}' \
  | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>console.log(JSON.parse(d).token||""))')
check "admin can still log in" 1 "$( [ -n "$ADMIN_TOKEN" ] && echo 1 || echo 0 )"
s=$(status "$API/auth/me" -H "Authorization: Bearer $ADMIN_TOKEN")
check "admin token works on admin route" 200 "$s"
s=$(status "$API/student/me" -H "Authorization: Bearer $ADMIN_TOKEN")
check "admin token rejected by student route" 401 "$s"

echo
echo "── login ─────────────────────────────────────────────────────────"
s=$(status -X POST "$API/student/login" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")
check "correct password" 200 "$s"
s=$(status -X POST "$API/student/login" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"password\":\"wrong-password\"}")
check "wrong password" 400 "$s"
s=$(status -X POST "$API/student/login" -H 'Content-Type: application/json' \
  -d "{\"email\":\"TEST.STUDENT@MITSGWALIOR.IN\",\"password\":\"$PASS\"}")
check "login is case-insensitive" 200 "$s"

echo
echo "── enumeration resistance ────────────────────────────────────────"
s=$(status -X POST "$API/student/otp" -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\"}")
check "signup code for existing account: same 200" 200 "$s"
s=$(status -X POST "$API/student/otp" -H 'Content-Type: application/json' \
  -d '{"email":"nobody.here@mitsgwalior.in","purpose":"reset"}')
check "reset code for unknown account: same 200" 200 "$s"

echo
echo "── request rate limit (3/hour per address) ───────────────────────"
$PSQL -c "DELETE FROM email_otps WHERE lower(email)='$EMAIL';" >/dev/null
for i in 1 2 3; do
  status -X POST "$API/student/otp" -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\",\"purpose\":\"reset\"}" >/dev/null
done
s=$(status -X POST "$API/student/otp" -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\",\"purpose\":\"reset\"}")
check "4th request in an hour throttled" 429 "$s"

echo
echo "── per-code attempt cap (5) ──────────────────────────────────────"
$PSQL -c "DELETE FROM email_otps WHERE lower(email)='$EMAIL';" >/dev/null
status -X POST "$API/student/otp" -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\",\"purpose\":\"reset\"}" >/dev/null
for i in 1 2 3 4 5; do
  status -X POST "$API/student/reset" -H 'Content-Type: application/json' \
    -d "{\"email\":\"$EMAIL\",\"code\":\"000000\",\"password\":\"$PASS\"}" >/dev/null
done
burned=$($PSQL -c "SELECT count(*) FROM email_otps WHERE lower(email)='$EMAIL' AND purpose='reset' AND consumed_at IS NULL AND expires_at > now()")
check "code burned after 5 wrong tries" 0 "$burned"
check "5 failures recorded so far" 5 "$($PSQL -c "SELECT coalesce(sum(attempts),0) FROM email_otps WHERE lower(email)='$EMAIL' AND created_at > now() - interval '24 hours'")"
s=$(status -X POST "$API/student/otp" -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\",\"purpose\":\"reset\"}")
check "5 failures is under the daily cap, still allowed" 200 "$s"

echo
echo "── daily lockout (10 failures / 24h) ─────────────────────────────"
# A second code, exhausted the same way, takes the 24h total to 10.
for i in 1 2 3 4 5; do
  status -X POST "$API/student/reset" -H 'Content-Type: application/json' \
    -d "{\"email\":\"$EMAIL\",\"code\":\"000000\",\"password\":\"$PASS\"}" >/dev/null
done
check "10 failures recorded" 10 "$($PSQL -c "SELECT coalesce(sum(attempts),0) FROM email_otps WHERE lower(email)='$EMAIL' AND created_at > now() - interval '24 hours'")"
s=$(status -X POST "$API/student/otp" -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\",\"purpose\":\"reset\"}")
check "locked out after 10 cumulative failures" 429 "$s"
s=$(status -X POST "$API/student/reset" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"code\":\"000000\",\"password\":\"$PASS\"}")
check "verifying is locked out too, not just requesting" 429 "$s"

echo
echo "── login throttle (10 failures / 15 min) ─────────────────────────"
$PSQL -c "DELETE FROM login_attempts;" >/dev/null
for i in $(seq 1 10); do
  status -X POST "$API/student/login" -H 'Content-Type: application/json' \
    -d "{\"email\":\"$EMAIL\",\"password\":\"wrong-password\"}" >/dev/null
done
check "10 failures recorded" 10 "$($PSQL -c "SELECT count(*) FROM login_attempts WHERE identifier='$EMAIL'")"
s=$(status -X POST "$API/student/login" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"password\":\"wrong-password\"}")
check "11th attempt throttled" 429 "$s"
s=$(status -X POST "$API/student/login" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")
check "correct password refused while throttled" 429 "$s"

$PSQL -c "DELETE FROM login_attempts;" >/dev/null
s=$(status -X POST "$API/student/login" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")
check "works again once the window clears" 200 "$s"

echo
echo "── a successful sign-in returns the budget ───────────────────────"
$PSQL -c "DELETE FROM login_attempts;" >/dev/null
for i in 1 2 3; do
  status -X POST "$API/student/login" -H 'Content-Type: application/json' \
    -d "{\"email\":\"$EMAIL\",\"password\":\"wrong-password\"}" >/dev/null
done
check "3 failures banked" 3 "$($PSQL -c "SELECT count(*) FROM login_attempts WHERE identifier='$EMAIL'")"
status -X POST "$API/student/login" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}" >/dev/null
check "cleared after signing in" 0 "$($PSQL -c "SELECT count(*) FROM login_attempts WHERE identifier='$EMAIL'")"

echo
echo "── the admin portal is throttled too ─────────────────────────────"
$PSQL -c "DELETE FROM login_attempts;" >/dev/null
for i in $(seq 1 10); do
  status -X POST "$API/auth/login" -H 'Content-Type: application/json' \
    -d '{"email":"admin@mitsgwalior.in","password":"wrong-password"}' >/dev/null
done
s=$(status -X POST "$API/auth/login" -H 'Content-Type: application/json' \
  -d '{"email":"admin@mitsgwalior.in","password":"wrong-password"}')
check "admin login throttled" 429 "$s"
check "recorded against the admin portal" 10 "$($PSQL -c "SELECT count(*) FROM login_attempts WHERE portal='admin'")"
$PSQL -c "DELETE FROM login_attempts;" >/dev/null
s=$(status -X POST "$API/auth/login" -H 'Content-Type: application/json' \
  -d '{"email":"admin@mitsgwalior.in","password":"iotify-dev-2026"}')
check "admin can still sign in normally" 200 "$s"

echo
echo "──────────────────────────────────────────────────────────────────"
echo "  passed: $pass   failed: $fail"
[ "$fail" -eq 0 ]
