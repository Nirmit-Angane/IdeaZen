'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HackathonView } from '@/components/hackathon-view';
import { SpecView } from '@/components/spec-view';
import { ButtonLink, Container } from '@/components/ui';
import { normalizeHackathon, normalizeProject } from '@/lib/normalize';
import { saveRecord } from '@/lib/storage';
import { decodeShare } from '@/lib/share';
import type { GeneratedProject } from '@/lib/types';
import type { HackathonRoadmap } from '@/lib/hackathon-types';

type State =
  | { s: 'loading' }
  | { s: 'error' }
  | { s: 'project'; data: GeneratedProject }
  | { s: 'hackathon'; data: HackathonRoadmap };

/** Share links carry the plan in the URL fragment: decoded here, never sent to a server. */
export function Shared() {
  const router = useRouter();
  const [state, setState] = useState<State>({ s: 'loading' });

  useEffect(() => {
    const d = new URLSearchParams(location.hash.slice(1)).get('d');
    if (!d) return setState({ s: 'error' });
    decodeShare(d)
      .then((v) => setState(v.k === 'project'
        ? { s: 'project', data: normalizeProject(v.d) }
        : { s: 'hackathon', data: normalizeHackathon(v.d, (v.d as any)?.title ?? 'Hackathon plan', String((v.d as any)?.timeline ?? '')) }))
      .catch(() => setState({ s: 'error' }));
  }, []);

  if (state.s === 'loading') return <Container className="py-20"><p className="text-ink-2" role="status">Opening shared plan…</p></Container>;
  if (state.s === 'error') {
    return (
      <Container className="py-20 max-w-xl">
        <h1 className="text-3xl">This link is incomplete</h1>
        <p className="mt-3 text-ink-2">The share link may have been cut off when it was pasted. Ask the sender to copy it again.</p>
        <div className="mt-6"><ButtonLink href="/generate">Generate your own</ButtonLink></div>
      </Container>
    );
  }
  if (state.s === 'project') {
    const p = state.data;
    return <SpecView project={p} onSaveCopy={() => router.push(`/spec/${saveRecord({ kind: 'project', title: p.title, data: p, inputs: { skillLevel: null } })}`)} />;
  }
  const h = state.data;
  return <HackathonView plan={h} onSaveCopy={() => router.push(`/hackathon/plan/${saveRecord({ kind: 'hackathon', title: h.title, data: h, inputs: { projectTitle: h.title, timeline: h.timeline, teamSize: '', teamMembers: [], submissionRequirements: [] } })}`)} />;
}
