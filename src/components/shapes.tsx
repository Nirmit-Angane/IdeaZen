// Flat geometric decoration in the palette (highlighter yellow, pine, ink outlines).
// All purely decorative: aria-hidden, no pointer events, hidden where space is tight.

const deco = 'pointer-events-none select-none absolute';

/** Dot matrix, like the registration dots on a printed sheet. */
export function Dots({ cols = 6, rows = 4, className = '' }: { cols?: number; rows?: number; className?: string }) {
  const g = 14;
  return (
    <svg aria-hidden width={cols * g} height={rows * g} className={`${deco} fill-ink-2/50 ${className}`}>
      {Array.from({ length: cols * rows }, (_, i) => (
        <circle key={i} cx={(i % cols) * g + 4} cy={Math.floor(i / cols) * g + 4} r="1.8" />
      ))}
    </svg>
  );
}

/** Shapes clustered around the hero sample plan. */
export function HeroShapes() {
  return (
    <>
      <svg aria-hidden viewBox="0 0 200 200" className={`${deco} -z-10 -top-10 -right-8 w-36 sm:w-52 fill-mark`}>
        <circle cx="100" cy="100" r="100" />
      </svg>
      <svg aria-hidden viewBox="0 0 120 120" className={`${deco} -z-10 -bottom-10 -left-8 w-24 sm:w-28 fill-none stroke-pine stroke-[3] rotate-[10deg]`}>
        <rect x="6" y="6" width="108" height="108" />
        <rect x="26" y="26" width="68" height="68" />
      </svg>
      <svg aria-hidden viewBox="0 0 100 50" className={`${deco} -z-10 -bottom-12 right-10 w-20 sm:w-24 fill-ink`}>
        <path d="M0 50a50 50 0 0 1 100 0z" />
      </svg>
      <Dots className="-z-10 top-24 -left-12 hidden sm:block" cols={4} rows={5} />
      <svg aria-hidden viewBox="0 0 40 40" className={`${deco} -z-10 top-1/2 -right-6 w-7 fill-none stroke-ink stroke-[3]`}>
        <path d="M20 4v32M4 20h32" />
      </svg>
    </>
  );
}

/** Background cluster behind page headers, top right. Sits at z-index -10 inside <main>. */
export function CornerShapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden md:block overflow-hidden h-72">
      <div className="mx-auto max-w-[1120px] relative h-full">
        <svg viewBox="0 0 100 50" className={`${deco} top-0 right-24 w-32 fill-mark`}>
          <path d="M0 0a50 50 0 0 0 100 0z" />
        </svg>
        <svg viewBox="0 0 80 80" className={`${deco} top-10 right-4 w-16 fill-none stroke-pine stroke-[3]`}>
          <circle cx="40" cy="40" r="37" />
        </svg>
        <svg viewBox="0 0 60 60" className={`${deco} top-32 right-36 w-8 fill-ink`}>
          <rect width="60" height="60" />
        </svg>
        <svg viewBox="0 0 60 52" className={`${deco} top-24 right-0 w-10 fill-none stroke-ink stroke-[3]`}>
          <path d="M30 4 56 48H4z" />
        </svg>
        <Dots className="top-6 right-64" cols={5} rows={3} />
      </div>
    </div>
  );
}

const STEP_SHAPES = [
  <circle key="c" cx="30" cy="30" r="26" className="fill-mark" />,
  <rect key="s" x="6" y="6" width="48" height="48" className="fill-none stroke-pine stroke-[4]" />,
  <path key="t" d="M30 4 56 54H4z" className="fill-ink" />,
  <path key="d" d="M30 2 58 30 30 58 2 30z" className="fill-mark stroke-ink stroke-[3]" />,
];

/** A distinct geometric mark for each step of a sequence. */
export function StepShape({ n }: { n: number }) {
  return (
    <svg aria-hidden viewBox="0 0 60 60" className="size-12">
      {STEP_SHAPES[n % STEP_SHAPES.length]}
    </svg>
  );
}

/** Flat offset block behind a panel, like a second sheet of paper underneath. */
export function OffsetBlock({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative isolate ${className}`}>
      <span aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 bg-mark rounded-panel -z-10" />
      {children}
    </div>
  );
}

/** Row of small shapes, used as a divider above the footer. */
export function ShapeStrip() {
  return (
    <div aria-hidden className="no-print overflow-hidden border-t border-rule">
      <svg width="100%" height="28" className="block">
        <defs>
          <pattern id="strip" width="112" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="7" className="fill-mark" />
            <rect x="42" y="7" width="14" height="14" className="fill-none stroke-pine stroke-2" />
            <path d="M84 6 91 22H77z" className="fill-ink" />
            <path d="M104 14 111 8v12z" className="fill-ink-2/60" />
          </pattern>
        </defs>
        <rect width="100%" height="28" fill="url(#strip)" />
      </svg>
    </div>
  );
}
