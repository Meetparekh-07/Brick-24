import { motion, type HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type BrickColor = 'red' | 'yellow' | 'blue' | 'green' | 'dark'

const colorMap: Record<BrickColor, string> = {
  red: 'bg-lego-red',
  yellow: 'bg-lego-yellow',
  blue: 'bg-lego-blue',
  green: 'bg-lego-green',
  dark: 'bg-dark',
}

interface BrickProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  color?: BrickColor
  /** Show circular studs on top surface */
  studs?: boolean
  /** Stud count: 2x2 default */
  studGrid?: '2x2' | '2x4' | '1x2'
  children?: React.ReactNode
  className?: string
}

/**
 * Core LEGO brick primitive — CSS-only with stud pattern.
 * Used throughout the site for visual consistency.
 */
export function Brick({
  color = 'red',
  studs = true,
  studGrid = '2x2',
  children,
  className = '',
  ...motionProps
}: BrickProps) {
  const reducedMotion = useReducedMotion()

  const studCols = studGrid === '2x4' ? 4 : studGrid === '1x2' ? 2 : 2
  const studCount = studGrid === '2x4' ? 8 : studGrid === '1x2' ? 2 : 4

  return (
    <motion.div
      className={`relative rounded-lg border-2 border-dark ${colorMap[color]} shadow-brick ${className}`}
      whileHover={reducedMotion ? undefined : { y: -4, rotate: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...motionProps}
    >
      {studs && (
        <div
          className="absolute inset-x-2 top-2 grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${studCols}, 1fr)` }}
          aria-hidden="true"
        >
          {Array.from({ length: studCount }).map((_, i) => (
            <div
              key={i}
              className="mx-auto aspect-square w-[35%] rounded-full border border-dark/20 bg-white/25 shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)]"
            />
          ))}
        </div>
      )}
      {children}
    </motion.div>
  )
}

/** Small icon-sized brick for navbar logo */
export function BrickIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="7" width="30" height="16" rx="3" fill="#E3000B" stroke="#111" strokeWidth="2" />
      <circle cx="9" cy="11" r="2.5" fill="white" fillOpacity="0.3" stroke="#111" strokeWidth="0.5" />
      <circle cx="23" cy="11" r="2.5" fill="white" fillOpacity="0.3" stroke="#111" strokeWidth="0.5" />
      <circle cx="9" cy="17" r="2.5" fill="white" fillOpacity="0.3" stroke="#111" strokeWidth="0.5" />
      <circle cx="23" cy="17" r="2.5" fill="white" fillOpacity="0.3" stroke="#111" strokeWidth="0.5" />
    </svg>
  )
}
