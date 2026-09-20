"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "#story", label: "Our Story" },
  { href: "#schedule", label: "Events" },
  { href: "#travel", label: "Travel" },
  { href: "#gallery", label: "Gallery" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-[#c8bda9] bg-[#f5efe3]/95 shadow-sm backdrop-blur-md" : "border-b border-[#c8bda9]/50 bg-[#f5efe3]/80 backdrop-blur-md",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className={cn(
            "font-serif text-xl tracking-wide transition-colors",
            "text-foreground",
          )}
        >
          S <span className="text-accent">&amp;</span> P
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "tracking-luxe text-xs font-medium uppercase transition-colors hover:text-accent",
                  "text-foreground/80",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#rsvp"
          className="hidden border border-[#8f8170] px-5 py-2 text-xs font-medium uppercase tracking-luxe text-foreground transition-colors hover:bg-[#e8dfce] md:inline-block"
        >
          RSVP
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-full transition-colors md:hidden",
            "text-foreground",
          )}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {[...links, { href: "#rsvp", label: "RSVP" }].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 tracking-luxe text-sm font-medium uppercase text-foreground hover:bg-muted"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
