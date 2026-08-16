import { motion } from 'framer-motion'
import type { MouseEventHandler } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type ButtonVariant = 'primary' | 'secondary' | 'outline'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  href?: string
  children: React.ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-lego-red text-white hover:bg-[#c9000a]',
  secondary: 'bg-dark text-off-white hover:bg-dark-muted',
  outline: 'bg-off-white text-dark border-2 border-dark hover:bg-lego-yellow',
}

/**
 * Chunky LEGO-style button with press feedback.
 * Renders as anchor when href is provided.
 */
export function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const reducedMotion = useReducedMotion()
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg border-2 border-dark px-6 py-3 font-display text-sm font-bold uppercase tracking-wide shadow-brick transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lego-blue'

  const motionProps = reducedMotion
    ? {}
    : {
        whileHover: { y: -2, boxShadow: '6px 6px 0 0 #111111' },
        whileTap: { y: 2, boxShadow: '2px 2px 0 0 #111111' },
      }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        onClick={props.onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" className={classes} {...motionProps} {...(props as object)}>
      {children}
    </motion.button>
  )
}
