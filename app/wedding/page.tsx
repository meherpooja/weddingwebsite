import { EventPage } from "@/components/event-page"
import { events } from "@/lib/wedding-data"

export default function WeddingPage() {
  return <EventPage event={events[1]} />
}
