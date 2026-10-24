import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink, Container } from '@/components/ui';
import { Crumbs, IdeaRow } from '@/components/idea-parts';
import { JsonLd } from '@/components/json-ld';
import { LEVELS, STACKS, comboPages, ideasFor, stackPages, type Level } from '@/content/ideas';
import { abs } from '@/lib/site';

type Params = { stack: string };

export const dynamicParams = false;
export const generateStaticParams = () => stackPages().map((stack) => ({ stack }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { stack } = await params;
  const s = STACKS[stack];
  if (!s) return {};
  return {
    title: `${s.name} project ideas with build plans`,
    description: `${ideasFor(stack).length} ${s.name} project ideas from beginner to advanced. Each has features, a phased roadmap and common pitfalls.`,
    alternates: { canonical: `/project-ideas/${stack}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { stack } = await params;
  const s = STACKS[stack];
  if (!s || !stackPages().includes(stack)) notFound();
  const ideas = ideasFor(stack);
  const levelLinks = comboPages().filter((c) => c.stack === stack);

  return (
    <Container className="py-14">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${s.name} project ideas`,
          itemListElement: ideas.map((i, n) => ({ '@type': 'ListItem', position: n + 1, url: abs(`/ideas/${i.slug}`), name: i.title })),
        }}
      />
      <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Ideas', href: '/ideas' }, { name: s.name }]} />
      <h1 className="text-3xl sm:text-5xl max-w-3xl">{s.name} project ideas with build plans</h1>
      <p className="mt-4 text-ink-2 prose-spec">
        {s.blurb} Below are {ideas.length} {s.name} projects, each with features, a roadmap split into phases, and the mistakes that usually cost people time.
      </p>
      {levelLinks.length > 0 && (
        <p className="mt-4 text-[0.95rem]">
          Filter by level:{' '}
          {levelLinks.map((c, i) => (
            <span key={c.level}>{i > 0 && ' · '}<Link href={`/project-ideas/${stack}/${c.level}`}>{LEVELS[c.level as Level].name}</Link></span>
          ))}
        </p>
      )}
      <ul className="mt-8 border-t border-rule">{ideas.map((i) => <IdeaRow key={i.slug} idea={i} />)}</ul>
      <div className="mt-12"><ButtonLink href="/generate">Get a project fitted to you</ButtonLink></div>
    </Container>
  );
}
