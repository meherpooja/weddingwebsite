import { wedding } from "@/lib/wedding-data"

export function SiteFooter() {
  return (
    <footer className="paper-surface py-16 text-center">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-serif text-4xl font-light text-foreground">
          {wedding.partnerOne}
          <span className="mx-2 text-accent">&amp;</span>
          {wedding.partnerTwo}
        </p>
        <p className="tracking-luxe mt-4 text-xs uppercase text-muted-foreground">
          {wedding.dateLabel} &nbsp;&middot;&nbsp; {wedding.city}
        </p>
        <p className="mt-6 font-serif text-lg italic text-accent">{wedding.hashtag}</p>
        <p className="mt-8 text-xs text-muted-foreground/70">
          Made with love for our celebration.
        </p>
      </div>
    </footer>
  )
}
