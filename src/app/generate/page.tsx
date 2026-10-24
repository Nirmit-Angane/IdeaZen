import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Wizard } from './wizard';

export const metadata: Metadata = {
  title: 'Generate a project spec',
  description: 'Answer a few questions about your skill level, stack and time. Get three project ideas, then a full build plan.',
  alternates: { canonical: '/generate' },
};

export default function Page() {
  return (
    <Suspense>
      <Wizard />
    </Suspense>
  );
}
