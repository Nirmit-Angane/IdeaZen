'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Generating } from '@/components/generating';
import { fetchBlueprint } from '@/lib/client-api';
import { saveRecord } from '@/lib/storage';
import { answersQuery, inputsFromParams } from '@/lib/wizard';

export function Build() {
  const router = useRouter();
  const params = useSearchParams();
  const qs = answersQuery(params);
  const title = params.get('title') ?? '';
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const inputs = inputsFromParams(new URLSearchParams(qs));
    if (!inputs || !title) return router.replace('/generate');
    const c = new AbortController();
    setError(null);
    fetchBlueprint(inputs, title, undefined, c.signal)
      .then((project) => router.replace(`/spec/${saveRecord({ kind: 'project', title: project.title, data: project, inputs })}`))
      .catch((e: Error) => { if (e.name !== 'AbortError') setError(e.message); });
    return () => c.abort();
  }, [qs, title, attempt, router]);

  return (
    <Generating
      title={`Writing the plan for ${title}`}
      error={error}
      onRetry={() => setAttempt((a) => a + 1)}
      backHref={`/generate/ideas?${qs}`}
      backLabel="Pick a different project"
    />
  );
}
