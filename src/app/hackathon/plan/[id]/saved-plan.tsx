'use client';
import { useParams } from 'next/navigation';
import { HackathonView } from '@/components/hackathon-view';
import { ButtonLink, Container } from '@/components/ui';
import { useStore } from '@/lib/storage';

export function SavedPlan() {
  const { id } = useParams<{ id: string }>();
  const store = useStore();
  if (!store) return <Container className="py-20"><p className="text-ink-2" role="status">Loading…</p></Container>;

  const rec = store.records.find((r) => r.id === id);
  if (!rec || rec.kind !== 'hackathon') {
    return (
      <Container className="py-20 max-w-xl">
        <h1 className="text-3xl">Plan not found</h1>
        <p className="mt-3 text-ink-2">Plans are saved in the browser that created them. It may have been deleted, or this link was opened in another browser.</p>
        <div className="mt-6"><ButtonLink href="/hackathon">Plan a hackathon</ButtonLink></div>
      </Container>
    );
  }
  return <HackathonView plan={rec.data} recordId={rec.id} />;
}
