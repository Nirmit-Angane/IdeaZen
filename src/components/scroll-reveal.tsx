'use client';
import { useEffect } from 'react';

// Elements that fade up once as they enter the viewport. Only hidden when JS is running (`.js` on <html>),
// so crawlers and no-JS visitors always get the full content.
const TARGETS = 'main .page-enter > section, main article > section, main li.border-b, main [data-reveal]';

export function ScrollReveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.remove('js');
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
        if (el.dataset.rv) return;
        el.dataset.rv = '1';
        // stagger siblings in the same list, capped so long lists do not drag
        const idx = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
        el.style.setProperty('--d', `${Math.min(idx, 5) * 60}ms`);
        el.classList.add('reveal');
        io.observe(el);
      });
    };

    scan();
    // pages that load content after a fetch (ideas list, saved items)
    const main = document.getElementById('main');
    const mo = new MutationObserver(scan);
    if (main) mo.observe(main, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []); // one observer for the whole session; the MutationObserver picks up each new page

  return null;
}
