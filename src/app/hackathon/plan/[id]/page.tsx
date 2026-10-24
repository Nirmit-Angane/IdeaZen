import type { Metadata } from 'next';
import { SavedPlan } from './saved-plan';

export const metadata: Metadata = { title: 'Your hackathon plan', robots: { index: false, follow: false } };

export default function Page() {
  return <SavedPlan />;
}
