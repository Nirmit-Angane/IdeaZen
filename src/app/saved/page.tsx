import type { Metadata } from 'next';
import { Saved } from './saved';

export const metadata: Metadata = { title: 'Saved ideas', robots: { index: false, follow: true }, alternates: { canonical: '/saved' } };

export default function Page() {
  return <Saved />;
}
