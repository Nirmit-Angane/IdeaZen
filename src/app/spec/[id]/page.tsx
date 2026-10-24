import type { Metadata } from 'next';
import { SavedSpec } from './saved-spec';

export const metadata: Metadata = { title: 'Your project plan', robots: { index: false, follow: false } };

export default function Page() {
  return <SavedSpec />;
}
