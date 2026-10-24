'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, ButtonLink, Container, Notice } from './ui';

/** Honest progress: no fake percentages, just elapsed time and a clear error path. */
export function Generating({
  title, error, onRetry, backHref, backLabel,
}: { title: string; error: string | null; onRetry: () => void; backHref: string; backLabel: string }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (error) return;
    setSecs(0);
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [error]);

  return (
    <Container className="py-20 max-w-2xl">
      <h1 className="text-3xl sm:text-4xl">{error ? 'That did not work' : title}</h1>
      {error ? (
        <div className="mt-6 space-y-5">
          <Notice tone="error">{error}</Notice>
          <p className="text-ink-2">Your answers are saved in the page address. Retrying uses the same answers.</p>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={onRetry}>Try again</Button>
            <ButtonLink href={backHref} variant="secondary">{backLabel}</ButtonLink>
          </div>
        </div>
      ) : (
        <div className="mt-6" role="status" aria-live="polite">
          <p className="text-ink-2">
            This usually takes 10 to 30 seconds. <span className="font-mono">{secs}s</span>
          </p>
          <div className="mt-6 h-1 bg-rule overflow-hidden rounded-input" aria-hidden>
            <div className="h-full w-1/3 bg-mark animate-[slide_1.4s_ease-in-out_infinite]" />
          </div>
          <p className="mt-8 text-sm text-ink-2">
            Taking long? <Link href={backHref}>{backLabel}</Link>
          </p>
        </div>
      )}
      <style>{`@keyframes slide{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
    </Container>
  );
}
