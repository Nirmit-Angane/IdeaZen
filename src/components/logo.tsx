import { SITE_NAME } from '@/lib/site';

/** Route Z: the Z of IdeaZen as a git branch path that ends in a yellow "shipped" dot. Colours follow the theme tokens. */
export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <rect width="64" height="64" rx="12" className="fill-ink" />
      <path d="M17 18H47L17 46H47" fill="none" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" className="stroke-paper" />
      {[[17, 18], [47, 18], [17, 46]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="5.5" strokeWidth="3.5" className="fill-ink stroke-paper" />
      ))}
      <circle cx="47" cy="46" r="7" className="fill-mark" />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="font-bold text-lg tracking-tight">{SITE_NAME}</span>
    </span>
  );
}
