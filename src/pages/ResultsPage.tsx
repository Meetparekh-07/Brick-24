import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { RESULTS } from '../data/results'
import { RoundSection } from '../components/RoundSection'
import { BrickIcon } from '../components/ui/Brick'

export function ResultsPage() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="min-h-screen bg-off-white pt-32 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-2">
            <BrickIcon className="h-8 w-12" />
          </div>
          <h1 className="font-display text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight tracking-tight text-dark">
            THE BUILDS THAT MADE IT
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-dark-muted md:text-xl">
            Track the results as teams move through each round.
          </p>
        </motion.div>

        {/* Results Timeline */}
        <div className="space-y-12">
          {RESULTS.map((round, index) => (
            <RoundSection
              key={round.number}
              round={round}
              roundIndex={index}
              totalRounds={RESULTS.length}
            />
          ))}
        </div>

        {/* Info Card */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 rounded-lg border-2 border-lego-blue bg-lego-blue/5 p-6"
        >
          <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wide text-lego-blue">
            Results Status
          </h3>
          <p className="text-sm text-dark-muted leading-relaxed">
            Results are updated as each round progresses. The highlighted round shows the current stage of the competition.
            Keep refreshing to see live updates as teams complete each round.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
