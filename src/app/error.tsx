'use client';
import { Button, ButtonLink, Container } from '@/components/ui';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="py-24 max-w-xl">
      <h1 className="text-4xl">Something broke</h1>
      <p className="mt-3 text-ink-2">This page failed to load. Your saved plans are not affected.</p>
      <div className="mt-6 flex gap-3 flex-wrap">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="secondary">Go home</ButtonLink>
      </div>
    </Container>
  );
}
