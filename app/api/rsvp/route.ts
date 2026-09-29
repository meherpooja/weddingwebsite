import { getRsvpDatabase } from "@/lib/rsvp-database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Attendance = "yes" | "no" | "maybe"

function isAttendance(value: unknown): value is Attendance {
  return value === "yes" || value === "no" || value === "maybe"
}

function guestCount(value: unknown, attending: Attendance): number | null | undefined {
  if (attending !== "yes") return null
  const count = Number(value)
  return Number.isInteger(count) && count >= 1 && count <= 5 ? count : undefined
}

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json(
      { error: "Guest messages are temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    )
  }

  try {
    const sql = await getRsvpDatabase()
    if (!sql) throw new Error("Database is not configured")
    const messages = await sql`
      SELECT name, message, created_at
      FROM rsvp_responses
      WHERE length(trim(message)) > 0
      ORDER BY created_at DESC, id DESC
      LIMIT 50
    `

    return Response.json(
      { messages },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    console.error("Guest messages could not be loaded", error)
    return Response.json(
      { error: "Guest messages are temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    )
  }
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return Response.json({ error: "Please submit the RSVP form." }, { status: 415 })
  }

  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return Response.json({ error: "Please submit the RSVP form from this website." }, { status: 403 })
    } catch {
      return Response.json({ error: "Please submit the RSVP form from this website." }, { status: 403 })
    }
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (contentLength > 10_000) return Response.json({ error: "Your response is too long." }, { status: 413 })

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 })
  }

  // Hidden honeypot field for basic bot filtering.
  if (typeof body.website === "string" && body.website.trim()) return Response.json({ success: true })

  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
  const message = typeof body.message === "string" ? body.message.trim() : ""
  const preWeddingAttendance = body.preWeddingAttendance
  const weddingAttendance = body.weddingAttendance

  if (name.length < 1 || name.length > 120) return Response.json({ error: "Please enter your name (up to 120 characters)." }, { status: 400 })
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Please enter a valid email address." }, { status: 400 })
  if (!isAttendance(preWeddingAttendance) || !isAttendance(weddingAttendance)) {
    return Response.json({ error: "Please choose an answer for both events." }, { status: 400 })
  }
  if (message.length > 1000) return Response.json({ error: "Your message must be 1,000 characters or fewer." }, { status: 400 })

  const preWeddingGuests = guestCount(body.preWeddingGuestCount, preWeddingAttendance)
  const weddingGuests = guestCount(body.weddingGuestCount, weddingAttendance)
  if (preWeddingGuests === undefined || weddingGuests === undefined) {
    return Response.json({ error: "Please choose a guest count from 1 to 5 for each event you accept." }, { status: 400 })
  }

  if (!process.env.DATABASE_URL) return Response.json({ error: "RSVP submissions are temporarily unavailable. Please try again later." }, { status: 503 })

  try {
    const sql = await getRsvpDatabase()
    if (!sql) throw new Error("Database is not configured")
    await sql`
      INSERT INTO rsvp_responses (
        name, email, pre_wedding_attending, pre_wedding_guest_count,
        wedding_attending, wedding_guest_count, message,
        pre_wedding_response, wedding_response
      ) VALUES (
        ${name}, ${email}, ${preWeddingAttendance === "yes"}, ${preWeddingGuests},
        ${weddingAttendance === "yes"}, ${weddingGuests}, ${message},
        ${preWeddingAttendance}, ${weddingAttendance}
      )
    `
    return Response.json({ success: true })
  } catch (error) {
    console.error("RSVP save failed", error)
    return Response.json({ error: "We couldn’t save your RSVP. Please try again in a moment." }, { status: 500 })
  }
}
