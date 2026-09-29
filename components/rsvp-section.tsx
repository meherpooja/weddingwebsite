import { EventRsvpForm } from "@/components/event-rsvp-form"
import { GuestMessageWall } from "@/components/guest-message-wall"

export function RsvpSection() {
  return (
    <>
      <EventRsvpForm />
      <div className="paper-surface px-4 pb-20 text-[#514c45] sm:px-6 sm:pb-28">
        <GuestMessageWall />
      </div>
    </>
  )
}
