'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Copy, Download, Link2, Printer, Trash2 } from 'lucide-react';
import { Button, ButtonLink, Container, Mark, Notice, Panel, Tag, field } from './ui';
import { fetchBlueprint } from '@/lib/client-api';
import { download, projectToMarkdown, slugify } from '@/lib/markdown';
import { encodeShare } from '@/lib/share';
import { deleteRecord, saveRecord, setStatus, toggleTask, useStore, type Status } from '@/lib/storage';
import type { GeneratedProject, UserInputs } from '@/lib/types';

const SECTIONS = [
  ['overview', 'Overview'],
  ['features', 'Features'],
  ['stack', 'Tech stack'],
  ['roadmap', 'Roadmap'],
  ['first-commit', 'First commit'],
  ['mvp', 'MVP'],
  ['pitfalls', 'Pitfalls'],
  ['resources', 'Resources'],
] as const;

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 py-8 border-t border-rule first:border-t-0">
      <h2 className="text-2xl mb-5">{title}</h2>
      {children}
    </section>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-3 text-[0.9rem]">
      <span className="text-ink-2">{label}</span>
      <span className="h-2 bg-rule rounded-input overflow-hidden" role="img" aria-label={`${label} ${value} percent`}>
        <span className="block h-full bg-pine" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </span>
      <span className="font-mono text-right">{Math.round(value)}</span>
    </div>
  );
}

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="inline-flex items-center gap-1.5 text-[0.85rem] text-ink-2 hover:text-ink min-h-9 cursor-pointer"
      onClick={() => navigator.clipboard.writeText(text).then(() => { setDone(true); setTimeout(() => setDone(false), 1500); }).catch(() => {})}
    >
      {done ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />} {done ? 'Copied' : label}
    </button>
  );
}

interface Props {
  project: GeneratedProject;
  /** Present when the spec is saved in this browser: enables progress, refine, status and delete. */
  recordId?: string;
  inputs?: UserInputs;
  /** Shown on shared/curated copies instead of the saved-record controls. */
  onSaveCopy?: () => void;
}

