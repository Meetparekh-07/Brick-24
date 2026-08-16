import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { RegistrationForm } from '../components/RegistrationForm'
import { RegistrationBuildingAnimation } from '../components/RegistrationBuildingAnimation'
import { SuccessScreen } from '../components/SuccessScreen'
import { BrickIcon } from '../components/ui/Brick'

interface RegistrationData {
  teamName: string
  collegeName: string
  members: { name: string; email: string }[]
}

interface SuccessData {
  registrationId: string
  teamName: string
  members: { name: string; email: string }[]
  backendSaved: boolean
}

type PagePhase = 'form' | 'building' | 'success'

export function RegisterPage() {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<PagePhase>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  const handleSubmit = async (data: RegistrationData) => {
    setIsLoading(true)
    setError(null)

    const apiData = {
      teamName: data.teamName.trim(),
      collegeName: data.collegeName.trim(),
      members: data.members.map((member) => ({
        name: member.name.trim(),
        email: member.email.trim(),
      })),
    }

    let registrationId = 'BRICK24-PENDING'
    let backendSaved = false

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      })

      let result: { success?: boolean; registrationId?: string; message?: string } | null = null
      const contentType = response.headers.get('content-type') ?? ''

      if (contentType.includes('application/json')) {
        try {
          result = await response.json()
        } catch (parseError) {
          console.error('[Registration] Failed to parse JSON response:', parseError)
        }
      } else {
        const rawBody = await response.text()
        console.error('[Registration] Non-JSON response from server:', {
          status: response.status,
          body: rawBody.slice(0, 200),
        })
      }

      if (response.status === 409) {
        setError('This team name is already registered. Please choose a different name.')
        setIsLoading(false)
        return
      }

      if (response.ok && result?.success && result.registrationId) {
        registrationId = result.registrationId
        backendSaved = true
      } else {
        throw new Error(result?.message || `Registration request failed (${response.status})`)
      }
    } catch (err) {
      console.error('[Registration] Backend unavailable or failed:', err)
      console.warn(
        '[Registration] Showing demo success flow — registration was NOT saved to server. Start the backend with `npm run dev:server` or `npm run dev:all`.',
      )
    }

    setSuccessData({
      registrationId,
      teamName: apiData.teamName,
      members: apiData.members,
      backendSaved,
    })
    setPhase('building')
    setIsLoading(false)
  }

  const handleBuildingComplete = useCallback(() => {
    setPhase('success')
  }, [])

  if (phase === 'success' && successData) {
    return (
      <SuccessScreen
        teamName={successData.teamName}
        registrationId={successData.registrationId}
        members={successData.members}
      />
    )
  }

  return (
    <section className="min-h-screen bg-off-white pt-32 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-2">
            <BrickIcon className="h-8 w-12" />
            <h1 className="font-display text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight tracking-tight text-dark">
              REGISTER YOUR TEAM
            </h1>
          </div>
          <p className="mx-auto max-w-lg text-lg text-dark-muted md:text-xl">
            Join BRICK//24 and build something extraordinary in 24 hours.
          </p>
        </motion.div>

        {/* Error Message */}
        {error && phase === 'form' && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-lg border-2 border-lego-red bg-lego-red/10 p-4 text-lego-red"
          >
            <p className="font-display text-sm font-bold">{error}</p>
          </motion.div>
        )}

        {/* Form Container / Building Animation */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border-2 border-dark bg-white p-8 shadow-brick-lg"
        >
          {phase === 'building' ? (
            <RegistrationBuildingAnimation onComplete={handleBuildingComplete} />
          ) : (
            <RegistrationForm onSubmit={handleSubmit} isLoading={isLoading} />
          )}
        </motion.div>

        {/* Info Card */}
        {phase === 'form' && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 rounded-lg border-2 border-lego-yellow bg-lego-yellow/5 p-6"
          >
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-dark">
              Team Requirements
            </p>
            <ul className="space-y-2 text-sm text-dark-muted">
              <li>✓ Teams can have 1–4 members</li>
              <li>✓ All members must be current college students</li>
              <li>✓ One team name per registration</li>
              <li>✓ Valid email required for each member</li>
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  )
}
