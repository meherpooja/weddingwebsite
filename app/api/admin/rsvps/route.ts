import { hasAdminSession } from "@/lib/admin-auth"
import { getRsvpDatabase } from "@/lib/rsvp-database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  if (!hasAdminSession(request.headers.get("cookie"))) {
    return Response.json({ error: "Please sign in to view RSVP details." }, { status: 401, headers: { "Cache-Control": "no-store" } })
  }

  if (!process.env.DATABASE_URL) {
    return Response.json({ error: "RSVP details are temporarily unavailable." }, { status: 503, headers: { "Cache-Control": "no-store" } })
  }

  try {
    const sql = await getRsvpDatabase()
    if (!sql) throw new Error("Database is not configured")
    const responses = await sql`
      SELECT
        id::text AS id,
        name,
        email,
        pre_wedding_response,
        pre_wedding_attending,
        pre_wedding_guest_count,
        wedding_response,
        wedding_attending,
        wedding_guest_count,
        message,
        created_at
      FROM rsvp_responses
      ORDER BY created_at DESC, id DESC
    `

    return Response.json({ responses }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("Admin RSVP list could not be loaded", error)
    return Response.json({ error: "RSVP details are temporarily unavailable." }, { status: 503, headers: { "Cache-Control": "no-store" } })
  }
}
