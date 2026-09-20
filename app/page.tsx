import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { OurStory } from "@/components/our-story"
import { ScheduleSection } from "@/components/schedule-section"
import { TravelSection } from "@/components/travel-section"
import { GallerySection } from "@/components/gallery-section"
import { RsvpSection } from "@/components/rsvp-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <OurStory />
        <ScheduleSection />
        <TravelSection />
        <GallerySection />
        <RsvpSection />
      </main>
      <SiteFooter />
    </>
  )
}
