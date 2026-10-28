'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export const NAV = [
  { href: '/generate', label: 'Generate' },
  { href: '/hackathon', label: 'Hackathon' },
  { href: '/design', label: 'Design' },
  { href: '/ideas', label: 'Ideas' },
  { href: '/guides', label: 'Guides' },
  { href: '/saved', label: 'Saved' },
];

const isActive = (path: string, href: string) => path === href || path.startsWith(href + '/');

/** Desktop links with the current section marked by the highlighter underline. */
export function DesktopNav() {
  const path = usePathname();
  return (
    <nav aria-label="Main" className="hidden md:flex items-center gap-1">
      {NAV.map((n) => {
        const active = isActive(path, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? 'page' : undefined}
            className={`relative px-3 py-2 text-[0.95rem] no-underline ${active ? 'text-ink font-semibold' : 'text-ink-2 hover:text-ink'}`}
          >
            {n.label}
            {active && <span aria-hidden className="absolute left-3 right-3 -bottom-px h-[3px] bg-mark" />}
          </Link>
        );
      })}
      <ThemeToggle />
    </nav>
  );
}

/** Phone menu: a button that opens a full-width panel. Closes on navigation and on Escape. */
export function MobileNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="md:hidden flex items-center">
      <ThemeToggle />
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="min-h-11 min-w-11 grid place-items-center cursor-pointer"
      >
        {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
      </button>
      {open && (
        <nav id="mobile-menu" aria-label="Main" className="absolute left-0 right-0 top-full bg-paper border-b border-rule shadow-[0_12px_24px_-12px_rgba(0,0,0,0.25)]">
          <ul className="px-4 py-2">
            {NAV.map((n) => {
              const active = isActive(path, n.href);
              return (
                <li key={n.href} className="border-b border-rule last:border-0">
                  <Link
                    href={n.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between min-h-12 no-underline text-lg ${active ? 'font-semibold' : 'text-ink-2'}`}
                  >
                    {n.label}
                    {active && <span aria-hidden className="size-2.5 rounded-full bg-mark border border-ink" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
