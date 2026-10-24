import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

const base =
  'inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2 text-[0.95rem] font-semibold rounded-input transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
const variants = {
  primary: 'bg-mark text-on-mark hover:brightness-95 border border-transparent',
  secondary: 'border border-ink/70 text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink-2 hover:text-ink hover:bg-rule/60',
} as const;
type Variant = keyof typeof variants;

export function Button({ variant = 'primary', className = '', ...p }: ComponentProps<'button'> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...p} />;
}

export function ButtonLink({ variant = 'primary', className = '', ...p }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...p} />;
}

export function Tag({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'pine' | 'red' }) {
  const t = { plain: 'border-rule text-ink-2', pine: 'border-pine text-pine', red: 'border-redpen text-redpen' }[tone];
  return <span className={`inline-block border ${t} rounded-input px-2 py-0.5 text-[0.8rem] leading-5`}>{children}</span>;
}

export function Mark({ children }: { children: ReactNode }) {
  return <span className="mark">{children}</span>;
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1120px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

export const Panel = ({ className = '', ...p }: ComponentProps<'div'>) => (
  <div className={`bg-sheet border border-rule rounded-panel ${className}`} {...p} />
);

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'error'; children: ReactNode }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`border-l-4 ${tone === 'error' ? 'border-redpen' : 'border-pine'} bg-sheet px-4 py-3 text-[0.95rem]`}
    >
      {children}
    </div>
  );
}

export const field =
  'w-full min-h-11 bg-sheet border border-rule rounded-input px-3 py-2 text-ink placeholder:text-ink-2/70 focus-visible:border-pine';
