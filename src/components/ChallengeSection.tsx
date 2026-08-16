import { motion } from 'framer-motion'
import { CHALLENGES } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

function ChallengeCard({
  challenge,
  index,
}: {
  challenge: (typeof CHALLENGES)[number]
  index: number
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={reducedMotion ? undefined : { y: -6, rotate: 0 }}
      className={`group relative cursor-default rounded-lg border-2 border-dark ${challenge.color} p-6 shadow-brick transition-shadow hover:shadow-brick-lg ${challenge.rotate}`}
    >
      {/* Stud row */}
      <div className="mb-4 flex gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full border border-dark/20 bg-white/30"
          />
        ))}
      </div>

      <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
        {challenge.title}
      </h3>
      <p className="mt-2 text-base text-dark/80">{challenge.description}</p>
    </motion.article>
  )
}

export function ChallengeSection() {
  return (
    <section className="blueprint-grid py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
            WHAT WILL YOU BUILD?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-dark-muted">
            Choose your challenge or forge your own path. Build innovative solutions across
            technology, sustainability, AI, fintech, healthcare, education, mobility, and beyond.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((challenge, index) => (
            <ChallengeCard key={challenge.title} challenge={challenge} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
