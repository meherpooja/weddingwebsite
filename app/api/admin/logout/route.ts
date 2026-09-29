import { adminCookie, sameOriginRequest } from "@/lib/admin-auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  if (!sameOriginRequest(request)) {
    return Response.json({ error: "Please sign out from this website." }, { status: 403 })
  }

  return Response.json(
    { success: true },
    { headers: { "Set-Cookie": adminCookie("", 0), "Cache-Control": "no-store" } },
  )
}
