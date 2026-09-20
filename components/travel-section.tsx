import { MapPin } from "lucide-react"
import { events } from "@/lib/wedding-data"
import { SectionHeading } from "@/components/section-heading"

export function TravelSection() {
  return (
    <section id="travel" className="paper-surface scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Plan your trip" title="Venues & Travel" />
        <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-muted-foreground">
          Both events will be in Atlanta, Georgia. These venue names are examples for now; we will add the real addresses, directions, parking and places to stay once the locations are confirmed.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <div key={event.id} className="border border-border/80 bg-card/50 p-8">
              <MapPin className="size-6 text-accent" />
              <p className="tracking-luxe mt-5 text-xs uppercase text-muted-foreground">{event.name}</p>
              <h3 className="mt-2 font-serif text-3xl font-light text-foreground">{event.venue}</h3>
              <p className="mt-3 text-muted-foreground">Atlanta, Georgia · Sample venue · Address to be confirmed</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
