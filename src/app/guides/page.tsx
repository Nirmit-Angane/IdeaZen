import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { Crumbs } from '@/components/idea-parts';
import { GUIDES } from '@/content/guides';

export const metadata: Metadata = {
  title: 'Guides for choosing and finishing projects',
  description: 'Short, practical guides on picking a portfolio project, planning a hackathon, and estimating how long a project will take.',
  alternates: { canonical: '/guides' },
};

export default function Page() {
  return (
    <Container className="py-14">
      <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Guides' }]} />
      <h1 className="text-3xl sm:text-5xl">Guides</h1>
      <ul className="mt-8 border-t border-rule max-w-3xl">
        {GUIDES.map((g) => (
          <li key={g.slug} className="border-b border-rule">
            <Link href={`/guides/${g.slug}`} className="block py-5 no-underline hover:bg-sheet px-2 -mx-2">
              <span className="block text-xl font-semibold">{g.title}</span>
              <span className="block text-ink-2 text-[0.95rem]">{g.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
