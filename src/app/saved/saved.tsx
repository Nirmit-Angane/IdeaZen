'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Download, Upload } from 'lucide-react';
import { Button, ButtonLink, Container, Notice, Tag } from '@/components/ui';
import { download } from '@/lib/markdown';
import { exportAll, importAll, useStore, type SavedRecord } from '@/lib/storage';

function progressOf(r: SavedRecord, done: string[] = []) {
  const total = r.kind === 'project'
    ? r.data.roadmap.reduce((n, p) => n + p.tasks.length, 0)
    : r.data.roadmap.reduce((n, p) => n + p.tasks.length, 0) + r.data.submissionChecklist.length;
  return { done: done.length, total, pct: total ? Math.round((Math.min(done.length, total) / total) * 100) : 0 };
}

export function Saved() {
  const store = useStore();
  const file = useRef<HTMLInputElement>(null);
  const [note, setNote] = useState<{ tone: 'info' | 'error'; text: string } | null>(null);

  const onImport = async (f?: File) => {
    if (!f) return;
    try {
      const n = importAll(await f.text());
      setNote({ tone: 'info', text: `Imported ${n} new ${n === 1 ? 'item' : 'items'}.` });
    } catch (e) {
      setNote({ tone: 'error', text: (e as Error).message || 'Could not read that file.' });
    }
  };

  return (
    <Container className="py-14">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl sm:text-5xl">Saved ideas</h1>
          <p className="mt-3 text-ink-2 max-w-[58ch]">Stored only in this browser. Download a backup to move them to another device.</p>
        </div>
        <div className="flex gap-2 no-print">
          <Button variant="secondary" disabled={!store?.records.length} onClick={() => download('ideazen-backup.json', exportAll(), 'application/json')}><Download size={16} aria-hidden /> Backup</Button>
          <Button variant="secondary" onClick={() => file.current?.click()}><Upload size={16} aria-hidden /> Restore</Button>
          <input ref={file} type="file" accept="application/json,.json" className="sr-only" aria-label="Restore backup file" onChange={(e) => { onImport(e.target.files?.[0]); e.target.value = ''; }} />
        </div>
      </div>
      {note && <div className="mt-6"><Notice tone={note.tone}>{note.text}</Notice></div>}

      {!store ? (
        <p className="mt-10 text-ink-2" role="status">Loading…</p>
      ) : store.records.length === 0 ? (
        <div className="mt-12 border border-dashed border-rule rounded-panel p-10 max-w-xl">
          <h2 className="text-2xl">Nothing saved yet</h2>
          <p className="mt-2 text-ink-2">Every plan you generate is saved here automatically, with a checklist so you can track progress.</p>
          <div className="mt-6 flex gap-3 flex-wrap"><ButtonLink href="/generate">Generate a project</ButtonLink><ButtonLink href="/hackathon" variant="secondary">Plan a hackathon</ButtonLink></div>
        </div>
      ) : (
        <ul className="mt-10 border-t border-rule">
          {store.records.map((r) => {
            const pr = progressOf(r, store.progress[r.id]);
            return (
              <li key={r.id} className="border-b border-rule">
                <Link href={r.kind === 'project' ? `/spec/${r.id}` : `/hackathon/plan/${r.id}`} className="grid sm:grid-cols-[1fr_auto] gap-3 py-5 no-underline hover:bg-sheet px-2 -mx-2">
                  <span>
                    <span className="block text-xl font-semibold">{r.title}</span>
                    <span className="mt-2 flex flex-wrap gap-2">
                      <Tag>{r.kind === 'project' ? 'Project' : 'Hackathon'}</Tag>
                      <Tag tone={r.status === 'shipped' ? 'pine' : 'plain'}>{r.status}</Tag>
                      <Tag>{new Date(r.createdAt).toLocaleDateString()}</Tag>
                    </span>
                  </span>
                  <span className="font-mono text-sm self-center text-ink-2">{pr.pct}% · {pr.done}/{pr.total}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
