import type { Metadata } from 'next';
import { Shared } from './shared';

export const metadata: Metadata = { title: 'Shared plan', robots: { index: false, follow: false } };

export default function Page() {
  return <Shared />;
}
