import { Hero } from "@/components/hero"
import { TravelSection } from "@/components/travel-section"
import { GallerySection } from "@/components/gallery-section"
import { RsvpSection } from "@/components/rsvp-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <TravelSection />
        <GallerySection />
        <RsvpSection />
      </main>
      <SiteFooter />
    </>
  )
}
