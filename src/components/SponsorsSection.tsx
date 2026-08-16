import { motion } from 'framer-motion'
import { SPONSORS } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function SponsorsSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="sponsors" className="border-t-2 border-dark bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold uppercase tracking-tight text-dark-muted">
          Built With Support From
        </h2>

        {/* Placeholder sponsor wall — replace SPONSORS array with real logos */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {SPONSORS.map((name, index) => (
            <motion.div
              key={name}
              initial={reducedMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex h-20 items-center justify-center rounded-lg border border-dark/10 bg-off-white px-4 transition-colors hover:border-dark/30 md:h-24"
            >
              <span className="font-display text-sm font-bold tracking-wider text-dark/40 md:text-base">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
