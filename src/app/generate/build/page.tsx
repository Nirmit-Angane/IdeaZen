import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Build } from './build';

export const metadata: Metadata = { title: 'Writing your plan', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <Suspense>
      <Build />
    </Suspense>
  );
}
