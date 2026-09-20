import Image from "next/image"
import { gallery, wedding } from "@/lib/wedding-data"
import { SectionHeading } from "@/components/section-heading"

export function GallerySection() {
  return (
    <section id="gallery" className="scroll-mt-20 border-y border-border/80 bg-secondary/50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Moments" title="Gallery" />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {gallery.map((photo, i) => (
            <div
              key={photo.src}
              className={
                "relative overflow-hidden border border-border/60 p-1 " +
                (i % 3 === 0 ? "aspect-[3/4]" : "aspect-square") +
                (i === 0 ? " lg:row-span-2 lg:aspect-[3/5]" : "")
              }
            >
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        <p className="mt-12 text-center font-serif text-2xl font-light italic text-muted-foreground">
          {wedding.hashtag}
        </p>
      </div>
    </section>
  )
}
