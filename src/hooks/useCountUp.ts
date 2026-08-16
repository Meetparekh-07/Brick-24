import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

/**
 * Animates a number from 0 to `end` when the element enters the viewport.
 * Disabled when prefers-reduced-motion is active.
 */
export function useCountUp({
  end,
  duration = 1800,
  prefix = '',
  suffix = '',
  decimals = 0,
}: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(`${prefix}0${suffix}`)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true

        if (reducedMotion) {
          setDisplay(`${prefix}${end.toFixed(decimals)}${suffix}`)
          return
        }

        const startTime = performance.now()

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const value = eased * end
          setDisplay(`${prefix}${value.toFixed(decimals)}${suffix}`)
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration, prefix, suffix, decimals])

  return { ref, display }
}
