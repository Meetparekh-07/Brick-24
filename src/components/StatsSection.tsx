import { motion } from 'framer-motion'
import { STATS } from '../data/content'
import { useCountUp } from '../hooks/useCountUp'
import { useReducedMotion } from '../hooks/useReducedMotion'

function StatCard({
  stat,
  index,
}: {
  stat: (typeof STATS)[number]
  index: number
}) {
  const { ref, display } = useCountUp({
    end: stat.value,
    prefix: stat.prefix,
    suffix: stat.suffix,
    decimals: stat.value === 1 ? 0 : 0,
  })
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative flex flex-col items-center rounded-lg border-2 border-dark bg-white px-6 py-10 shadow-brick text-center"
    >
      {/* LEGO stud accent corner */}
      <div
        className="absolute -right-2 -top-2 h-8 w-8 rounded-full border-2 border-dark bg-lego-yellow"
        aria-hidden="true"
      />

      <span
        ref={ref}
        className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tight"
      >
        {display}
      </span>
      <span className="mt-3 font-display text-sm font-bold uppercase tracking-[0.15em] text-dark-muted">
        {stat.label}
      </span>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section className="border-y-2 border-dark bg-lego-yellow/20 py-16 md:py-20" aria-label="Hackathon statistics">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 md:gap-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  )
}
