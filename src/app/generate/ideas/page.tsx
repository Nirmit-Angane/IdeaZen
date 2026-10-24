import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Ideas } from './ideas';

export const metadata: Metadata = { title: 'Pick a project', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <Suspense>
      <Ideas />
    </Suspense>
  );
}
