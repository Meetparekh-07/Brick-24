import { motion } from 'framer-motion'
import { TIMELINE_EVENTS } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Timeline() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="timeline" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
          BUILD PLAN
        </h2>
        <p className="mt-4 text-lg text-dark-muted">
          Your 24-hour construction schedule — from check-in to champions.
        </p>

        <ol className="relative mt-14">
          {/* Vertical LEGO construction line */}
          <div
            className="absolute bottom-0 left-[27px] top-0 w-1 border-l-2 border-dashed border-dark/30 md:left-[31px]"
            aria-hidden="true"
          />

          {TIMELINE_EVENTS.map((event, index) => (
            <motion.li
              key={event.title}
              initial={reducedMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              {/* Brick node on timeline */}
              <div className="relative z-10 shrink-0" aria-hidden="true">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-lg border-2 border-dark shadow-brick-sm md:h-16 md:w-16 ${
                    event.highlight ? 'bg-lego-red text-white' : 'bg-white'
                  }`}
                >
                  <span className="font-display text-[10px] font-bold leading-tight md:text-xs">
                    {event.time.split(':')[0]}
                    <br />
                    :{event.time.split(':')[1]}
                  </span>
                </div>
              </div>

              <div
                className={`flex-1 rounded-lg border-2 border-dark px-5 py-4 shadow-brick-sm transition-transform hover:-translate-y-0.5 ${
                  event.highlight
                    ? 'bg-lego-yellow'
                    : 'bg-white'
                }`}
              >
                <time
                  dateTime={`2026-11-14T${event.time}`}
                  className="font-display text-xs font-bold uppercase tracking-widest text-dark/50"
                >
                  {event.time}
                </time>
                <h3
                  className={`mt-1 font-display text-lg font-bold tracking-tight md:text-xl ${
                    event.highlight ? 'text-dark' : ''
                  }`}
                >
                  {event.title}
                </h3>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
