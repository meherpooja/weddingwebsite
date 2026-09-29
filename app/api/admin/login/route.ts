import { adminCookie, adminPasswordIsValid, createAdminSession, sameOriginRequest } from "@/lib/admin-auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  if (!sameOriginRequest(request)) {
    return Response.json({ error: "Please sign in from this website." }, { status: 403 })
  }

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json(
      { error: "Admin sign-in is not configured yet. Add ADMIN_PASSWORD in the Vercel project settings." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    )
  }
  if (!process.env.ADMIN_SESSION_SECRET) {
    return Response.json(
      { error: "Admin sign-in is not configured yet. Add ADMIN_SESSION_SECRET in the Vercel project settings." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    )
  }
  if (process.env.ADMIN_SESSION_SECRET.length < 32) {
    return Response.json(
      { error: "ADMIN_SESSION_SECRET must be at least 32 characters. Update it in the Vercel project settings." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    )
  }

  let body: { password?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Enter the admin password." }, { status: 400 })
  }

  if (!adminPasswordIsValid(body.password)) {
    return Response.json({ error: "That password is not correct." }, { status: 401, headers: { "Cache-Control": "no-store" } })
  }

  const session = createAdminSession()
  if (!session) return Response.json({ error: "Admin sign-in is not configured yet." }, { status: 503 })

  return Response.json(
    { success: true },
    { headers: { "Set-Cookie": adminCookie(session, 8 * 60 * 60), "Cache-Control": "no-store" } },
  )
}
