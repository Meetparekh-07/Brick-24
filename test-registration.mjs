/**
 * Registration flow verification script
 */
const API = 'http://localhost:3001/api/register'

async function register(payload) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const text = await res.text()
  let json = null
  try {
    json = JSON.parse(text)
  } catch {
    json = { raw: text.slice(0, 100) }
  }
  return { status: res.status, json }
}

const unique = (prefix) => `${prefix}${Date.now()}`

async function runTests() {
  const results = []

  // TEST 1 - Valid registration
  const t1 = await register({
    teamName: unique('TechTitans'),
    collegeName: 'Hinduja',
    members: [{ name: 'Rishit', email: 'rishit@example.com' }],
  })
  results.push({
    name: 'Valid registration',
    pass: t1.status === 201 && t1.json.success && t1.json.registrationId?.startsWith('BRICK24-'),
    detail: t1,
  })

  // TEST 2 - Empty team name (backend)
  const t2 = await register({
    teamName: '',
    collegeName: 'Hinduja',
    members: [{ name: 'Rishit', email: 'rishit@example.com' }],
  })
  results.push({
    name: 'Empty team name rejected',
    pass: t2.status === 400 && t2.json.success === false,
    detail: t2,
  })

  // TEST 3 - Empty college
  const t3 = await register({
    teamName: unique('Team'),
    collegeName: '',
    members: [{ name: 'Rishit', email: 'rishit@example.com' }],
  })
  results.push({
    name: 'Empty college rejected',
    pass: t3.status === 400 && t3.json.success === false,
    detail: t3,
  })

  // TEST 4 - Invalid email
  const t4 = await register({
    teamName: unique('Team'),
    collegeName: 'Hinduja',
    members: [{ name: 'Rishit', email: 'not-an-email' }],
  })
  results.push({
    name: 'Invalid email rejected',
    pass: t4.status === 400 && t4.json.success === false,
    detail: t4,
  })

  // TEST 5 - Two members
  const t5 = await register({
    teamName: unique('TwoMember'),
    collegeName: 'Hinduja',
    members: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ],
  })
  results.push({
    name: 'Two members accepted',
    pass: t5.status === 201 && t5.json.success,
    detail: t5,
  })

  // TEST 6 - Four members
  const t6 = await register({
    teamName: unique('FourMember'),
    collegeName: 'Hinduja',
    members: [
      { name: 'M1', email: 'm1@example.com' },
      { name: 'M2', email: 'm2@example.com' },
      { name: 'M3', email: 'm3@example.com' },
      { name: 'M4', email: 'm4@example.com' },
    ],
  })
  results.push({
    name: 'Four members accepted',
    pass: t6.status === 201 && t6.json.success,
    detail: t6,
  })

  // TEST 7 - Five members
  const t7 = await register({
    teamName: unique('FiveMember'),
    collegeName: 'Hinduja',
    members: [
      { name: 'M1', email: 'm1@example.com' },
      { name: 'M2', email: 'm2@example.com' },
      { name: 'M3', email: 'm3@example.com' },
      { name: 'M4', email: 'm4@example.com' },
      { name: 'M5', email: 'm5@example.com' },
    ],
  })
  results.push({
    name: 'Five members rejected',
    pass: t7.status === 400 && t7.json.success === false,
    detail: t7,
  })

  // TEST 8 - Second team (append)
  const t8a = await register({
    teamName: unique('SecondTeamA'),
    collegeName: 'Hinduja',
    members: [{ name: 'First', email: 'first@example.com' }],
  })
  const t8b = await register({
    teamName: unique('SecondTeamB'),
    collegeName: 'Hinduja',
    members: [{ name: 'Second', email: 'second@example.com' }],
  })
  results.push({
    name: 'Second team appends',
    pass: t8a.status === 201 && t8b.status === 201 && t8a.json.registrationId !== t8b.json.registrationId,
    detail: { first: t8a.json.registrationId, second: t8b.json.registrationId },
  })

  console.log('\n=== Registration Test Results ===\n')
  let allPass = true
  for (const r of results) {
    const icon = r.pass ? 'PASS' : 'FAIL'
    if (!r.pass) allPass = false
    console.log(`${icon}: ${r.name}`)
    if (!r.pass) console.log('  ', JSON.stringify(r.detail))
  }
  console.log(allPass ? '\nAll tests passed.' : '\nSome tests failed.')
  process.exit(allPass ? 0 : 1)
}

runTests().catch((err) => {
  console.error('Test runner failed:', err.message)
  process.exit(1)
})
