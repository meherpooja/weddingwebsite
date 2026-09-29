"use client"

import { useCallback, useEffect, useState } from "react"

type GuestMessage = {
  name: string
  message: string
  created_at: string
}

export function GuestMessageWall() {
  const [messages, setMessages] = useState<GuestMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [unavailable, setUnavailable] = useState(false)

  const loadMessages = useCallback(async () => {
    try {
      const response = await fetch("/api/rsvp", { cache: "no-store" })
      if (!response.ok) throw new Error("Could not load guest messages")
      const result = (await response.json()) as { messages?: GuestMessage[] }
      setMessages(Array.isArray(result.messages) ? result.messages : [])
      setUnavailable(false)
    } catch {
      setUnavailable(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadMessages()
    window.addEventListener("guest-message-saved", loadMessages)
    const refresh = window.setInterval(loadMessages, 60_000)

    return () => {
      window.removeEventListener("guest-message-saved", loadMessages)
      window.clearInterval(refresh)
    }
  }, [loadMessages])

  return (
    <section aria-labelledby="guest-messages-title" className="mx-auto mt-20 max-w-3xl border-t border-[#c8bda9] pt-14">
      <h2 id="guest-messages-title" className="mt-3 text-center font-serif text-4xl italic">Love &amp; Wishes</h2>

      {loading ? (
        <p role="status" className="mt-10 text-center text-sm text-[#756b5f]">Loading messages…</p>
      ) : unavailable ? (
        <p role="status" className="mt-10 text-center text-sm text-[#756b5f]">Guest messages are unavailable right now. Please check back soon.</p>
      ) : messages.length === 0 ? (
        <p className="mt-10 border border-[#c8bda9] bg-[#fbf8f1]/70 p-6 text-center font-serif text-xl italic text-[#756b5f]">Be the first to leave a note with your RSVP.</p>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {messages.map((message, index) => (
            <li key={`${message.created_at}-${index}`} className="border border-[#c8bda9] bg-[#fbf8f1]/70 p-6">
              <p className="whitespace-pre-wrap break-words font-serif text-xl italic leading-relaxed">“{message.message}”</p>
              <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#c8bda9]/70 pt-4">
                <p className="text-xs font-medium uppercase tracking-luxe text-[#514c45]">{message.name}</p>
                <time className="shrink-0 text-xs text-[#756b5f]" dateTime={message.created_at}>
                  {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(message.created_at))}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
