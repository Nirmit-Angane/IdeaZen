import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink, Container, Mark, Tag } from '@/components/ui';
import { Crumbs, IdeaRow } from '@/components/idea-parts';
import { JsonLd } from '@/components/json-ld';
import { IDEAS, LEVELS, STACKS, getIdea } from '@/content/ideas';
import { SITE_NAME, abs } from '@/lib/site';

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => IDEAS.map((i) => ({ slug: i.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const idea = getIdea((await params).slug);
  if (!idea) return {};
  return {
    title: `${idea.title}: build plan and roadmap`,
    description: `${idea.summary} Level: ${idea.level}. Time: ${idea.time}. Includes features, a ${idea.phases.length}-phase roadmap and common pitfalls.`,
    alternates: { canonical: `/ideas/${idea.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const idea = getIdea((await params).slug);
  if (!idea) notFound();
  const related = IDEAS.filter((i) => i.slug !== idea.slug && (i.level === idea.level || i.stacks.some((s) => idea.stacks.includes(s)))).slice(0, 3);

  return (
    <Container className="py-14">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article', headline: idea.title, description: idea.summary, mainEntityOfPage: abs(`/ideas/${idea.slug}`),
              author: { '@type': 'Organization', name: SITE_NAME }, publisher: { '@type': 'Organization', name: SITE_NAME },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
                { '@type': 'ListItem', position: 2, name: 'Ideas', item: abs('/ideas') },
                { '@type': 'ListItem', position: 3, name: idea.title, item: abs(`/ideas/${idea.slug}`) },
              ],
            },
          ],
        }}
      />
      <article className="max-w-3xl">
        <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Ideas', href: '/ideas' }, { name: idea.title }]} />
        <h1 className="text-4xl sm:text-5xl">{idea.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag>{idea.level}</Tag>
          <Tag>{idea.time}</Tag>
          {idea.stacks.map((s) => <Tag key={s} tone="pine">{STACKS[s].name}</Tag>)}
        </div>
        <p className="mt-6 text-xl"><Mark>{idea.summary}</Mark></p>

        <h2 className="text-2xl mt-12">Why build it</h2>
        <p className="mt-3 prose-spec">{idea.whyBuildIt}</p>

        <h2 className="text-2xl mt-12">Features</h2>
        <ul className="mt-3 list-disc pl-5 space-y-1">{idea.features.map((f) => <li key={f}>{f}</li>)}</ul>

        <h2 className="text-2xl mt-12">Roadmap</h2>
        <ol className="mt-5">
          {idea.phases.map((p, i) => (
            <li key={p.title} className="relative pl-8 pb-8 last:pb-0 border-l border-rule ml-2">
              <span aria-hidden className="absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-ink bg-paper" />
              <div className="flex items-baseline gap-3"><span className="font-mono text-sm text-ink-2">p{i + 1}</span><h3 className="text-xl">{p.title}</h3></div>
              <ul className="mt-2 list-disc pl-5 space-y-1">{p.tasks.map((t) => <li key={t}>{t}</li>)}</ul>
            </li>
          ))}
        </ol>

        <h2 className="text-2xl mt-12">Common pitfalls</h2>
        <ul className="mt-4 space-y-3">{idea.pitfalls.map((p) => <li key={p} className="border-l-4 border-redpen pl-4">{p}</li>)}</ul>

        <h2 className="text-2xl mt-12">Skills you will practise</h2>
        <ul className="mt-3 flex flex-wrap gap-2">{idea.skills.map((s) => <li key={s}><Tag>{s}</Tag></li>)}</ul>

        <aside className="mt-14 border border-rule bg-sheet rounded-panel p-6">
          <h2 className="text-xl">Want this fitted to your stack and time?</h2>
          <p className="mt-2 text-ink-2">Answer a few questions and get a full plan written for your level, with a first-commit guide.</p>
          <div className="mt-4"><ButtonLink href={`/generate?level=${idea.level}&q=0`}>Generate my version</ButtonLink></div>
        </aside>
      </article>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl">More ideas</h2>
          <ul className="mt-4 border-t border-rule">{related.map((i) => <IdeaRow key={i.slug} idea={i} />)}</ul>
          <p className="mt-4 text-sm"><Link href="/ideas">All {IDEAS.length} ideas</Link> · {LEVELS[idea.level].name}</p>
        </section>
      )}
    </Container>
  );
}
