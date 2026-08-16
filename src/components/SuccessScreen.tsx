import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Button } from './ui/Button'

interface SuccessScreenProps {
  teamName: string
  registrationId: string
  members: { name: string; email: string }[]
}

function FloatingBricks() {
  const reducedMotion = useReducedMotion()

  const bricks = [
    { color: 'bg-lego-red', x: 'left-[5%]', y: 'top-[20%]', delay: 0 },
    { color: 'bg-lego-blue', x: 'right-[8%]', y: 'top-[30%]', delay: 0.2 },
    { color: 'bg-lego-yellow', x: 'left-[10%]', y: 'bottom-[25%]', delay: 0.4 },
    { color: 'bg-lego-green', x: 'right-[5%]', y: 'bottom-[20%]', delay: 0.6 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bricks.map((brick, i) => (
        <motion.div
          key={i}
          className={`absolute h-12 w-16 rounded-lg border-2 border-dark ${brick.color} shadow-brick-sm ${brick.x} ${brick.y}`}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.5, rotate: -15 }}
          animate={
            reducedMotion
              ? { opacity: 0.4 }
              : {
                  opacity: 0.4,
                  rotate: [0, 5, 0],
                  y: [0, -8, 0],
                }
          }
          transition={
            reducedMotion
              ? { delay: brick.delay }
              : {
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: brick.delay,
                }
          }
        >
          <div className="absolute inset-x-1.5 top-1.5 grid grid-cols-2 gap-0.5">
            {[0, 1].map((j) => (
              <div key={j} className="mx-auto aspect-square w-[40%] rounded-full bg-white/25" />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function LegoSuccessAssembly() {
  const reducedMotion = useReducedMotion()

  const bricks = [
    { color: 'bg-lego-red', delay: 0.05 },
    { color: 'bg-lego-blue', delay: 0.15 },
    { color: 'bg-lego-yellow', delay: 0.25 },
    { color: 'bg-lego-green', delay: 0.35 },
  ]

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.4 }}
      className="mb-8 flex items-end justify-center gap-3"
      aria-label="Successful registration"
    >
      {bricks.map((brick, index) => (
        <motion.div
          key={index}
          className={`relative h-12 w-16 rounded-lg border-2 border-dark ${brick.color} shadow-brick-sm`}
          initial={reducedMotion ? false : { opacity: 0, x: 28, y: 18, rotate: -18, scale: 0.8 }}
          animate={reducedMotion ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : { opacity: 1, x: 0, y: 0, rotate: [0, 2, 0], scale: [0.9, 1] }}
          transition={
            reducedMotion
              ? { duration: 0.15 }
              : {
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: brick.delay,
                }
          }
        >
          <div className="absolute inset-x-1.5 top-1.5 grid grid-cols-2 gap-1">
            {[0, 1, 2, 3].map((dot) => (
              <div key={dot} className="h-2.5 w-2.5 rounded-full bg-white/30" />
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div
        className="ml-1 flex h-20 w-20 items-center justify-center rounded-full bg-lego-green shadow-brick-lg"
        initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          reducedMotion
            ? { duration: 0.15 }
            : {
                type: 'spring',
                stiffness: 140,
                damping: 16,
                delay: 0.45,
              }
        }
      >
        <CheckCircle2 className="h-12 w-12 text-white" />
      </motion.div>
    </motion.div>
  )
}

export function SuccessScreen({ teamName, registrationId, members }: SuccessScreenProps) {
  const reducedMotion = useReducedMotion()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-lego-yellow/10 to-lego-green/10 py-16 md:py-24">
      <FloatingBricks />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <LegoSuccessAssembly />

        {/* Heading */}
        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.7, duration: 0.45 }}
          className="text-center font-display text-[clamp(2rem,6vw,3.5rem)] font-bold leading-tight tracking-tight text-dark"
        >
          YOUR TEAM IS REGISTERED SUCCESSFULLY!
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.82, duration: 0.4 }}
          className="mx-auto mt-4 text-center text-lg text-dark-muted md:text-xl"
        >
          Your build journey starts now.
        </motion.p>

        {/* Registration Details Card */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: reducedMotion ? 0 : 0.9, duration: 0.45 }}
          className="mt-12 rounded-xl border-2 border-dark bg-white p-8 shadow-brick-lg"
        >
          {/* Team Name */}
          <div className="mb-8 border-b-2 border-lego-yellow pb-6">
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.95, duration: 0.35 }}
              className="font-display text-xs font-bold uppercase tracking-[0.2em] text-lego-red"
            >
              Team
            </motion.p>
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 1.02, duration: 0.35 }}
              className="mt-2 font-display text-2xl font-bold text-dark md:text-3xl"
            >
              {teamName}
            </motion.p>
          </div>

          {/* Registration ID */}
          <div className="mb-8">
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 1.08, duration: 0.35 }}
              className="font-display text-xs font-bold uppercase tracking-[0.2em] text-lego-red"
            >
              Registration ID
            </motion.p>
            <motion.p
              initial={reducedMotion ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: reducedMotion ? 0 : 1.16, duration: 0.35 }}
              className="mt-2 font-display text-3xl font-bold text-dark md:text-4xl"
            >
              {registrationId}
            </motion.p>
          </div>

          {/* Team Members */}
          <div>
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 1.24, duration: 0.35 }}
              className="mb-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-lego-red"
            >
              Registered Members ({members.length})
            </motion.p>
            <div className="space-y-3">
              {members.map((member, index) => (
                <motion.div
                  key={index}
                  initial={reducedMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 1.3 + index * 0.08, duration: 0.3 }}
                  className="flex items-start gap-3 rounded-lg bg-off-white p-3"
                >
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-lego-blue text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-dark">{member.name}</p>
                    <p className="text-xs text-dark-muted">{member.email}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 1.4, duration: 0.35 }}
          className="mt-12 rounded-lg border-2 border-lego-blue bg-lego-blue/5 p-6"
        >
          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-lego-blue">What's Next?</h3>
          <ul className="space-y-2 text-sm text-dark-muted">
            <li>✓ Check your email for confirmation and event details</li>
            <li>✓ Review the timeline and rules on the home page</li>
            <li>✓ Prepare your team and start ideating</li>
            <li>✓ Join the Discord community for updates and support</li>
          </ul>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 1.52, duration: 0.35 }}
          className="mt-8"
        >
          <Button
            href="/"
            variant="primary"
            className="w-full !text-base md:!text-lg !px-8 !py-4"
            onClick={() => navigate('/')}
          >
            BACK TO HOME →
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
