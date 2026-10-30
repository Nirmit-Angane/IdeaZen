import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink, Container, Mark, Tag } from '@/components/ui';
import { FaqList } from '@/components/faq-list';
import { IdeaRow } from '@/components/idea-parts';
import { KitThumb } from '@/components/kit-thumb';
import { HeroShapes, OffsetBlock, StepShape } from '@/components/shapes';
import { IDEAS } from '@/content/ideas';
import { KITS } from '@/content/kits';
import { GUIDES } from '@/content/guides';
import { LEVELS } from '@/lib/wizard';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const FEATURED =['habit-tracker-with-streaks', 'recipe-finder-with-public-api', 'realtime-polling-app', 'api-rate-limiter-service', 'background-job-queue']
  .map((s) => IDEAS.find((i) => i.slug === s)!)
  .filter(Boolean);

/** Static sample plan. Lines fade in one after another with CSS only, so the HTML is complete for crawlers. */
function LiveSpec() {
  const rows: React.ReactNode[] = [
    <p key="t" className="text-2xl font-bold tracking-tight">Habit tracker with streaks</p>,
    <p key="tag" className="text-[0.95rem]"><Mark>A daily check-in app where the streak maths is correct.</Mark></p>,
    <div key="m" className="flex flex-wrap gap-2"><Tag>Beginner</Tag><Tag>1 to 2 weeks</Tag><Tag tone="pine">React</Tag><Tag tone="pine">TypeScript</Tag></div>,
    <p key="h1" className="font-mono text-[0.8rem] text-ink-2 pt-2">roadmap</p>,
    <p key="p1" className="font-mono text-[0.85rem]"><span className="text-ink-2">p1 </span>Data model and state</p>,
    <p key="t1" className="text-[0.9rem] pl-6">Write a pure function that computes the current streak from a list of dates</p>,
    <p key="p2" className="font-mono text-[0.85rem]"><span className="text-ink-2">p2 </span>Core UI</p>,
    <p key="t2" className="text-[0.9rem] pl-6">Habit list with a one-tap check-in button</p>,
    <p key="p3" className="font-mono text-[0.85rem]"><span className="text-ink-2">p3 </span>Streaks and history</p>,
    <p key="h2" className="font-mono text-[0.8rem] text-ink-2 pt-2">first commit</p>,
    <p key="c" className="font-mono text-[0.85rem] bg-ink text-paper rounded-input px-3 py-2"><span className="opacity-60">$ </span>npm create vite@latest habits -- --template react-ts</p>,
  ];
  return (
    <div className="bg-sheet border border-rule rounded-panel p-5 sm:p-6 space-y-2.5" aria-label="Example project plan">
      {rows.map((r, i) => (
        <div key={i} className="spec-line" style={{ ['--i' as string]: i }}>{r}</div>
      ))}
      <style>{`.spec-line{animation:specIn .4s ease-out both;animation-delay:calc(var(--i)*110ms)}@keyframes specIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

const STEPS = [
  ['Answer a few questions', 'Skill level, interests, stack and time. One question per screen; the answers stay in the page address.'],
  ['Pick one of three ideas', 'Each comes with a match score, difficulty and the features it would include.'],
  ['Get the full plan', 'Features, tech stack, a roadmap in phases with concrete tasks, pitfalls, and the commands for your first commit.'],
  ['Track it', 'Tick off tasks, mark it building or shipped, download it as Markdown or share a link.'],
];

export default function Home() {
  return (
    <>
      <section className="relative isolate bg-paper grid-paper border-b border-rule overflow-x-clip">
        <Container className="py-14 sm:py-20 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <div>
            <h1 className="text-[2.6rem] sm:text-6xl lg:text-[3.2rem] xl:text-[3.5rem] leading-[1.05]">
              Get a project plan you can <span className="mark whitespace-nowrap">start today</span>
            </h1>
            <p className="mt-6 text-lg text-ink-2 max-w-[48ch]">
              Tell IdeaZen your level, stack and time. It writes the features, the roadmap and your first commit, then helps you track the build.
            </p>
            <div className="mt-8">
              <p className="font-semibold mb-3">Start with your level</p>
              <ul className="grid gap-2 max-w-md">
                {LEVELS.map((l) => (
                  <li key={l.value}>
                    <Link
                      href={`/generate?level=${l.value}&q=0`}
                      className="flex items-baseline justify-between gap-4 min-h-12 px-4 py-2 border border-rule bg-sheet rounded-input no-underline hover:border-ink"
                    >
                      <span className="font-semibold">{l.label}</span>
                      <span className="text-[0.85rem] text-ink-2 text-right">{l.hint.split('.')[0]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-2">
                Free. No account. Or <Link href="/hackathon">plan a hackathon</Link>.
              </p>
            </div>
          </div>
          <div className="relative isolate lg:mt-6 lg:mr-6">
            <HeroShapes />
            <LiveSpec />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl">Plans you can read right now</h2>
              <p className="mt-2 text-ink-2 max-w-[56ch]">A hand-written library, from a first React app to a Postgres-backed job queue.</p>
            </div>
            <Link href="/ideas" className="font-semibold">All {IDEAS.length} ideas</Link>
          </div>
          <ul className="mt-6 border-t border-rule">{FEATURED.map((i) => <IdeaRow key={i.slug} idea={i} />)}</ul>
        </Container>
      </section>

      <section className="py-16 bg-sheet border-y border-rule">
        <Container>
          <h2 className="text-3xl">How it works</h2>
          <ol className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map(([t, d], i) => (
              <li key={t}>
                <StepShape n={i} />
                <h3 className="text-xl mt-4">{t}</h3>
                <p className="mt-2 text-ink-2 text-[0.95rem]">{d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl">Stop your AI app looking like every other AI app</h2>
              <p className="mt-2 text-ink-2 max-w-[60ch]">Pick a design kit, copy its DESIGN.md, and give it to Claude Code, Cursor, Lovable or v0. Exact colours, fonts and component rules, so the result has a point of view.</p>
            </div>
            <Link href="/design" className="font-semibold">See all kits</Link>
          </div>
          <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {KITS.map((k) => (
              <li key={k.slug} data-reveal>
                <Link href={`/design/${k.slug}`} className="block no-underline transition-transform hover:-translate-y-1" aria-label={`${k.name}: open design kit`}>
                  <KitThumb kit={k} />
                </Link>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-xl"><Link href={`/design/${k.slug}`} className="no-underline">{k.name}</Link></h3>
                  <span className="text-[0.85rem] text-ink-2">{k.category}</span>
                </div>
                <p className="text-[0.95rem] text-ink-2">{k.tagline}</p>
              </li>
            ))}
          </ul>        </Container>
      </section>

      <section className="py-16">
        <Container className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl">Hackathon in 24 to 72 hours?</h2>
            <p className="mt-4 text-ink-2 prose-spec">
              Enter the idea, your team, the skills you have and what you must submit. You get a task list per block of hours, the scope to cut first if you fall behind, the risks to watch, and a demo script.
            </p>
            <div className="mt-6"><ButtonLink href="/hackathon">Plan my hackathon</ButtonLink></div>
          </div>
          <OffsetBlock className="max-w-md md:ml-auto w-full"><div className="border border-ink rounded-panel bg-sheet p-5 font-mono text-[0.85rem] space-y-1">
            <p><span className="text-ink-2">hr 0-3 </span>Scope and skeleton</p>
            <p><span className="text-ink-2">hr 3-12 </span>Core flow end to end</p>
            <p><span className="text-ink-2">hr 12-30 </span>Depth and integrations</p>
            <p><span className="text-ink-2">hr 30-36 </span>Feature freeze</p>
            <p><span className="text-ink-2">hr 36-48 </span>Polish, deploy, demo</p>
          </div></OffsetBlock>
        </Container>
      </section>

      <section className="py-16 border-t border-rule">
        <Container className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl">Guides</h2>
            <ul className="mt-6 border-t border-rule">
              {GUIDES.map((g) => (
                <li key={g.slug} className="border-b border-rule">
                  <Link href={`/guides/${g.slug}`} className="block py-4 no-underline hover:bg-sheet px-2 -mx-2 font-semibold">{g.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl mb-6">Questions</h2>
            <FaqList limit={5} schema={false} />
            <p className="mt-4 text-sm"><Link href="/faq">All questions</Link></p>
          </div>
        </Container>
      </section>
    </>
  );
}
