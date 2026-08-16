import { motion } from 'framer-motion'
import { Calendar, Clock, Trophy } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Button } from './ui/Button'

/** Floating LEGO tower — pure CSS/SVG, no stock images */
function HeroBrickTower() {
  const reducedMotion = useReducedMotion()

  const bricks = [
    { color: 'bg-lego-red', w: 'w-28', h: 'h-16', x: 'left-1/2 -translate-x-1/2', y: 'bottom-0', rotate: 0, delay: 0 },
    { color: 'bg-lego-blue', w: 'w-24', h: 'h-14', x: 'left-[30%]', y: 'bottom-20', rotate: -3, delay: 0.2 },
    { color: 'bg-lego-yellow', w: 'w-32', h: 'h-16', x: 'right-[20%]', y: 'bottom-16', rotate: 2, delay: 0.4 },
    { color: 'bg-lego-green', w: 'w-20', h: 'h-12', x: 'left-[15%]', y: 'bottom-40', rotate: -5, delay: 0.6 },
    { color: 'bg-lego-red', w: 'w-26', h: 'h-14', x: 'right-[10%]', y: 'bottom-44', rotate: 4, delay: 0.8 },
    { color: 'bg-lego-blue', w: 'w-36', h: 'h-18', x: 'left-1/2 -translate-x-1/2', y: 'bottom-32', rotate: -1, delay: 1 },
  ]

  return (
    <div className="relative mx-auto h-[340px] w-full max-w-md sm:h-[400px]" aria-hidden="true">
      {bricks.map((brick, i) => (
        <motion.div
          key={i}
          className={`absolute ${brick.x} ${brick.y} ${brick.w} ${brick.h} rounded-lg border-2 border-dark ${brick.color} shadow-brick-lg`}
          style={{ rotate: brick.rotate }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                  rotate: [brick.rotate, brick.rotate + 1.5, brick.rotate],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: brick.delay,
                }
          }
          whileHover={reducedMotion ? undefined : { scale: 1.05, y: -12 }}
        >
          {/* Studs */}
          <div className="absolute inset-x-2 top-2 grid grid-cols-4 gap-1">
            {Array.from({ length: 4 }).map((_, j) => (
              <div
                key={j}
                className="mx-auto aspect-square w-[30%] rounded-full border border-dark/20 bg-white/25"
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Dashed connector lines — blueprint feel */}
      <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
        <line x1="50%" y1="10%" x2="30%" y2="60%" stroke="#0057B8" strokeWidth="2" strokeDasharray="6 4" />
        <line x1="50%" y1="10%" x2="75%" y2="55%" stroke="#0057B8" strokeWidth="2" strokeDasharray="6 4" />
      </svg>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="hero"
      className="blueprint-grid relative min-h-screen overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-lego-red"
          >
            Build It. Break It. Rebuild It.
          </motion.p>

          <motion.h1
            className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight"
            initial="hidden"
            animate="visible"
          >
            {['BUILD', 'SOMETHING', 'UNEXPECTED.'].map((line, i) => (
              <motion.span
                key={line}
                custom={i}
                variants={fadeUp}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-dark-muted md:text-xl"
          >
            24 hours. One challenge. Unlimited ways to build.
          </motion.p>

          {/* Meta chips */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {[
              { icon: Calendar, text: '14–15 NOV 2026' },
              { icon: Clock, text: '24 HOURS' },
              { icon: Trophy, text: '₹1,00,000 PRIZE POOL' },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-dark bg-white px-4 py-2 font-display text-xs font-bold uppercase tracking-wide shadow-brick-sm"
              >
                <Icon className="h-4 w-4 text-lego-red" aria-hidden="true" />
                {text}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button href="#about" variant="outline">
              Explore the Hackathon
            </Button>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          className="order-1 lg:order-2"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <HeroBrickTower />
        </motion.div>
      </div>
    </section>
  )
}
