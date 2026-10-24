'use client';
import { SunMoon } from 'lucide-react';

// The initial theme is applied before paint by the inline script in layout.tsx.
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('ideazen:theme', next); } catch { /* private mode */ }
  };
  return (
    <button onClick={toggle} aria-label="Toggle dark mode" className="min-h-11 min-w-11 grid place-items-center text-ink-2 hover:text-ink cursor-pointer">
      <SunMoon size={18} aria-hidden />
    </button>
  );
}
