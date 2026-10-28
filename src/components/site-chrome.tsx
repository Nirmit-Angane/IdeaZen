import Link from 'next/link';
import { Container } from './ui';
import { ThemeToggle } from './theme-toggle';
import { ShapeStrip } from './shapes';
import { Logo } from './logo';
import { SITE_NAME } from '@/lib/site';

const NAV = [
  { href: '/generate', label: 'Generate' },
  { href: '/hackathon', label: 'Hackathon' },
  { href: '/design', label: 'Design' },
  { href: '/ideas', label: 'Ideas' },
  { href: '/guides', label: 'Guides' },
  { href: '/saved', label: 'Saved' },
];

export function SiteHeader() {
  return (
    <header className="no-print border-b border-rule bg-paper/95 sticky top-0 z-20 backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-4 min-h-14 py-2 flex-wrap">
        <Link href="/" aria-label="IdeaZen home" className="no-underline">
          <Logo />
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="px-2 sm:px-3 py-2 text-[0.95rem] text-ink-2 hover:text-ink no-underline">
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <div className="mt-24">
    <ShapeStrip />
    <footer className="no-print border-t border-rule">
      <Container className="py-10 grid gap-8 sm:grid-cols-[1.4fr_1fr_1fr] text-[0.95rem]">
        <div>
          <Logo />
          <p className="text-ink-2 mt-2 max-w-[38ch]">
            Free project specs for developers. No account. Your saved ideas stay in your browser.
          </p>
        </div>
        <nav aria-label="Product" className="flex flex-col gap-2">
          <Link href="/generate">Generate a project</Link>
          <Link href="/hackathon">Hackathon planner</Link>
          <Link href="/ideas">Project idea library</Link>
          <Link href="/design">Design kits</Link>
          <Link href="/guides">Guides</Link>
        </nav>
        <nav aria-label="About" className="flex flex-col gap-2">
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </Container>
    </footer>
    </div>
  );
}
