import { motion } from 'framer-motion'
import { MENTORS } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

function MentorCard({
  mentor,
  index,
}: {
  mentor: (typeof MENTORS)[number]
  index: number
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      className="rounded-lg border-2 border-dark bg-white p-6 shadow-brick transition-shadow hover:shadow-brick-lg"
    >
      {/* Avatar with LEGO-inspired frame */}
      <div
        className={`mx-auto flex h-20 w-20 items-center justify-center rounded-xl border-4 ${mentor.frame} bg-off-white font-display text-xl font-bold shadow-brick-sm`}
        aria-hidden="true"
      >
        {mentor.initial}
      </div>

      <h3 className="mt-5 text-center font-display text-lg font-bold">{mentor.name}</h3>
      <p className="mt-1 text-center text-sm text-dark-muted">{mentor.role}</p>
      <p className="mt-0.5 text-center font-display text-xs font-bold uppercase tracking-wider text-lego-red">
        {mentor.company}
      </p>
    </motion.article>
  )
}

export function MentorsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
          THE PEOPLE WHO
          <br />
          WILL TEST YOUR BUILD.
        </h2>
        <p className="mt-4 max-w-lg text-lg text-dark-muted">
          Industry experts and innovators ready to challenge, guide, and celebrate your creation.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MENTORS.map((mentor, index) => (
            <MentorCard key={mentor.name} mentor={mentor} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
