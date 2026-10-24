import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { Crumbs, IdeaRow } from '@/components/idea-parts';
import { JsonLd } from '@/components/json-ld';
import { IDEAS, LEVELS, STACKS, comboPages, stackPages, type Level } from '@/content/ideas';
import { abs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Project ideas with build plans',
  description: `${IDEAS.length} developer project ideas for beginners, intermediate and advanced levels. Each has features, a phased roadmap, pitfalls and the skills you will practise.`,
  alternates: { canonical: '/ideas' },
};

export default function Page() {
  const levels = Object.keys(LEVELS) as Level[];
  const combos = comboPages();
  return (
    <Container className="py-14">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: IDEAS.map((i, n) => ({ '@type': 'ListItem', position: n + 1, url: abs(`/ideas/${i.slug}`), name: i.title })),
        }}
      />
      <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Ideas' }]} />
      <h1 className="text-3xl sm:text-5xl max-w-3xl">Project ideas with build plans</h1>
      <p className="mt-4 text-ink-2 prose-spec">
        Each idea lists the features, a roadmap in phases, the mistakes people usually make, and the skills you will practise. Want one fitted to your own stack and time? <Link href="/generate">Generate a custom project</Link>.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-8 text-[0.95rem]">
        <div>
          <h2 className="text-base font-semibold mb-2">By stack</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {stackPages().map((s) => <li key={s}><Link href={`/project-ideas/${s}`}>{STACKS[s].name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold mb-2">By stack and level</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {combos.map((c) => <li key={c.stack + c.level}><Link href={`/project-ideas/${c.stack}/${c.level}`}>{STACKS[c.stack].name}, {c.level}</Link></li>)}
          </ul>
        </div>
      </div>

      {levels.map((l) => (
        <section key={l} className="mt-12" aria-labelledby={`h-${l}`}>
          <h2 id={`h-${l}`} className="text-2xl">For {LEVELS[l].name.toLowerCase()}</h2>
          <p className="text-ink-2 mt-1">{LEVELS[l].blurb}</p>
          <ul className="mt-4 border-t border-rule">{IDEAS.filter((i) => i.level === l).map((i) => <IdeaRow key={i.slug} idea={i} />)}</ul>
        </section>
      ))}
    </Container>
  );
}
