"use client"

import { useState } from "react"

const fieldClass = "mt-2 w-full rounded-none border border-[#c8bba8] bg-[#fbf7ef] px-4 py-3 text-[#514c45] outline-none focus:border-[#8c7564] focus:ring-2 focus:ring-[#8c7564]/20"

export function EventRsvpForm({ songRequest = false }: { songRequest?: boolean }) {
  const [attendance, setAttendance] = useState("")
  const [partySize, setPartySize] = useState(1)

  return (
    <section id="rsvp" className="paper-surface border-t border-[#c8bda9] px-6 py-20 text-[#514c45] sm:py-28">
      <div className="mx-auto max-w-2xl">
        <p className="tracking-luxe text-center text-xs uppercase text-[#756b5f]">Your invitation</p>
        <h2 className="mt-3 text-center font-serif text-5xl italic">RSVP</h2>
        <p className="mx-auto mt-5 max-w-xl text-center leading-relaxed text-[#756b5f]">This is a preview of the questions. Responses are not being collected yet.</p>

        <form className="mt-12 space-y-8" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm font-medium">Your name
              <input className={fieldClass} type="text" placeholder="First and last name" autoComplete="name" />
            </label>
            <label className="block text-sm font-medium">Email for confirmation
              <input className={fieldClass} type="email" placeholder="you@example.com" autoComplete="email" />
            </label>
          </div>

          <fieldset>
            <legend className="text-sm font-medium">Will you attend?</legend>
            <div className="mt-3 flex flex-wrap gap-6">
              <label className="flex items-center gap-2"><input type="radio" name="attendance" value="yes" checked={attendance === "yes"} onChange={() => setAttendance("yes")} className="accent-[#a37b68]" /> Joyfully accepts</label>
              <label className="flex items-center gap-2"><input type="radio" name="attendance" value="no" checked={attendance === "no"} onChange={() => setAttendance("no")} className="accent-[#a37b68]" /> Regretfully declines</label>
            </div>
          </fieldset>

          {attendance === "yes" && (
            <div className="space-y-7 border-t border-[#c8bba8] pt-8">
              <label className="block max-w-xs text-sm font-medium">Number of attending guests in your party
                <select className={fieldClass} value={partySize} onChange={(event) => setPartySize(Number(event.target.value))}>
                  {[1, 2, 3, 4, 5].map((count) => <option key={count} value={count}>{count}</option>)}
                </select>
              </label>
              {Array.from({ length: partySize }, (_, index) => (
                <fieldset key={index} className="border border-[#c8bba8] bg-[#fbf7ef]/55 p-5 sm:p-6">
                  <legend className="px-2 font-serif text-2xl italic">Guest {index + 1}</legend>
                  <label className="block text-sm font-medium">Meal preference
                    <select className={fieldClass} defaultValue="">
                      <option value="" disabled>Choose a meal</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="non-vegetarian">Non-vegetarian</option>
                    </select>
                  </label>
                  <label className="mt-5 block text-sm font-medium">Food allergies or dietary notes
                    <input className={fieldClass} type="text" placeholder="Leave blank if none" />
                  </label>
                </fieldset>
              ))}
            </div>
          )}

          {songRequest && attendance === "yes" && (
            <label className="block text-sm font-medium">Is there a song you would love to dance to?
              <input className={fieldClass} type="text" placeholder="Song title and artist" />
            </label>
          )}

          <label className="block text-sm font-medium">Comments or a note for us
            <textarea className={`${fieldClass} min-h-32 resize-y`} placeholder="Anything you would like us to know" />
          </label>

          <div className="border-t border-[#c8bba8] pt-6 text-center">
            <button type="button" disabled className="cursor-not-allowed border border-[#988a78] px-8 py-3 text-xs uppercase tracking-luxe opacity-55">RSVP opens soon</button>
            <p className="mt-3 text-xs text-[#756b5f]">This preview does not send or save your answers.</p>
          </div>
        </form>
      </div>
    </section>
  )
}
