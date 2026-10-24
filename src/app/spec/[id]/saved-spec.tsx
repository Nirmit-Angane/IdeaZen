'use client';
import { useParams } from 'next/navigation';
import { SpecView } from '@/components/spec-view';
import { ButtonLink, Container } from '@/components/ui';
import { useStore } from '@/lib/storage';

export function SavedSpec() {
  const { id } = useParams<{ id: string }>();
  const store = useStore();
  if (!store) return <Container className="py-20"><p className="text-ink-2" role="status">Loading…</p></Container>;

  const rec = store.records.find((r) => r.id === id);
  if (!rec || rec.kind !== 'project') {
    return (
      <Container className="py-20 max-w-xl">
        <h1 className="text-3xl">Plan not found</h1>
        <p className="mt-3 text-ink-2">Plans are saved in the browser that created them. This link was opened in a different browser, or the plan was deleted. Ask for a share link, or make a new plan.</p>
        <div className="mt-6 flex gap-3"><ButtonLink href="/generate">Generate a project</ButtonLink><ButtonLink href="/saved" variant="secondary">Saved ideas</ButtonLink></div>
      </Container>
    );
  }
  return <SpecView project={rec.data} recordId={rec.id} inputs={rec.inputs} />;
}
