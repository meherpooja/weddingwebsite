import { EventPage } from "@/components/event-page"
import { events } from "@/lib/wedding-data"

export default function PreWeddingPage() {
  return <EventPage event={events[0]} />
}
