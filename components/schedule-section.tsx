import { events, wedding } from "@/lib/wedding-data"

type Hometown = "nizambad" | "nalgonda" | "atlanta" | "new-jersey"

export const hometowns: { kind: Hometown; name: string }[] = [
  { kind: "nizambad", name: "Nizambad" },
  { kind: "atlanta", name: "Atlanta" },
  { kind: "nalgonda", name: "Nalgonda" },
  { kind: "new-jersey", name: "New Jersey" },
]

export function HometownSketch({ kind, name }: { kind: Hometown; name: string }) {
  return (
    <figure className="w-28 text-center text-[#827769] sm:w-36 xl:w-60">
      <svg viewBox="0 0 240 150" className="h-auto w-full" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {kind === "nizambad" && (
          <>
            <path d="M15 124h210M27 116h186M39 49h162v67M48 49l15-18h114l15 18M76 31V19h88v12M112 19V11h16v8M55 61h130M56 116V61m128 55V61M82 116V77h76v39M95 116V88h50v28" />
            <path d="M63 61v-9m20 9v-9m20 9v-9m20 9v-9m20 9v-9m20 9v-9M11 132c39-7 57-2 83 0m35 0c40-7 65-4 102 0" />
          </>
        )}
        {kind === "atlanta" && (
          <>
            <path d="M8 124h224M22 124V77h27v47m8 0V55h31v69m11 0V34h32v90m12 0V67h25v57m10 0V48h32v76m9 0V83h20v41M115 34V15m-8 0h16M15 133c40-5 69-4 95 0m20 0c32-5 62-4 98 0" />
            <path d="M29 88h12m-12 12h12m-12 12h12M64 68h16m-16 13h16m-16 13h16m-16 13h16M105 50h20m-20 13h20m-20 13h20m-20 13h20m-20 13h20M183 62h22m-22 14h22m-22 14h22m-22 14h22" />
          </>
        )}
        {kind === "nalgonda" && (
          <>
            <path d="M6 126h228M12 116l38-35 17 13 36-48 32 37 23-22 65 55M27 115l23-21 17 11 37-44 30 37 25-26 46 43" />
            <path d="M59 80h115M70 80V64h97v16M80 64l16-14h46l16 14M106 50V37h27v13M88 80v22m20-22v24m20-24v24m20-24v22M16 135c29-5 47-3 68 0m37 0c35-5 65-3 104 0" />
          </>
        )}
        {kind === "new-jersey" && (
          <>
            <path d="M8 123h224M30 114c34-11 59-10 86 0 30-11 58-10 94 0M22 134c35-10 67-9 94 0 32-10 69-9 102 0" />
            <path d="M93 110l12-62h30l12 62M100 72h40M104 48l16-21 16 21M120 27V14m-6 0h12M112 93h16m-16-12h16M72 111V87l16-8 16 8m48 24V88l20-11 20 11M30 78c19-10 37-9 54-1m112-1c12-6 25-6 39-1" />
          </>
        )}
      </svg>
      <figcaption className="mt-1 font-serif text-lg italic leading-tight sm:text-xl">{name}</figcaption>
    </figure>
  )
}

export function ScheduleSection() {
  return (
    <section
      id="schedule"
      className="paper-surface relative isolate scroll-mt-20 overflow-hidden border-y border-[#c8bda9] px-6 py-24 text-[#514c45] sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 1200 850" preserveAspectRatio="none" fill="none">
          <path d="M60 135C205 20 305 180 455 88s265 35 384 10 278 13 305 132c30 141-150 163-100 283s39 211-117 211c-135 0-180-66-322-23S275 764 172 664C59 557 187 473 103 390 44 331-5 196 60 135Z" stroke="#a99b88" strokeWidth="2" strokeDasharray="10 14" />
          <ellipse cx="470" cy="100" rx="44" ry="23" stroke="#b3a591" strokeWidth="2" strokeDasharray="10 12" />
          <ellipse cx="795" cy="724" rx="46" ry="23" stroke="#b3a591" strokeWidth="2" strokeDasharray="10 12" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="tracking-luxe text-xs uppercase text-[#766d61]">Our celebration · November 2026</p>
        <h2 className="mt-7 font-serif text-6xl font-light italic leading-none sm:text-8xl">
          {wedding.partnerOne} <span className="text-[#a77868]">&amp;</span> {wedding.partnerTwo}
        </h2>
        <div className="mx-auto mt-9 h-px w-32 bg-[#b7a99a]/70" aria-hidden="true" />

        <div className="mt-10 space-y-10">
          {events.map((event, index) => (
            <div key={event.id} id={event.id} className="scroll-mt-28">
              {index > 0 && <span aria-hidden="true" className="mb-8 block font-serif text-3xl italic text-[#a77868]">&amp;</span>}
              <p className="tracking-luxe text-xs font-medium uppercase text-[#766d61]">{event.name}</p>
              <h3 className="mt-3 font-serif text-3xl font-light italic sm:text-4xl">{event.dateLabel}</h3>
              <p className="mt-3 text-sm text-[#766d61]">Sample venue: {event.venue}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-xs text-[#766d61]">Venue names are placeholders. Addresses will follow.</p>
      </div>

    </section>
  )
}
