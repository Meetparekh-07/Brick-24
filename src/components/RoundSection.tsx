import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ResultCard } from './ResultCard'
import type { Round } from '../data/results'

interface RoundSectionProps {
  round: Round
  roundIndex: number
  totalRounds: number
}

export function RoundSection({ round, roundIndex, totalRounds }: RoundSectionProps) {
  const reducedMotion = useReducedMotion()

  const roundColors = {
    0: 'border-lego-red',
    1: 'border-lego-yellow',
    2: 'border-lego-blue',
  }

  const roundBgColors = {
    0: 'from-lego-red/5 to-transparent',
    1: 'from-lego-yellow/5 to-transparent',
    2: 'from-lego-blue/5 to-transparent',
  }

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: roundIndex * 0.2 }}
      className={`rounded-xl border-2 ${roundColors[roundIndex as keyof typeof roundColors]} bg-gradient-to-br ${roundBgColors[roundIndex as keyof typeof roundBgColors]} p-8`}
    >
      {/* Round Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dark shadow-brick ${
              round.isActive
                ? roundColors[roundIndex as keyof typeof roundColors] + ' bg-opacity-20'
                : 'bg-off-white'
            }`}
          >
            <span className="font-display text-xl font-bold text-dark">{round.number}</span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-dark">{round.title}</h2>
            <p className="mt-1 text-sm text-dark-muted">{round.description}</p>
            {round.isActive && (
              <motion.span
                initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-2 inline-block rounded-full bg-lego-red px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-white"
              >
                Currently Active
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {round.entries.length > 0 ? (
          round.entries.map((entry, index) => (
            <ResultCard
              key={`${round.number}-${entry.team}`}
              team={entry.team}
              college={entry.college}
              score={entry.score}
              status={entry.status}
              index={index}
            />
          ))
        ) : (
          <motion.p
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8 text-center text-dark-muted"
          >
            Results will be updated soon...
          </motion.p>
        )}
      </div>

      {/* Connector Line */}
      {roundIndex < totalRounds - 1 && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 h-12 w-1 origin-top border-l-2 border-dashed border-dark"
        />
      )}
    </motion.div>
  )
}
