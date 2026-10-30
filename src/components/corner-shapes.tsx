'use client';
import { usePathname } from 'next/navigation';
import { Dots, deco } from './shapes';

// Only index-style pages, where the right side of the header is empty. Never on wizards, plans or forms,
// where decoration would sit on top of controls.
const SHOW_ON = new Set(['/ideas', '/design', '/guides', '/faq', '/about', '/privacy', '/saved', '/hackathon']);

/** Background cluster behind page headers, top right. Sits at z-index -10 inside <main>. */
export function CornerShapes() {
  if (!SHOW_ON.has(usePathname())) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden lg:block overflow-hidden h-72">
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
