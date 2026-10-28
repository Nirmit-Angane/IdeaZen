'use client';
import { useEffect } from 'react';

// Elements that fade up once as they enter the viewport. The hiding itself is pure CSS (see globals.css, keyed on
// `.js` on <html>), so there is no flash of visible content and crawlers/no-JS visitors still get everything.
// This component only adds `.in` when an element scrolls into view. Keep this list in sync with the CSS.
const TARGETS = 'main .page-enter > section:not(:first-child), main article > section, main li.border-b, main [data-reveal]';

export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.remove('js');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (el.classList.contains('in')) return;
        if (!el.style.getPropertyValue('--d')) {
          // stagger siblings in the same list, capped so long lists do not drag
          const idx = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
          el.style.setProperty('--d', `${Math.min(idx, 5) * 60}ms`);
        }
        io.observe(el); // observing the same element twice is harmless, so React's dev double-run cannot lose elements
      });
    };

    scan();
    const main = document.getElementById('main');
    const mo = new MutationObserver(scan); // pages that load content after a fetch, and every client navigation
    if (main) mo.observe(main, { childList: true, subtree: true });
    root.dataset.rv = 'ready'; // tells the fail-safe timer in layout.tsx that this script is running

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
