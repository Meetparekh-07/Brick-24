import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { RULES } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function RulesSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="rules" className="blueprint-grid py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
          BEFORE YOU BUILD
        </h2>
        <p className="mt-4 text-lg text-dark-muted">
          Know the rules. Play fair. Build something incredible.
        </p>

        <ul className="mt-10 space-y-3">
          {RULES.map((rule, index) => (
            <motion.li
              key={rule}
              initial={reducedMotion ? false : { opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="flex items-start gap-4 rounded-lg border-2 border-dark bg-white px-5 py-4 shadow-brick-sm"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-dark bg-lego-green">
                <Check className="h-3.5 w-3.5 text-white" aria-hidden="true" />
              </span>
              <span className="text-base leading-relaxed">{rule}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
