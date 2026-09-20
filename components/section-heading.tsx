import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  className?: string
}

export function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {eyebrow ? (
        <span className="tracking-luxe text-xs font-medium uppercase text-accent">{eyebrow}</span>
      ) : null}
      <h2 className="mt-3 font-serif text-4xl font-light text-foreground sm:text-5xl">{title}</h2>
      <span aria-hidden className="mt-5 flex items-center gap-2 text-accent">
        <span className="h-px w-8 bg-accent/50" />
        <span className="text-lg leading-none">&#10086;</span>
        <span className="h-px w-8 bg-accent/50" />
      </span>
    </div>
  )
}
