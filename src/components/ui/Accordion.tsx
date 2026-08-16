import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  id: string
}

/** Single accordion panel with smooth height animation */
export function AccordionItem({ question, answer, isOpen, onToggle, id }: AccordionItemProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="border-2 border-dark bg-white shadow-brick-sm">
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-bold uppercase tracking-wide transition-colors hover:bg-off-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-lego-blue md:text-lg"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
          aria-hidden="true"
        >
          <ChevronDown className="h-5 w-5 shrink-0" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="border-t-2 border-dark px-5 py-4 text-base leading-relaxed text-dark-muted">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface AccordionProps {
  items: readonly { question: string; answer: string }[]
  idPrefix: string
}

export function Accordion({ items, idPrefix }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          id={`${idPrefix}-${index}`}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}
