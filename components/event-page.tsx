import Link from "next/link"
import { events } from "@/lib/wedding-data"
import { EventRsvpForm } from "@/components/event-rsvp-form"

type Event = (typeof events)[number]

export function EventPage({ event }: { event: Event }) {
  return (
    <main className="text-[#514c45]">
      <section className="paper-surface relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        <Link href="/" className="absolute left-6 top-6 border-b border-current pb-1 font-serif text-lg hover:text-[#a37b68]">← Back home</Link>
        <p className="tracking-luxe text-xs uppercase text-[#756b5f]">Sid &amp; Pooja · Atlanta, Georgia</p>
        <h1 className="mt-7 max-w-4xl font-serif text-6xl italic leading-none sm:text-8xl">{event.name}</h1>
        <div className="mx-auto mt-9 h-px w-36 bg-[#b7a99a]" aria-hidden="true" />
        <p className="mt-7 font-serif text-3xl italic">{event.dateLabel}</p>
        <p className="mt-5 text-sm text-[#756b5f]">Atlanta venue details will be added once confirmed.</p>
        <a href="#rsvp" className="mt-9 border-b border-[#514c45] pb-1 text-sm uppercase tracking-luxe hover:text-[#a37b68]">View RSVP preview ↓</a>
      </section>
      <EventRsvpForm songRequest={event.id === "pre-wedding"} />
    </main>
  )
}
