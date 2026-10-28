import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink, Container, Tag } from '@/components/ui';
import { Crumbs } from '@/components/idea-parts';
import { JsonLd } from '@/components/json-ld';
import { KitPreview } from '@/components/kit-preview';
import { KITS, type KitCategory } from '@/content/kits';
import { abs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Design kits for AI-built apps: copy a DESIGN.md',
  description:
    'Original design systems with exact colours, fonts and component rules. Preview one, copy its DESIGN.md, and give it to your AI coding tool so your app does not look like every other AI-generated site.',
  alternates: { canonical: '/design' },
};

const CATS: KitCategory[] = ['Web app', 'Landing page'];

export default function Page() {
  return (
    <Container className="py-14">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'IdeaZen design kits',
          itemListElement: KITS.map((k, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/design/${k.slug}`), name: `${k.name}: ${k.tagline}` })),
        }}
      />
      <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Design kits' }]} />
      <h1 className="text-3xl sm:text-5xl max-w-3xl">Design kits you can hand to your AI</h1>
      <p className="mt-4 text-ink-2 prose-spec">
        AI coding tools fall back on the same look when you give them no design rules: purple gradients, identical rounded cards, emoji icons. Each kit below is an original design with exact colours, fonts and component rules, written as a <code className="font-mono text-[0.9em]">DESIGN.md</code> file. Preview one, copy the file, and put it in your project.
      </p>

      {CATS.map((c) => (
        <section key={c} className="mt-14" aria-labelledby={`c-${c}`}>
          <h2 id={`c-${c}`} className="text-2xl">{c === 'Web app' ? 'Web apps' : 'Landing pages'}</h2>
          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            {KITS.filter((k) => k.category === c).map((k) => (
              <article key={k.slug} data-reveal>
                <Link href={`/design/${k.slug}`} className="block no-underline" aria-label={`${k.name}: open design kit`}>
                  <KitPreview kit={k} compact />
                </Link>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-2xl"><Link href={`/design/${k.slug}`} className="no-underline">{k.name}</Link></h3>
                  {k.dark && <Tag>Dark</Tag>}
                </div>
                <p className="text-ink-2 mt-1">{k.tagline}</p>
                <p className="text-[0.9rem] mt-2">Best for: {k.bestFor.join(', ')}.</p>
                <div className="mt-3 flex items-center gap-1.5" aria-label="Palette">
                  {[k.tokens.bg, k.tokens.surface, k.tokens.ink, k.tokens.accent, ...(k.tokens.accent2 ? [k.tokens.accent2] : [])].map((hex, i) => (
                    <span key={hex + i} title={hex} className="size-6 rounded-input border border-rule" style={{ background: hex }} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <aside className="mt-16 border border-rule bg-sheet rounded-panel p-6 max-w-2xl">
        <h2 className="text-xl">Using one with a plan</h2>
        <p className="mt-2 text-ink-2">Generate a project plan, then open &quot;Build it with AI&quot;. Choose a kit and download the whole pack: project brief, stack, design file and AI instructions.</p>
        <div className="mt-4"><ButtonLink href="/generate">Generate a project plan</ButtonLink></div>
      </aside>
    </Container>
  );
}
