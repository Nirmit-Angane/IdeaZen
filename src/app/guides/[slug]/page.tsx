import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ButtonLink, Container, Mark } from '@/components/ui';
import { Crumbs } from '@/components/idea-parts';
import { JsonLd } from '@/components/json-ld';
import { GUIDES, getGuide } from '@/content/guides';
import { SITE_NAME, abs } from '@/lib/site';

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return { title: g.title, description: g.description, alternates: { canonical: `/guides/${g.slug}` } };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  return (
    <Container className="py-14">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article', headline: g.title, description: g.description, mainEntityOfPage: abs(`/guides/${g.slug}`),
              author: { '@type': 'Organization', name: SITE_NAME }, publisher: { '@type': 'Organization', name: SITE_NAME },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
                { '@type': 'ListItem', position: 2, name: 'Guides', item: abs('/guides') },
                { '@type': 'ListItem', position: 3, name: g.title, item: abs(`/guides/${g.slug}`) },
              ],
            },
          ],
        }}
      />
      <article className="max-w-3xl">
        <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Guides', href: '/guides' }, { name: g.title }]} />
        <h1 className="text-4xl sm:text-5xl">{g.title}</h1>
        <p className="mt-6 text-xl"><Mark>{g.answer}</Mark></p>
        {g.sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-2xl">{s.h}</h2>
            {s.p?.map((t) => <p key={t} className="mt-3 prose-spec">{t}</p>)}
            {s.ul && <ul className="mt-3 list-disc pl-5 space-y-1 prose-spec">{s.ul.map((t) => <li key={t}>{t}</li>)}</ul>}
            {s.ol && <ol className="mt-3 list-decimal pl-5 space-y-1 prose-spec">{s.ol.map((t) => <li key={t}>{t}</li>)}</ol>}
          </section>
        ))}
        <aside className="mt-14 border border-rule bg-sheet rounded-panel p-6">
          <h2 className="text-xl">Put it into practice</h2>
          <p className="mt-2 text-ink-2">Get a project plan written for your level, stack and available time.</p>
          <div className="mt-4"><ButtonLink href="/generate">Generate a project</ButtonLink></div>
        </aside>
      </article>
    </Container>
  );
}
