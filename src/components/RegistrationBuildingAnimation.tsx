import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface RegistrationBuildingAnimationProps {
  onComplete: () => void
}

const BRICKS = [
  { color: 'bg-lego-red', startX: -48, startY: 32, startRotate: -24 },
  { color: 'bg-lego-blue', startX: 52, startY: 28, startRotate: 18 },
  { color: 'bg-lego-yellow', startX: -44, startY: -36, startRotate: -12 },
  { color: 'bg-lego-green', startX: 48, startY: -40, startRotate: 22 },
]

function BrickStuds() {
  return (
    <div className="absolute inset-x-1.5 top-1.5 grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((dot) => (
        <div key={dot} className="mx-auto h-2 w-2 rounded-full bg-white/30" />
      ))}
    </div>
  )
}

export function RegistrationBuildingAnimation({ onComplete }: RegistrationBuildingAnimationProps) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const delay = reducedMotion ? 400 : 1600
    const timer = window.setTimeout(onComplete, delay)
    return () => window.clearTimeout(timer)
  }, [onComplete, reducedMotion])

  return (
    <div
      className="flex min-h-[320px] flex-col items-center justify-center py-12"
      role="status"
      aria-live="polite"
      aria-label="Registration in progress"
    >
      <div className="relative mb-8 flex h-28 w-44 items-end justify-center">
        {BRICKS.map((brick, index) => (
          <motion.div
            key={index}
            className={`absolute h-10 w-14 rounded-md border-2 border-dark ${brick.color} shadow-brick-sm`}
            style={{
              left: `${index % 2 === 0 ? 12 : 58}px`,
              bottom: `${index < 2 ? 0 : 44}px`,
            }}
            initial={
              reducedMotion
                ? { opacity: 0, scale: 0.9 }
                : {
                    opacity: 0,
                    x: brick.startX,
                    y: brick.startY,
                    rotate: brick.startRotate,
                    scale: 0.6,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
            }}
            transition={
              reducedMotion
                ? { duration: 0.2, delay: index * 0.05 }
                : {
                    type: 'spring',
                    stiffness: 260,
                    damping: 22,
                    delay: index * 0.12,
                  }
            }
          >
            <BrickStuds />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dark bg-lego-green shadow-brick-lg"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          reducedMotion
            ? { duration: 0.25, delay: 0.15 }
            : { type: 'spring', stiffness: 200, damping: 16, delay: 0.55 }
        }
      >
        <motion.div
          initial={reducedMotion ? false : { scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={
            reducedMotion
              ? { duration: 0.2, delay: 0.2 }
              : { type: 'spring', stiffness: 260, damping: 14, delay: 0.7 }
          }
        >
          <Check className="h-10 w-10 text-white" strokeWidth={3} aria-hidden="true" />
        </motion.div>
      </motion.div>

      <motion.p
        className="mt-8 text-center font-display text-lg font-bold uppercase tracking-wide text-dark sm:text-xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reducedMotion
            ? { duration: 0.2, delay: 0.25 }
            : { duration: 0.4, delay: 0.95 }
        }
      >
        YOUR TEAM IS REGISTERED SUCCESSFULLY!
      </motion.p>
    </div>
  )
}
