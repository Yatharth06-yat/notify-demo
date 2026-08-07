#!/usr/bin/env bash
# Verifies the two ways a registration gets tied to a student account:
#   1. booked before the account existed  -> back-linked at signup
#   2. booked while signed in             -> stamped at insert
set -uo pipefail

API=http://localhost:5173/api
PSQL="docker exec -i iotify-db psql -U postgres -d iotify -tAX"
EMAIL="link.test@mitsgwalior.in"
PASS="correct-horse-battery"
LOG="${DEV_LOG:-/tmp/iotify-dev.log}"

pass=0; fail=0
check() {
  if [ "$2" = "$3" ]; then printf '  ok    %-52s %s\n' "$1" "$2"; pass=$((pass+1))
  else printf '  FAIL  %-52s expected=%s got=%s\n' "$1" "$2" "$3"; fail=$((fail+1)); fi
}
status() { curl -s -o /tmp/lbody.json -w '%{http_code}' "$@"; }
jsonf() { node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{try{console.log(JSON.parse(d).$1??'')}catch{console.log('')}})" < /tmp/lbody.json; }

echo "── reset ─────────────────────────────────────────────────────────"
$PSQL -c "DELETE FROM registrations WHERE lower(email)='$EMAIL';" >/dev/null
$PSQL -c "DELETE FROM students WHERE lower(email)='$EMAIL';" >/dev/null
$PSQL -c "DELETE FROM email_otps WHERE lower(email)='$EMAIL';" >/dev/null
$PSQL -c "DELETE FROM registrations WHERE workshop_title='Linking Test Workshop';" >/dev/null
$PSQL -c "DELETE FROM workshops WHERE title='Linking Test Workshop';" >/dev/null

W1=$($PSQL -c "INSERT INTO workshops (title,status,seats,fee) VALUES ('Linking Test Workshop','Published',50,0) RETURNING id" | head -1 | tr -d "[:space:]")
W2=$($PSQL -c "INSERT INTO workshops (title,status,seats,fee) VALUES ('Linking Test Workshop','Published',50,0) RETURNING id" | head -1 | tr -d "[:space:]")

echo
echo "── 1. anonymous booking, before any account ──────────────────────"
s=$(status -X POST "$API/public/registrations" -H 'Content-Type: application/json' \
  -d "{\"workshopId\":\"$W1\",\"name\":\"Link Test\",\"enrollment\":\"0901\",\"email\":\"$EMAIL\",\"phone\":\"9999999999\",\"department\":\"IoT\",\"year\":\"3\"}")
check "booked anonymously" 201 "$s"
check "no student attached yet" 1 "$($PSQL -c "SELECT count(*) FROM registrations WHERE lower(email)='$EMAIL' AND student_id IS NULL")"

echo
echo "── 2. sign up ────────────────────────────────────────────────────"
status -X POST "$API/student/otp" -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\"}" >/dev/null
CODE=$(grep -aoE 'Your code is [0-9]{6}' "$LOG" | tail -1 | grep -oE '[0-9]{6}')
s=$(status -X POST "$API/student/register" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"code\":\"$CODE\",\"name\":\"Link Test\",\"password\":\"$PASS\"}")
check "account created" 201 "$s"
check "past booking back-linked" 1 "$(jsonf linkedRegistrations)"
TOKEN=$(jsonf token)
check "no orphaned rows left for this address" 0 "$($PSQL -c "SELECT count(*) FROM registrations WHERE lower(email)='$EMAIL' AND student_id IS NULL")"

echo
echo "── 3. booking while signed in ────────────────────────────────────"
s=$(status -X POST "$API/public/registrations" -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"workshopId\":\"$W2\",\"name\":\"Link Test\",\"enrollment\":\"0901\",\"email\":\"$EMAIL\",\"phone\":\"9999999999\",\"department\":\"IoT\",\"year\":\"3\"}")
check "booked while signed in" 201 "$s"
check "stamped with student_id at insert" 2 "$($PSQL -c "SELECT count(*) FROM registrations WHERE lower(email)='$EMAIL' AND student_id IS NOT NULL")"

echo
echo "── 4. typed email cannot override the verified one ───────────────"
W3=$($PSQL -c "INSERT INTO workshops (title,status,seats,fee) VALUES ('Linking Test Workshop','Published',50,0) RETURNING id" | head -1 | tr -d "[:space:]")
s=$(status -X POST "$API/public/registrations" -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"workshopId\":\"$W3\",\"name\":\"Impostor\",\"enrollment\":\"0902\",\"email\":\"someone.else@mitsgwalior.in\",\"phone\":\"8888888888\",\"department\":\"IoT\",\"year\":\"3\"}")
check "booking accepted" 201 "$s"
check "recorded under the verified address" 0 "$($PSQL -c "SELECT count(*) FROM registrations WHERE lower(email)='someone.else@mitsgwalior.in'")"

echo
echo "── 5. student sees their own bookings ────────────────────────────"
s=$(status "$API/student/registrations" -H "Authorization: Bearer $TOKEN")
check "registrations listed" 200 "$s"
check "all three visible" 3 "$(node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>console.log(JSON.parse(d).data.length))" < /tmp/lbody.json)"
check "workshop details joined on" "Linking Test Workshop" "$(node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>console.log(JSON.parse(d).data[0].workshop_title))" < /tmp/lbody.json)"

echo
echo "── cleanup ───────────────────────────────────────────────────────"
$PSQL -c "DELETE FROM registrations WHERE workshop_title='Linking Test Workshop';" >/dev/null
$PSQL -c "DELETE FROM workshops WHERE title='Linking Test Workshop';" >/dev/null

echo
echo "──────────────────────────────────────────────────────────────────"
echo "  passed: $pass   failed: $fail"
[ "$fail" -eq 0 ]
