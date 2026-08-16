import { FAQ_ITEMS } from '../data/content'
import { Accordion } from './ui/Accordion'

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
          FAQ
        </h2>
        <p className="mt-4 text-lg text-dark-muted">
          Everything you need to know before you register.
        </p>

        <div className="mt-10">
          <Accordion items={FAQ_ITEMS} idPrefix="faq" />
        </div>
      </div>
    </section>
  )
}
