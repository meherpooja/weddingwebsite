"use client"

import { useEffect, useState } from "react"

function getParts(target: number) {
  const diff = Math.max(0, target - Date.now())
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1000)
  return { days, hours, minutes, seconds }
}

export function Countdown({ date, light = false }: { date: Date; light?: boolean }) {
  const target = date.getTime()
  const [parts, setParts] = useState(() => getParts(target))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setParts(getParts(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const items = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Minutes", value: parts.minutes },
    { label: "Seconds", value: parts.seconds },
  ]

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8" aria-live="off">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <span
            className={
              light
                ? "font-serif text-4xl font-light tabular-nums text-background sm:text-5xl"
                : "font-serif text-4xl font-light tabular-nums text-foreground sm:text-5xl"
            }
          >
            {mounted ? String(item.value).padStart(2, "0") : "--"}
          </span>
          <span
            className={
              light
                ? "tracking-luxe mt-2 text-[0.65rem] uppercase text-background/75"
                : "tracking-luxe mt-2 text-[0.65rem] uppercase text-muted-foreground"
            }
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
