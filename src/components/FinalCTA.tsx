import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Button } from './ui/Button'

/** Animated bricks assembling around the final CTA */
function AssemblingBricks() {
  const reducedMotion = useReducedMotion()

  const positions = [
    { color: 'bg-lego-red', className: 'left-[5%] top-[10%] -rotate-12', delay: 0 },
    { color: 'bg-lego-blue', className: 'right-[8%] top-[15%] rotate-6', delay: 0.2 },
    { color: 'bg-lego-yellow', className: 'left-[10%] bottom-[15%] rotate-3', delay: 0.4 },
    { color: 'bg-lego-green', className: 'right-[5%] bottom-[10%] -rotate-6', delay: 0.6 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {positions.map((brick, i) => (
        <motion.div
          key={i}
          className={`absolute h-12 w-16 rounded-lg border-2 border-dark ${brick.color} shadow-brick-sm ${brick.className}`}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.5, y: 40 }}
          whileInView={{ opacity: 0.8, scale: 1, y: 0 }}
          viewport={{ once: true }}
          animate={
            reducedMotion
              ? undefined
              : { y: [0, -6, 0] }
          }
          transition={
            reducedMotion
              ? { delay: brick.delay, duration: 0.6, type: 'spring' }
              : {
                  y: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: brick.delay },
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

export function FinalCTA() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="register"
      className="relative overflow-hidden border-t-2 border-dark bg-lego-red py-24 text-white md:py-32"
    >
      <AssemblingBricks />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-tight tracking-tight"
        >
          READY TO BUILD?
        </motion.h2>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-6 max-w-lg text-lg text-white/80 md:text-xl"
        >
          Your next big idea might be one brick away.
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <Button
            href="/register"
            variant="secondary"
            className="!bg-white !text-dark hover:!bg-off-white text-base md:text-lg px-8 py-4"
          >
            Register for BRICK//24 <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
