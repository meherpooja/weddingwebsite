import Image from "next/image"
import { story } from "@/lib/wedding-data"
import { SectionHeading } from "@/components/section-heading"

export function OurStory() {
  return (
    <section id="story" className="paper-surface scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="How it began" title="Our Story" />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden border border-border/60 p-2">
            <Image
              src="/images/story.png"
              alt="Sid and Pooja holding hands in a field of wildflowers"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <ol className="relative space-y-10 border-l border-border pl-8">
            {story.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[2.15rem] top-1.5 flex size-4 items-center justify-center rounded-full border border-accent bg-background">
                  <span className="size-1.5 rounded-full bg-accent" />
                </span>
                <span className="tracking-luxe text-xs font-medium uppercase text-accent">{item.year}</span>
                <h3 className="mt-1 font-serif text-2xl font-normal text-foreground">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
