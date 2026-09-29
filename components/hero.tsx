import { events, wedding } from "@/lib/wedding-data"
import { HometownSketch, hometowns } from "@/components/schedule-section"

export function Hero() {
  return (
    <section id="top" className="paper-surface relative isolate flex min-h-svh items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-[#514c45] lg:min-h-[850px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M66 216c93-129 233-72 328-122 99-52 186 48 297 3 100-40 222-49 343 50 110 89 54 184 84 282 36 120-53 191-194 210-121 17-198-39-314-13-122 28-232 107-377 42C102 610 155 509 82 410 36 348 20 279 66 216Z" stroke="#ad9e89" strokeWidth="2" strokeDasharray="9 13" />
        <ellipse cx="394" cy="94" rx="43" ry="23" stroke="#ad9e89" strokeWidth="2" strokeDasharray="9 13" />
        <ellipse cx="742" cy="640" rx="45" ry="22" stroke="#ad9e89" strokeWidth="2" strokeDasharray="9 13" />
      </svg>

      <div className="pointer-events-none absolute inset-0 hidden lg:block [&_figure]:w-44 xl:[&_figure]:w-56">
        <div className="absolute left-[3%] top-[17%]"><HometownSketch {...hometowns[0]} /></div>
        <div className="absolute right-[3%] top-[17%]"><HometownSketch {...hometowns[1]} /></div>
        <div className="absolute bottom-[9%] left-[8%]"><HometownSketch {...hometowns[2]} /></div>
        <div className="absolute bottom-[9%] right-[8%]"><HometownSketch {...hometowns[3]} /></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <div className="mx-auto mb-8 grid max-w-xs grid-cols-2 justify-items-center gap-6 lg:hidden [&_figure]:w-28 sm:[&_figure]:w-36">
          {hometowns.slice(0, 2).map((place) => <HometownSketch key={place.kind} {...place} />)}
        </div>
        <p className="tracking-luxe text-xs uppercase text-[#746b60]">Together with our families</p>
        <h1 className="mt-7 font-serif text-[clamp(4.7rem,12vw,10rem)] font-normal italic leading-[0.88] tracking-tight">
          <span className="block">Siddhartha <span className="text-[#a37b68]">&amp;</span></span>
          <span className="mt-2 block leading-none">Meher Pooja</span>
        </h1>
        <p className="mx-auto mt-9 max-w-xl font-serif text-2xl italic text-[#766d61] sm:text-3xl">We would love to celebrate with you</p>
        <div className="mx-auto mt-8 h-px w-36 bg-[#b7a99a]" aria-hidden="true" />
        <div className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-5">
          {events.map((event, index) => (
            <div key={event.id} className="w-full">
              {index > 0 && <span aria-hidden="true" className="mb-5 block font-serif text-3xl italic text-[#a37b68]">&amp;</span>}
              <div className="inline-flex flex-col items-center px-9 py-2">
                <span className="font-serif text-3xl italic sm:text-4xl">{event.name}</span>
                <span className="mt-1 text-sm text-[#766d61]">{event.dateLabel}</span>
                <span className="mt-1 text-xs tracking-wide text-[#766d61]">{event.timeLabel}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 grid max-w-xs grid-cols-2 justify-items-center gap-6 lg:hidden [&_figure]:w-28 sm:[&_figure]:w-36">
          {hometowns.slice(2).map((place) => <HometownSketch key={place.kind} {...place} />)}
        </div>
      </div>
    </section>
  )
}
