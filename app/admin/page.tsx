import type { Metadata } from "next"
import { RsvpAdmin } from "@/components/admin/rsvp-admin"

export const metadata: Metadata = {
  title: "RSVP Admin | Sid & Pooja",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default function AdminPage() {
  return <RsvpAdmin />
}
