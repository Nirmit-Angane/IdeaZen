import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ButtonLink, Container } from '@/components/ui';
import { Crumbs, IdeaRow } from '@/components/idea-parts';
import { JsonLd } from '@/components/json-ld';
import { LEVELS, STACKS, comboPages, ideasFor, type Level } from '@/content/ideas';
import { abs } from '@/lib/site';

type Params = { stack: string; level: string };

export const dynamicParams = false;
export const generateStaticParams = () => comboPages();

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { stack, level } = await params;
  const s = STACKS[stack];
  const l = LEVELS[level as Level];
  if (!s || !l) return {};
  return {
    title: `${s.name} project ideas for ${l.name.toLowerCase()}`,
    description: `${ideasFor(stack, level as Level).length} ${s.name} project ideas for ${l.name.toLowerCase()}, with features, a phased roadmap and common pitfalls.`,
    alternates: { canonical: `/project-ideas/${stack}/${level}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { stack, level } = await params;
  const s = STACKS[stack];
  const l = LEVELS[level as Level];
  if (!s || !l || !comboPages().some((c) => c.stack === stack && c.level === level)) notFound();
  const ideas = ideasFor(stack, level as Level);

  return (
    <Container className="py-14">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${s.name} project ideas for ${l.name.toLowerCase()}`,
          itemListElement: ideas.map((i, n) => ({ '@type': 'ListItem', position: n + 1, url: abs(`/ideas/${i.slug}`), name: i.title })),
        }}
      />
      <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Ideas', href: '/ideas' }, { name: s.name, href: `/project-ideas/${stack}` }, { name: l.name }]} />
      <h1 className="text-3xl sm:text-5xl max-w-3xl">{s.name} project ideas for {l.name.toLowerCase()}</h1>
      <p className="mt-4 text-ink-2 prose-spec">{l.blurb} {ideas.length} {s.name} projects at this level:</p>
      <ul className="mt-8 border-t border-rule">{ideas.map((i) => <IdeaRow key={i.slug} idea={i} />)}</ul>
      <div className="mt-12"><ButtonLink href={`/generate?level=${level}&q=0`}>Generate one for my stack and time</ButtonLink></div>
    </Container>
  );
}
