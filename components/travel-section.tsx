import { MapPin } from "lucide-react"
import { nearbyHotels, venue } from "@/lib/wedding-data"
import { SectionHeading } from "@/components/section-heading"

export function TravelSection() {
  return (
    <section id="travel" className="paper-surface scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Plan your trip" title="Venues & Travel" />
        <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-muted-foreground">
          Both celebrations will take place at the same venue in Cumming, Georgia.
        </p>
        <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" className="group mx-auto mt-12 block max-w-2xl border border-border/80 bg-card/50 p-8 transition-colors hover:bg-[#eee5d7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514c45]">
          <MapPin className="size-6 text-accent" aria-hidden="true" />
          <p className="tracking-luxe mt-5 text-xs uppercase text-muted-foreground">Pre-wedding celebration &amp; wedding ceremony</p>
          <h3 className="mt-2 font-serif text-3xl font-light text-foreground">{venue.name}</h3>
          <p className="mt-3 text-muted-foreground">{venue.address}</p>
          <span className="mt-5 inline-block border-b border-current pb-1 text-xs font-medium uppercase tracking-luxe text-[#514c45] group-hover:text-accent">Open in Google Maps ↗</span>
        </a>

        <div className="mx-auto mt-20 max-w-5xl">
          <div className="text-center">
            <h3 className="mt-3 font-serif text-4xl font-light text-foreground">Nearby stays</h3>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {nearbyHotels.map((hotel) => (
              <li key={hotel.name} className="flex flex-col border border-border/80 bg-card/50 p-6">
                <h4 className="font-serif text-2xl font-light leading-snug text-foreground">{hotel.name}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{hotel.address}</p>
                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-xs font-medium uppercase tracking-[0.14em]">
                  <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="border-b border-[#514c45]/50 pb-1 text-[#514c45] hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514c45]">Hotel website ↗</a>
                  <a href={hotel.maps} target="_blank" rel="noopener noreferrer" className="border-b border-[#514c45]/50 pb-1 text-[#514c45] hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514c45]">Google Maps ↗</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
