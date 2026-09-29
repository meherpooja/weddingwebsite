import { SectionHeading } from "@/components/section-heading"
import { venue } from "@/lib/wedding-data"

const questions = [
  {
    question: "When are the celebrations?",
    answer: "The pre-wedding celebration is Wednesday, November 25, 2026. The wedding ceremony is Friday, November 27, 2026.",
  },
  {
    question: "Where will they take place?",
    answer: `Both events are at ${venue.name}, ${venue.address}. Tap the venue card below for directions.`,
  },
  {
    question: "Can I attend just one event?",
    answer: "Yes. The RSVP form lets you choose your attendance for each celebration separately, while entering your details only once.",
  },
]

export function GuestFaq() {
  return (
    <section id="faq" className="paper-surface scroll-mt-20 border-t border-[#c8bda9] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Good to know" title="Guest FAQs" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {questions.map(({ question, answer }) => (
            <article key={question} className="border border-[#c8bda9] bg-[#fbf8f1]/70 p-7 sm:p-8">
              <h3 className="font-serif text-2xl italic text-[#514c45]">{question}</h3>
              <p className="mt-4 text-sm leading-7 text-[#756b5f]">{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
