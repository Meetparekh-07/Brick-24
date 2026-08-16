import { motion } from 'framer-motion'
import { PRIZES } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

/** Large LEGO trophy built from stacked blocks */
function TrophyVisual() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="relative mx-auto h-64 w-48" aria-hidden="true">
      {/* Trophy cup */}
      <motion.div
        className="absolute left-1/2 top-0 h-20 w-32 -translate-x-1/2 rounded-t-lg border-2 border-dark bg-lego-yellow shadow-brick"
        animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-x-3 top-2 grid grid-cols-4 gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="mx-auto aspect-square w-[50%] rounded-full bg-white/30" />
          ))}
        </div>
      </motion.div>

      {/* Handles */}
      <div className="absolute left-2 top-6 h-12 w-6 rounded-l-full border-2 border-r-0 border-dark bg-lego-yellow" />
      <div className="absolute right-2 top-6 h-12 w-6 rounded-r-full border-2 border-l-0 border-dark bg-lego-yellow" />

      {/* Stem */}
      <div className="absolute left-1/2 top-20 h-10 w-8 -translate-x-1/2 border-2 border-dark bg-lego-red shadow-brick-sm" />

      {/* Base layers */}
      {[0, 1, 2].map((layer) => (
        <motion.div
          key={layer}
          className={`absolute left-1/2 border-2 border-dark bg-lego-blue shadow-brick-sm ${
            layer === 0 ? 'top-28 h-6 w-24 -translate-x-1/2' : layer === 1 ? 'top-[8.75rem] h-6 w-32 -translate-x-1/2' : 'top-[10.5rem] h-8 w-40 -translate-x-1/2 rounded-b-lg'
          }`}
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + layer * 0.15 }}
        />
      ))}
    </div>
  )
}

export function PrizeSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-y-2 border-dark bg-dark py-20 text-off-white md:py-28">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.h2
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight"
            >
              BUILD BIG.
              <br />
              WIN BIG.
            </motion.h2>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10"
            >
              <p className="font-display text-[clamp(3rem,8vw,5rem)] font-bold leading-none text-lego-yellow">
                ₹1,00,000
              </p>
              <p className="mt-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-off-white/60">
                Prize Pool
              </p>
            </motion.div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {PRIZES.map((prize, index) => (
                <motion.div
                  key={prize.place}
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`rounded-lg border-2 border-off-white/20 ${prize.color} p-5 text-dark shadow-brick`}
                >
                  <p className="font-display text-xs font-bold uppercase tracking-wider opacity-70">
                    {prize.place}
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold">{prize.amount}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <TrophyVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
