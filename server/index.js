import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Path to registrations file
const registrationsFile = path.join(__dirname, 'registrations.json')

async function ensureRegistrationsFile() {
  if (!fs.existsSync(registrationsFile)) {
    await fs.promises.writeFile(registrationsFile, '[]', 'utf-8')
  }
}

async function readRegistrations() {
  await ensureRegistrationsFile()

  const raw = await fs.promises.readFile(registrationsFile, 'utf-8')

  if (!raw.trim()) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    const message = `Invalid JSON in registrations file: ${registrationsFile}`
    console.error(message, error)
    throw new Error(message)
  }
}

async function writeRegistrations(data) {
  await ensureRegistrationsFile()
  await fs.promises.writeFile(registrationsFile, JSON.stringify(data, null, 2), 'utf-8')
}

function generateRegistrationId(registrations) {
  const lastId = registrations.length > 0 ? registrations[registrations.length - 1].id : null

  if (!lastId) {
    return 'BRICK24-0001'
  }

  const numericPart = Number.parseInt(lastId.split('-')[1], 10)
  if (Number.isNaN(numericPart)) {
    return 'BRICK24-0001'
  }

  return `BRICK24-${String(numericPart + 1).padStart(4, '0')}`
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateRegistration(data) {
  const errors = {}

  if (!data.teamName || typeof data.teamName !== 'string' || !data.teamName.trim()) {
    errors.teamName = 'Team name is required'
  }

  if (!data.collegeName || typeof data.collegeName !== 'string' || !data.collegeName.trim()) {
    errors.collegeName = 'College name is required'
  }

  if (!Array.isArray(data.members) || data.members.length === 0 || data.members.length > 4) {
    errors.members = 'Team must have 1-4 members'
  } else {
    data.members.forEach((member, index) => {
      if (!member || !member.name || typeof member.name !== 'string' || !member.name.trim()) {
        errors[`member_${index}_name`] = 'Member name is required'
      }

      if (!member || !member.email || typeof member.email !== 'string' || !validateEmail(member.email)) {
        errors[`member_${index}_email`] = 'Valid email is required for each member'
      }
    })
  }

  return Object.keys(errors).length > 0 ? errors : null
}

app.post('/api/register', async (req, res) => {
  try {
    const { teamName, collegeName, members } = req.body

    const validationErrors = validateRegistration(req.body)
    if (validationErrors) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      })
    }

    const registrations = await readRegistrations()

    const isDuplicate = registrations.some(
      (reg) => reg.teamName && reg.teamName.toLowerCase() === teamName.toLowerCase(),
    )

    if (isDuplicate) {
      return res.status(409).json({
        success: false,
        message: 'Team name already registered',
      })
    }

    const registrationId = generateRegistrationId(registrations)

    const registration = {
      id: registrationId,
      teamName,
      collegeName,
      members,
      registeredAt: new Date().toISOString(),
    }

    const updatedRegistrations = [...registrations, registration]
    await writeRegistrations(updatedRegistrations)

    return res.status(201).json({
      success: true,
      registrationId,
    })
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({
      success: false,
      message: 'Unable to save registration',
    })
  }
})

app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await readRegistrations()
    return res.json({
      success: true,
      count: registrations.length,
      registrations,
    })
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
  console.log(`Registrations stored in: ${registrationsFile}`)
})
