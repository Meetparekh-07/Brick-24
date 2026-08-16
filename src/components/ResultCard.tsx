import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { StatusBadge } from './StatusBadge'

interface ResultCardProps {
  team: string
  college: string
  score: number
  status: 'QUALIFIED' | 'ELIMINATED' | 'WINNER' | 'FINALIST'
  index: number
}

export function ResultCard({ team, college, score, status, index }: ResultCardProps) {
  const reducedMotion = useReducedMotion()

  const statusColors = {
    QUALIFIED: 'border-lego-green',
    ELIMINATED: 'border-lego-red',
    WINNER: 'border-lego-yellow',
    FINALIST: 'border-lego-blue',
  }

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-lg border-2 ${statusColors[status]} bg-white p-4 shadow-brick hover:shadow-brick-lg transition-shadow`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Team Info */}
        <div className="flex-1">
          <h3 className="font-display text-base font-bold text-dark">{team}</h3>
          <p className="text-sm text-dark-muted">{college}</p>
        </div>

        {/* Score and Status */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-display text-2xl font-bold text-dark">{score}</p>
            <p className="text-xs uppercase tracking-wide text-dark-muted">/ 100</p>
          </div>
          <StatusBadge status={status} />
        </div>
      </div>
    </motion.div>
  )
}
