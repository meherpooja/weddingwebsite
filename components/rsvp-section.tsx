import { Heart } from "lucide-react"
import Link from "next/link"
import { events } from "@/lib/wedding-data"

export function RsvpSection() {
  return (
    <section id="rsvp" className="scroll-mt-20 bg-primary py-24 text-primary-foreground sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="tracking-luxe text-xs font-medium uppercase text-primary-foreground/70">Your invitation</p>
        <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl">RSVP for each event</h2>
        <Heart aria-hidden className="mx-auto mt-6 size-5 fill-current text-primary-foreground/60" />
        <p className="mx-auto mt-7 max-w-xl leading-relaxed text-primary-foreground/80">
          You will be able to reply separately for the pre-wedding celebration and the wedding.
          RSVP responses are not open yet; please check back when we announce the deadline.
        </p>
        <div className="mt-12 flex flex-col items-center gap-5">
          {events.map((event) => (
            <Link key={event.id} href={event.id === "pre-wedding" ? "/pre-wedding#rsvp" : "/wedding#rsvp"} className="group border-b border-primary-foreground/50 pb-2 font-serif text-2xl italic hover:text-[#f0b9b9] focus-visible:text-[#f0b9b9]">
              {event.name} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-primary-foreground/75">Each event has its own RSVP preview, including a separate meal choice and allergy notes for every attending guest.</p>
      </div>
    </section>
  )
}