export function SpecView({ project: p, recordId, inputs, onSaveCopy }: Props) {
  const router = useRouter();
  const store = useStore();
  const rec = recordId ? store?.records.find((r) => r.id === recordId) : undefined;
  const done = new Set((recordId && store?.progress[recordId]) || []);
  const total = p.roadmap.reduce((n, r) => n + r.tasks.length, 0);
  const finished = p.roadmap.reduce((n, r, i) => n + r.tasks.filter((_, j) => done.has(`p${i}t${j}`)).length, 0);
  const pct = total ? Math.round((finished / total) * 100) : 0;

  const [active, setActive] = useState('overview');
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ tone: 'info' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (hit) setActive(hit.target.id);
    }, { rootMargin: '-80px 0px -65% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const share = async () => {
    try {
      const d = await encodeShare({ k: 'project', d: p });
      await navigator.clipboard.writeText(`${location.origin}/s#d=${d}`);
      setMessage({ tone: 'info', text: 'Link copied. Anyone with it can read this plan; it is not stored on a server.' });
    } catch {
      setMessage({ tone: 'error', text: 'Could not create the link in this browser. Use Download .md instead.' });
    }
  };

  const refine = async (stretch: 'simpler' | 'more-complex') => {
    if (!inputs) return;
    setBusy(stretch);
    setMessage(null);
    try {
      const next = await fetchBlueprint(inputs, p.title, stretch);
      router.push(`/spec/${saveRecord({ kind: 'project', title: next.title, data: next, inputs })}`);
    } catch (e) {
      setMessage({ tone: 'error', text: (e as Error).message });
      setBusy(null);
    }
  };

  return (
    <Container className="py-10 grid lg:grid-cols-[210px_1fr] gap-10">
      <aside className="no-print hidden lg:block">
        <nav aria-label="Sections" className="sticky top-24">
          <ul className="space-y-1 text-[0.95rem] border-l border-rule">
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`block -ml-px pl-4 py-1 border-l-2 no-underline ${active === id ? 'border-ink font-semibold' : 'border-transparent text-ink-2 hover:text-ink'}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          {recordId && (
            <p className="mt-6 text-sm text-ink-2">
              <span className="font-mono text-ink text-lg">{pct}%</span> done
              <span className="block font-mono text-xs">{finished}/{total} tasks</span>
            </p>
          )}
        </nav>
      </aside>

      <article className="min-w-0">
        <header id="overview" className="scroll-mt-20 pb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Tag>{p.difficulty}{p.difficultyScore ? ` · ${p.difficultyScore}/10` : ''}</Tag>
            <Tag tone={p.feasibility === 'Low' ? 'red' : 'pine'}>Feasibility: {p.feasibility}</Tag>
            {p.timeFit && <Tag>Time fit: {p.timeFit}</Tag>}
          </div>
          <h1 className="text-4xl sm:text-5xl">{p.title}</h1>
          {p.tagline && <p className="mt-4 text-xl max-w-[56ch]"><Mark>{p.tagline}</Mark></p>}
          <p className="mt-5 text-ink-2 prose-spec">{p.description}</p>
          {p.realWorldComparison && <p className="mt-3 prose-spec">{p.realWorldComparison}</p>}
          {p.targetUser && <p className="mt-3 text-[0.95rem]"><strong>Built for:</strong> {p.targetUser}</p>}

          <div className="no-print mt-6 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => download(`${slugify(p.title)}.md`, projectToMarkdown(p))}><Download size={16} aria-hidden /> Download .md</Button>
            <Button variant="secondary" onClick={() => window.print()}><Printer size={16} aria-hidden /> Print or save PDF</Button>
            <Button variant="secondary" onClick={share}><Link2 size={16} aria-hidden /> Copy share link</Button>
            {onSaveCopy && <Button onClick={onSaveCopy}>Save to my ideas</Button>}
          </div>
          {message && <div className="mt-4 no-print"><Notice tone={message.tone}>{message.text}</Notice></div>}

          {p.matchBreakdown && (
            <Panel className="mt-8 p-5 max-w-lg space-y-3">
              <Meter label="Skill" value={p.matchBreakdown.skillMatch} />
              <Meter label="Stack" value={p.matchBreakdown.stackMatch} />
              <Meter label="Time" value={p.matchBreakdown.timeFit} />
              {p.matchBreakdown.explanation && <p className="text-[0.9rem] text-ink-2 pt-1">{p.matchBreakdown.explanation}</p>}
            </Panel>
          )}
        </header>

        {p.features.length > 0 && (
          <Section id="features" title="Features">
            <ul className="divide-y divide-rule border-y border-rule">
              {p.features.map((f) => (
                <li key={f.name} className="py-3 grid sm:grid-cols-[6.5rem_1fr] gap-1 sm:gap-4">
                  <span><Tag tone={f.tier === 'Core' ? 'pine' : 'plain'}>{f.tier}</Tag></span>
                  <span>
                    <strong>{f.name}</strong>
                    {f.description && <span className="block text-ink-2 text-[0.95rem]">{f.description}</span>}
                    {f.technicalNote && <span className="block font-mono text-[0.8rem] text-ink-2 mt-1">{f.technicalNote}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {(p.techStack.primary.length > 0 || p.techStack.alternative.length > 0) && (
          <Section id="stack" title="Tech stack">
            <ul className="space-y-3">
              {p.techStack.primary.map((t) => (
                <li key={t.name}><strong>{t.name}</strong>{t.role && <span className="text-ink-2"> · {t.role}</span>}{t.reason && <span className="block text-[0.95rem] text-ink-2">{t.reason}</span>}</li>
              ))}
            </ul>
            {p.techStack.alternative.length > 0 && (
              <>
                <h3 className="text-lg mt-6 mb-2">Alternatives</h3>
                <ul className="space-y-2 text-[0.95rem]">
                  {p.techStack.alternative.map((t) => (
                    <li key={t.name}><strong>{t.name}</strong>{t.whenToUse && <span className="text-ink-2"> — {t.whenToUse}</span>}</li>
                  ))}
                </ul>
              </>
            )}
          </Section>
        )}

        <Section id="roadmap" title="Roadmap">
          <ol className="relative">
            {p.roadmap.map((r, i) => {
              const phaseDone = r.tasks.filter((_, j) => done.has(`p${i}t${j}`)).length;
              return (
                <li key={i} className="relative pl-8 pb-8 last:pb-0 border-l border-rule ml-2">
                  <span aria-hidden className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-ink ${phaseDone === r.tasks.length && r.tasks.length ? 'bg-pine' : 'bg-paper'}`} />
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-mono text-sm text-ink-2">p{r.phase}</span>
                    <h3 className="text-xl">{r.title}</h3>
                    {(r.weekRange || r.duration) && <span className="font-mono text-sm text-ink-2">{r.weekRange || r.duration}</span>}
                  </div>
                  {r.description && <p className="mt-1 text-ink-2 text-[0.95rem] prose-spec">{r.description}</p>}
                  <ul className="mt-3 space-y-1">
                    {r.tasks.map((t, j) => {
                      const key = `p${i}t${j}`;
                      return (
                        <li key={key}>
                          <label className={`flex gap-3 items-start min-h-8 ${recordId ? 'cursor-pointer' : ''}`}>
                            {recordId ? (
                              <input type="checkbox" className="mt-1.5 size-4 accent-[var(--pine)]" checked={done.has(key)} onChange={() => toggleTask(recordId, key)} />
                            ) : (
                              <span aria-hidden className="mt-2.5 size-1.5 rounded-full bg-ink-2 shrink-0 ml-1" />
                            )}
                            <span className={done.has(key) ? 'line-through text-ink-2' : ''}>{t}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  {r.deliverable && <p className="mt-3 text-[0.9rem]"><strong>Deliverable:</strong> {r.deliverable}</p>}
                </li>
              );
            })}
          </ol>
        </Section>

        {p.firstCommitGuide && p.firstCommitGuide.steps.length > 0 && (
          <Section id="first-commit" title="Your first commit">
            <p className="text-ink-2 prose-spec">{p.firstCommitGuide.intro}</p>
            <div className="mt-4 bg-ink text-paper rounded-panel p-4 font-mono text-[0.85rem] overflow-x-auto">
              <div className="flex justify-end -mb-2"><span className="[&_button]:text-paper/70 [&_button:hover]:text-paper"><CopyButton text={p.firstCommitGuide.steps.map((s) => s.action).join('\n')} /></span></div>
              {p.firstCommitGuide.steps.map((s) => (
                <div key={s.step} className="mt-2">
                  {s.note && <div className="opacity-60"># {s.note}</div>}
                  <div><span className="opacity-60 select-none">$ </span>{s.action}</div>
                </div>
              ))}
            </div>
            {p.firstCommitGuide.firstGoal && <p className="mt-4"><strong>First goal:</strong> {p.firstCommitGuide.firstGoal}</p>}
          </Section>
        )}

        {p.mvp && (
          <Section id="mvp" title="What counts as done">
            <p className="text-ink-2">{p.mvp.description}</p>
            <ul className="mt-3 list-disc pl-5 space-y-1">{p.mvp.conditions.map((c) => <li key={c}>{c}</li>)}</ul>
            {p.mvp.demoScript && <p className="mt-4 text-[0.95rem]"><strong>Demo script:</strong> {p.mvp.demoScript}</p>}
          </Section>
        )}

        {p.pitfalls && p.pitfalls.length > 0 && (
          <Section id="pitfalls" title="Pitfalls">
            <ul className="space-y-4">
              {p.pitfalls.map((x) => (
                <li key={x.pitfall} className="border-l-4 border-redpen pl-4">
                  <strong>{x.pitfall}</strong>
                  <span className="block text-[0.95rem] text-ink-2">{x.why}</span>
                  <span className="block text-[0.95rem]"><strong>Fix:</strong> {x.mitigation}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {p.resources && p.resources.length > 0 && (
          <Section id="resources" title="Resources">
            <p className="text-[0.9rem] text-ink-2 mb-3">Suggested by the AI. Links can be outdated or wrong, so check before relying on them.</p>
            <ul className="space-y-3">
              {p.resources.map((r) => (
                <li key={r.title}>
                  {/^https?:\/\//.test(r.url) ? <a href={r.url} target="_blank" rel="noopener noreferrer nofollow" className="font-semibold">{r.title}</a> : <strong>{r.title}</strong>}
                  <span className="text-ink-2"> · {r.source}{r.timeEstimate && ` · ${r.timeEstimate}`}</span>
                  {r.why && <span className="block text-[0.95rem] text-ink-2">{r.why}</span>}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {p.portfolioBlurb && (
          <Section id="portfolio" title="Portfolio blurb">
            <Panel className="p-5"><p>{p.portfolioBlurb}</p><div className="mt-2"><CopyButton text={p.portfolioBlurb} /></div></Panel>
          </Section>
        )}

        {rec && inputs && (
          <section className="no-print mt-10 pt-8 border-t border-rule">
            <h2 className="text-xl mb-4">Adjust this plan</h2>
            <div className="flex flex-wrap gap-3 items-center">
              {inputs.skillLevel && <><Button variant="secondary" disabled={!!busy} onClick={() => refine('simpler')}>{busy === 'simpler' ? 'Rewriting…' : 'Make it simpler'}</Button>
              <Button variant="secondary" disabled={!!busy} onClick={() => refine('more-complex')}>{busy === 'more-complex' ? 'Rewriting…' : 'Make it harder'}</Button></>}
              <ButtonLink variant="ghost" href="/generate">Start a new one</ButtonLink>
              <label className="flex items-center gap-2 text-[0.95rem] ml-auto">
                Status
                <select className={`${field} w-auto`} value={rec.status} onChange={(e) => setStatus(rec.id, e.target.value as Status)}>
                  <option value="planned">Planned</option>
                  <option value="building">Building</option>
                  <option value="shipped">Shipped</option>
                </select>
              </label>
              <Button variant="ghost" onClick={() => { if (confirm('Delete this plan from your browser?')) { deleteRecord(rec.id); router.push('/saved'); } }}>
                <Trash2 size={16} aria-hidden /> Delete
              </Button>
            </div>
          </section>
        )}
      </article>
    </Container>
  );
}
