'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Link2, Printer, Trash2 } from 'lucide-react';
import { Button, ButtonLink, Container, Mark, Notice, Panel, Tag } from './ui';
import { download, hackathonToMarkdown, slugify } from '@/lib/markdown';
import { encodeShare } from '@/lib/share';
import { deleteRecord, toggleTask, useStore } from '@/lib/storage';
import type { HackathonRoadmap } from '@/lib/hackathon-types';

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-8 border-t border-rule">
      <h2 className="text-2xl mb-5">{title}</h2>
      {children}
    </section>
  );
}

const ScopeList = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h3 className="text-base font-semibold mb-2">{title}</h3>
    <ul className="list-disc pl-5 space-y-1 text-[0.95rem]">{items.map((x) => <li key={x}>{x}</li>)}</ul>
  </div>
);

export function HackathonView({ plan: h, recordId, onSaveCopy }: { plan: HackathonRoadmap; recordId?: string; onSaveCopy?: () => void }) {
  const router = useRouter();
  const store = useStore();
  const done = new Set((recordId && store?.progress[recordId]) || []);
  const total = h.roadmap.reduce((n, r) => n + r.tasks.length, 0);
  const finished = h.roadmap.reduce((n, r, i) => n + r.tasks.filter((_, j) => done.has(`h${i}t${j}`)).length, 0);
  const [msg, setMsg] = useState<{ tone: 'info' | 'error'; text: string } | null>(null);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(`${location.origin}/s#d=${await encodeShare({ k: 'hackathon', d: h })}`);
      setMsg({ tone: 'info', text: 'Link copied. Anyone with it can read this plan; it is not stored on a server.' });
    } catch {
      setMsg({ tone: 'error', text: 'Could not create the link in this browser. Use Download .md instead.' });
    }
  };

  const d = h.demoScript;
  return (
    <Container className="py-10 max-w-4xl">
      <header className="pb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Tag>{h.timeline.replace(/h$/, '')} hours</Tag>
          <Tag tone={h.feasibility === 'Low' ? 'red' : 'pine'}>Feasibility: {h.feasibility}</Tag>
          {recordId && <Tag>{finished}/{total} tasks done</Tag>}
        </div>
        <h1 className="text-4xl sm:text-5xl">{h.title}</h1>
        {h.strategicAnalysis.achievability && <p className="mt-5 text-lg prose-spec">{h.strategicAnalysis.achievability}</p>}
        <div className="no-print mt-6 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => download(`${slugify(h.title)}-hackathon.md`, hackathonToMarkdown(h))}><Download size={16} aria-hidden /> Download .md</Button>
          <Button variant="secondary" onClick={() => window.print()}><Printer size={16} aria-hidden /> Print or save PDF</Button>
          <Button variant="secondary" onClick={share}><Link2 size={16} aria-hidden /> Copy share link</Button>
          {onSaveCopy && <Button onClick={onSaveCopy}>Save to my plans</Button>}
        </div>
        {msg && <div className="mt-4 no-print"><Notice tone={msg.tone}>{msg.text}</Notice></div>}
        {(h.strategicAnalysis.winningAngle || h.strategicAnalysis.biggestRisk) && (
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {h.strategicAnalysis.winningAngle && <Panel className="p-5"><h2 className="text-base font-semibold">Winning angle</h2><p className="mt-1 text-[0.95rem]"><Mark>{h.strategicAnalysis.winningAngle}</Mark></p></Panel>}
            {h.strategicAnalysis.biggestRisk && <Panel className="p-5"><h2 className="text-base font-semibold">Biggest risk</h2><p className="mt-1 text-[0.95rem]">{h.strategicAnalysis.biggestRisk}</p></Panel>}
          </div>
        )}
      </header>

      <Block title="Hour-by-hour plan">
        <ol>
          {h.roadmap.map((r, i) => (
            <li key={i} className="relative pl-8 pb-8 last:pb-0 border-l border-rule ml-2">
              <span aria-hidden className="absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-ink bg-paper" />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-sm text-ink-2">{r.timeBlock ?? `p${r.phase}`}</span>
                <h3 className="text-xl">{r.title ?? `Phase ${r.phase}`}</h3>
              </div>
              {r.goal && <p className="text-ink-2 text-[0.95rem]">Goal: {r.goal}</p>}
              <ul className="mt-3 space-y-1">
                {r.tasks.map((t, j) => {
                  const key = `h${i}t${j}`;
                  return (
                    <li key={key}>
                      <label className={`flex gap-3 items-start min-h-8 ${recordId ? 'cursor-pointer' : ''}`}>
                        {recordId ? <input type="checkbox" className="mt-1.5 size-4 accent-[var(--pine)]" checked={done.has(key)} onChange={() => toggleTask(recordId, key)} /> : <span aria-hidden className="mt-2.5 size-1.5 rounded-full bg-ink-2 shrink-0 ml-1" />}
                        <span className={done.has(key) ? 'line-through text-ink-2' : ''}>
                          {t.task}
                          {(t.duration || t.assignedTo) && <span className="font-mono text-[0.8rem] text-ink-2"> · {[t.duration, t.assignedTo].filter(Boolean).join(' · ')}</span>}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Scope">
        <div className="grid sm:grid-cols-3 gap-6">
          <ScopeList title="Must have" items={h.mvpScope.mustHave} />
          <ScopeList title="Nice to have" items={h.mvpScope.niceToHave} />
          <ScopeList title="Cut if behind" items={h.mvpScope.cutIfNeeded} />
        </div>
      </Block>

      {h.risks.length > 0 && (
        <Block title="Risks">
          <ul className="space-y-4">{h.risks.map((r) => <li key={r.risk} className="border-l-4 border-redpen pl-4"><strong>{r.risk}</strong><span className="block text-[0.95rem] text-ink-2">{r.mitigation}</span></li>)}</ul>
        </Block>
      )}

      {h.submissionChecklist.length > 0 && (
        <Block title="Submission checklist">
          <ul className="space-y-1">
            {h.submissionChecklist.map((c, i) => {
              const key = `c${i}`;
              return (
                <li key={key}>
                  <label className={`flex gap-3 items-start min-h-8 ${recordId ? 'cursor-pointer' : ''}`}>
                    {recordId ? <input type="checkbox" className="mt-1.5 size-4 accent-[var(--pine)]" checked={done.has(key)} onChange={() => toggleTask(recordId, key)} /> : <span aria-hidden className="mt-2.5 size-1.5 rounded-full bg-ink-2 shrink-0 ml-1" />}
                    <span className={done.has(key) ? 'line-through text-ink-2' : ''}>{c.item}{c.timeAllocation && <span className="font-mono text-[0.8rem] text-ink-2"> · {c.timeAllocation}</span>}{c.critical && <span className="text-redpen text-[0.8rem]"> · required</span>}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </Block>
      )}

      {d.hook && (
        <Block title="Demo script">
          <ol className="space-y-3 list-decimal pl-5 prose-spec">
            <li><strong>Hook.</strong> {d.hook}</li>
            <li><strong>Problem.</strong> {d.problem}</li>
            <li><strong>The wow.</strong> {d.theWOW}</li>
            <li><strong>Close.</strong> {d.closing}</li>
          </ol>
        </Block>
      )}

      {recordId && (
        <section className="no-print pt-8 border-t border-rule flex gap-3 flex-wrap">
          <ButtonLink href="/hackathon" variant="secondary">Plan another</ButtonLink>
          <Button variant="ghost" onClick={() => { if (confirm('Delete this plan from your browser?')) { deleteRecord(recordId); router.push('/saved'); } }}><Trash2 size={16} aria-hidden /> Delete</Button>
        </section>
      )}
    </Container>
  );
}
