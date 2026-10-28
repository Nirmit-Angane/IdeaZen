import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink, Container, Mark, Tag } from '@/components/ui';
import { Crumbs } from '@/components/idea-parts';
import { JsonLd } from '@/components/json-ld';
import { KitActions } from '@/components/kit-actions';
import { KitPreview, KitStates } from '@/components/kit-preview';
import { KITS, getKit } from '@/content/kits';
import { kitToMarkdown } from '@/lib/ai-pack';
import { SITE_NAME, abs } from '@/lib/site';

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => KITS.map((k) => ({ slug: k.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const k = getKit((await params).slug);
  if (!k) return {};
  return {
    title: `${k.name} design kit: DESIGN.md for ${k.bestFor[0].toLowerCase()}`,
    description: `${k.tagline} Live preview, exact colours, fonts and component rules, plus a DESIGN.md to copy into Claude Code, Cursor, Lovable or v0.`,
    alternates: { canonical: `/design/${k.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const k = getKit((await params).slug);
  if (!k) notFound();
  const md = kitToMarkdown(k);
  const t = k.tokens;
  const swatches: [string, string][] = [
    ['bg', t.bg], ['surface', t.surface], ['ink', t.ink], ['muted', t.muted], ['line', t.line], ['control', t.control], ['danger', t.danger], ['accent', t.accent],
    ...(t.accent2 ? ([['accent-2', t.accent2]] as [string, string][]) : []),
  ];
  const others = KITS.filter((o) => o.slug !== k.slug);

  return (
    <Container className="py-14">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article', headline: `${k.name} design kit`, description: k.tagline, mainEntityOfPage: abs(`/design/${k.slug}`),
              author: { '@type': 'Organization', name: SITE_NAME }, publisher: { '@type': 'Organization', name: SITE_NAME },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
                { '@type': 'ListItem', position: 2, name: 'Design kits', item: abs('/design') },
                { '@type': 'ListItem', position: 3, name: k.name, item: abs(`/design/${k.slug}`) },
              ],
            },
          ],
        }}
      />
      <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Design kits', href: '/design' }, { name: k.name }]} />
      <div className="flex flex-wrap items-baseline gap-3">
        <h1 className="text-4xl sm:text-5xl">{k.name}</h1>
        <Tag>{k.category}</Tag>
        {k.dark && <Tag>Dark</Tag>}
      </div>
      <p className="mt-4 text-xl max-w-[56ch]"><Mark>{k.tagline}</Mark></p>
      <p className="mt-3 text-ink-2">Best for: {k.bestFor.join(', ')}.</p>
      <div className="mt-6"><KitActions markdown={md} /></div>

      <div className="mt-10"><KitPreview kit={k} /></div>

      <section className="mt-12" data-reveal>
        <h2 className="text-2xl">States</h2>
        <p className="text-ink-2 mt-1 mb-4 max-w-[62ch]">Every control is specified in every state, not just the default. Input borders use a 3:1 contrast colour so they stay visible.</p>
        <KitStates kit={k} />
      </section>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <section data-reveal>
          <h2 className="text-2xl">Colours</h2>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {swatches.map(([name, hex]) => (
              <li key={name} className="border border-rule rounded-input overflow-hidden bg-sheet">
                <span className="block h-14" style={{ background: hex }} />
                <span className="block p-2 text-[0.85rem]"><strong>{name}</strong><span className="block font-mono text-ink-2">{hex}</span></span>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl mt-10">Type</h2>
          <ul className="mt-3 space-y-1">
            <li><strong>Headings:</strong> {k.fonts.display}</li>
            <li><strong>Body:</strong> {k.fonts.body}</li>
            <li><strong>Mono:</strong> {k.fonts.mono}</li>
          </ul>
          <p className="mt-3 text-ink-2 text-[0.95rem]">{k.density}</p>
        </section>
        <section data-reveal>
          <h2 className="text-2xl">Principles</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2">{k.principles.map((p) => <li key={p}>{p}</li>)}</ul>
          <h2 className="text-2xl mt-10">Avoid</h2>
          <ul className="mt-3 space-y-2">{k.avoid.map((a) => <li key={a} className="border-l-4 border-redpen pl-3">{a}</li>)}</ul>
        </section>
      </div>

      <section className="mt-14" data-reveal>
        <h2 className="text-2xl">Components</h2>
        <dl className="mt-4 divide-y divide-rule border-y border-rule">
          {Object.entries(k.components).map(([n, d]) => (
            <div key={n} className="py-3 grid sm:grid-cols-[9rem_1fr] gap-1 sm:gap-6">
              <dt className="font-semibold">{n}</dt>
              <dd className="text-ink-2">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14" data-reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl">The DESIGN.md file</h2>
            <p className="text-ink-2 mt-1 max-w-[62ch]">Put this in your project (for example <code className="font-mono text-[0.9em]">docs/DESIGN.md</code>) and tell your AI tool: &quot;Follow docs/DESIGN.md for all UI.&quot; Or paste it into a chat builder along with your project description.</p>
          </div>
          <KitActions markdown={md} />
        </div>
        <pre className="mt-5 bg-ink text-paper rounded-panel p-4 font-mono text-[0.8rem] leading-relaxed overflow-auto max-h-[28rem] whitespace-pre-wrap" tabIndex={0} aria-label="DESIGN.md contents">{md}</pre>
      </section>

      <aside className="mt-14 border border-rule bg-sheet rounded-panel p-6">
        <h2 className="text-xl">Want the whole project pack?</h2>
        <p className="mt-2 text-ink-2">Generate a plan for your idea and pick {k.name} under &quot;Build it with AI&quot;. You get the brief, stack, this design file and instructions for your AI tool in one download.</p>
        <div className="mt-4"><ButtonLink href="/generate">Generate a project plan</ButtonLink></div>
      </aside>

      <section className="mt-14">
        <h2 className="text-2xl">More kits</h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {others.map((o) => <li key={o.slug}><Link href={`/design/${o.slug}`} className="font-semibold">{o.name}</Link><span className="text-ink-2"> · {o.category}</span></li>)}
        </ul>
      </section>
    </Container>
  );
}
