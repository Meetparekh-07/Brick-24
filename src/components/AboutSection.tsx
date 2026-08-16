import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { BUILD_STEPS } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

function BuildStep({
  step,
  index,
}: {
  step: (typeof BUILD_STEPS)[number]
  index: number
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="group relative"
    >
      <div
        className={`relative rounded-lg border-2 border-dark ${step.color} p-6 shadow-brick transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-1deg] md:p-8`}
      >
        {/* Stud accent */}
        <div className="absolute -top-3 left-6 h-6 w-12 rounded-full border-2 border-dark bg-white/30" aria-hidden="true" />

        <span className="font-display text-sm font-bold text-dark/60">{step.number}</span>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
          {step.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-dark/80">{step.description}</p>
      </div>

      {index < BUILD_STEPS.length - 1 && (
        <div className="hidden items-center justify-center py-4 lg:flex" aria-hidden="true">
          <ArrowRight className="h-6 w-6 text-dark/30" />
        </div>
      )}
    </motion.article>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
            EVERYTHING STARTS
            <br />
            WITH A BRICK.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-dark-muted md:text-xl">
            BRICK//24 is a 24-hour college hackathon where builders, designers, and dreamers
            come together to create something extraordinary. Every idea starts as a single brick —
            raw, unpolished, full of potential. Over 24 intense hours, you'll stack ideas, break
            assumptions, and rebuild until something remarkable emerges.
          </p>
        </div>

        {/* Progression: BRICK → IDEA → PROTOTYPE → IMPACT */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {BUILD_STEPS.map((step, index) => (
            <BuildStep key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
