"use client"

import { useState, type FormEvent } from "react"

type Attendance = "yes" | "no" | "maybe" | ""

const events = [
  { id: "preWedding", name: "Pre-wedding celebration", dressCode: "Indo Western" },
  { id: "wedding", name: "Wedding ceremony", dressCode: "Traditional" },
] as const

export function EventRsvpForm() {
  const [attendance, setAttendance] = useState<Record<(typeof events)[number]["id"], Attendance>>({ preWedding: "", wedding: "" })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const inputClass = "mt-2 w-full border border-[#c8bda9] bg-[#fbf8f1] px-4 py-3 text-[#514c45] outline-none focus:border-[#8f8170] focus:ring-2 focus:ring-[#8f8170]/20"

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    const form = event.currentTarget
    const formData = new FormData(form)
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "We couldn’t save your RSVP. Please try again.")
      setStatus("success")
      window.dispatchEvent(new Event("guest-message-saved"))
      setAttendance({ preWedding: "", wedding: "" })
      form.reset()
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "We couldn’t save your RSVP. Please try again.")
    }
  }

  return (
    <section id="rsvp" className="paper-surface scroll-mt-20 border-t border-[#c8bda9] px-4 py-20 text-[#514c45] sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="tracking-luxe text-center text-xs uppercase text-[#756b5f]">Your invitation</p>
        <h2 className="mt-3 text-center font-serif text-5xl italic">RSVP</h2>
        <p className="mt-5 text-center text-sm text-[#756b5f]">We’d love for you to join us for the celebrations.</p>
        {status === "success" ? (
          <div role="status" className="mt-12 border border-[#c8bda9] bg-[#fbf8f1]/70 p-8 text-center">
            <h3 className="font-serif text-3xl italic">Thank you for your RSVP</h3>
            <p className="mt-3 text-sm text-[#756b5f]">Your response has been received. We appreciate you letting us know.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-6 border-b border-current pb-1 text-xs font-medium uppercase tracking-luxe">Submit another response</button>
          </div>
        ) : (
        <form className="mt-12 space-y-8" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm font-medium">Your name<input className={inputClass} type="text" name="name" autoComplete="name" required /></label>
            <label className="block text-sm font-medium">Email address<input className={inputClass} type="email" name="email" autoComplete="email" required /></label>
          </div>
          {events.map((event) => (
            <fieldset key={event.id} className="border-t border-[#c8bda9] pt-7">
              <legend className="pr-3 font-serif text-2xl italic">{event.name}</legend>
              <p className="-mt-1 text-xs tracking-wide text-[#756b5f]">Dress code: {event.dressCode}</p>
              <p className="mt-2 text-sm font-medium">Will you attend?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {(["yes", "no", "maybe"] as const).map((answer) => (
                  <label key={answer} className="flex cursor-pointer items-center gap-3 border border-[#c8bda9] bg-[#fbf8f1] px-4 py-4 text-sm">
                    <input type="radio" name={`${event.id}Attendance`} value={answer} checked={attendance[event.id] === answer} onChange={() => setAttendance((current) => ({ ...current, [event.id]: answer }))} required className="accent-[#8f8170]" />
                    {answer === "yes" ? "Joyfully accepts" : answer === "no" ? "Regretfully declines" : "Might attend"}
                  </label>
                ))}
              </div>
              {attendance[event.id] === "yes" && (
                <label className="mt-5 block text-sm font-medium">Number of attending guests in your party
                  <select className={inputClass} name={`${event.id}GuestCount`} defaultValue="1" required>
                    {[1, 2, 3, 4, 5].map((count) => <option key={count} value={count}>{count}</option>)}
                  </select>
                </label>
              )}
            </fieldset>
          ))}
          <label className="block text-sm font-medium">Message for the couple <span className="font-normal text-[#756b5f]">(optional)</span>
            <textarea className={inputClass} name="message" rows={4} maxLength={1000} />
          </label>
          <label aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
            Leave this field empty<input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <div className="text-center">
            <button type="submit" disabled={status === "submitting"} className="border border-[#8f8170] px-8 py-3 text-xs font-medium uppercase tracking-luxe transition-colors hover:bg-[#e8dfce] disabled:cursor-wait disabled:opacity-60">
              {status === "submitting" ? "Submitting…" : "Submit RSVP"}
            </button>
            {status === "error" && <p role="alert" className="mt-4 text-sm text-red-800">{errorMessage}</p>}
          </div>
        </form>
        )}
      </div>
    </section>
  )
}
