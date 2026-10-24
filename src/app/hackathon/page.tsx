import type { Metadata } from 'next';
import { HackathonForm } from './form';
import { JsonLd } from '@/components/json-ld';
import { abs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Hackathon planner: hour-by-hour plan for 24 to 72 hours',
  description:
    'Tell us your idea, team and deadline. Get an hour-by-hour build plan with scope cuts, risks, a submission checklist and a demo script.',
  alternates: { canonical: '/hackathon' },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
            { '@type': 'ListItem', position: 2, name: 'Hackathon planner', item: abs('/hackathon') },
          ],
        }}
      />
      <HackathonForm />
    </>
  );
}
