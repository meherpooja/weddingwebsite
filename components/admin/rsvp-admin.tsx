"use client"

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react"

type Rsvp = {
  id: string
  name: string
  email: string
  pre_wedding_response: "yes" | "no" | "maybe"
  pre_wedding_attending: boolean
  pre_wedding_guest_count: number | null
  wedding_response: "yes" | "no" | "maybe"
  wedding_attending: boolean
  wedding_guest_count: number | null
  message: string
  created_at: string
}

function eventSummary(response: Rsvp["pre_wedding_response"], count: number | null) {
  if (response === "yes") return `Attending${count ? ` · ${count}` : ""}`
  if (response === "maybe") return "Might attend"
  return "Not attending"
}

function submittedDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date))
}

export function RsvpAdmin() {
  const [password, setPassword] = useState("")
  const [responses, setResponses] = useState<Rsvp[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const loadResponses = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/rsvps", { cache: "no-store" })
      if (response.status === 401) {
        setAuthenticated(false)
        return
      }
      const result = (await response.json()) as { responses?: Rsvp[]; error?: string }
      if (!response.ok) throw new Error(result.error || "Could not load RSVP details.")
      setResponses(Array.isArray(result.responses) ? result.responses : [])
      setAuthenticated(true)
      setError("")
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load RSVP details.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadResponses()
  }, [loadResponses])

  const filteredResponses = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return responses
    return responses.filter((response) =>
      [response.name, response.email, response.message].some((value) => value.toLowerCase().includes(normalized)),
    )
  }, [query, responses])

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError("")
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const result = (await response.json()) as { error?: string }
      if (!response.ok) throw new Error(result.error || "Could not sign in.")
      setPassword("")
      await loadResponses()
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Could not sign in.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    setAuthenticated(false)
    setResponses([])
  }

  return (
    <main className="paper-surface min-h-screen px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <a href="/" className="text-xs uppercase tracking-[0.2em] text-[#756b5f] hover:text-[#514c45]">← Sid &amp; Pooja</a>

        {loading ? (
          <p className="mt-20 text-center text-sm text-[#756b5f]" role="status">Loading RSVP admin…</p>
        ) : !authenticated ? (
          <section className="mx-auto mt-16 max-w-md border border-[#c8bda9] bg-[#fbf8f1]/80 p-7 shadow-sm sm:mt-24 sm:p-10">
            <p className="tracking-luxe text-xs uppercase text-[#756b5f]">Private access</p>
            <h1 className="mt-4 font-serif text-4xl italic">RSVP admin</h1>
            <p className="mt-3 text-sm leading-relaxed text-[#756b5f]">Sign in to view guest responses. This page is for the couple and their authorized helpers.</p>
            <form className="mt-8 space-y-5" onSubmit={handleLogin}>
              <label className="block text-sm font-medium" htmlFor="admin-password">Admin password</label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="-mt-3 w-full border border-[#c8bda9] bg-[#fffdf8] px-4 py-3 outline-none focus:border-[#8c6c5a] focus:ring-2 focus:ring-[#8c6c5a]/20"
              />
              {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
              <button disabled={submitting} className="w-full bg-[#514c45] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[#fbf8f1] transition hover:bg-[#756b5f] disabled:opacity-60">
                {submitting ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </section>
        ) : (
          <section className="mt-12">
            <div className="flex flex-col justify-between gap-6 border-b border-[#c8bda9] pb-7 sm:flex-row sm:items-end">
              <div>
                <p className="tracking-luxe text-xs uppercase text-[#756b5f]">Private access</p>
                <h1 className="mt-3 font-serif text-4xl italic sm:text-5xl">RSVP responses</h1>
                <p className="mt-3 text-sm text-[#756b5f]">{responses.length} {responses.length === 1 ? "response" : "responses"}</p>
              </div>
              <button onClick={handleLogout} className="self-start border border-[#c8bda9] px-4 py-2 text-xs uppercase tracking-[0.16em] transition hover:bg-[#fbf8f1] sm:self-auto">Sign out</button>
            </div>

            <label className="mt-8 block max-w-lg text-sm font-medium" htmlFor="rsvp-search">Search guests</label>
            <input id="rsvp-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, email, or message" className="mt-2 w-full max-w-lg border border-[#c8bda9] bg-[#fffdf8] px-4 py-3 outline-none focus:border-[#8c6c5a] focus:ring-2 focus:ring-[#8c6c5a]/20" />

            {error && <p role="alert" className="mt-5 text-sm text-red-800">{error}</p>}
            <div className="mt-6 overflow-x-auto border border-[#c8bda9] bg-[#fbf8f1]/80">
              <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                <thead className="bg-[#eee5d6] text-xs uppercase tracking-[0.12em] text-[#635b52]">
                  <tr>
                    <th className="px-4 py-4 font-medium">Guest</th>
                    <th className="px-4 py-4 font-medium">Pre-wedding</th>
                    <th className="px-4 py-4 font-medium">Wedding</th>
                    <th className="px-4 py-4 font-medium">Message</th>
                    <th className="px-4 py-4 font-medium">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c8bda9]">
                  {filteredResponses.map((response) => (
                    <tr key={response.id} className="align-top">
                      <td className="px-4 py-4">
                        <p className="font-medium">{response.name}</p>
                        <a className="mt-1 inline-block text-xs text-[#756b5f] underline decoration-[#c8bda9] underline-offset-2" href={`mailto:${response.email}`}>{response.email}</a>
                      </td>
                      <td className="px-4 py-4">{eventSummary(response.pre_wedding_response, response.pre_wedding_guest_count)}</td>
                      <td className="px-4 py-4">{eventSummary(response.wedding_response, response.wedding_guest_count)}</td>
                      <td className="max-w-sm whitespace-pre-wrap break-words px-4 py-4 text-[#756b5f]">{response.message || "—"}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-xs text-[#756b5f]">{submittedDate(response.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredResponses.length === 0 && <p className="p-8 text-center text-sm text-[#756b5f]">{responses.length ? "No guests match that search." : "No RSVPs have been submitted yet."}</p>}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
