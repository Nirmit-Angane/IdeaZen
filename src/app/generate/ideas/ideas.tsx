'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Generating } from '@/components/generating';
import { Button, Container, Tag } from '@/components/ui';
import { fetchIdeas } from '@/lib/client-api';
import type { IdeaCard } from '@/lib/types';
import { answersQuery, inputsFromParams } from '@/lib/wizard';

export function Ideas() {
  const router = useRouter();
  const params = useSearchParams();
  const qs = answersQuery(params);
  const [ideas, setIdeas] = useState<IdeaCard[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(
    (signal: AbortSignal) => {
      const inputs = inputsFromParams(new URLSearchParams(qs));
      if (!inputs) return router.replace('/generate');
      const key = `ideazen:ideas:${qs}`;
      try {
        const cached = sessionStorage.getItem(key);
        if (cached && attempt === 0) return setIdeas(JSON.parse(cached));
      } catch { /* no session storage */ }
      setError(null);
      setIdeas(null);
      fetchIdeas(inputs, signal)
        .then((r) => {
          setIdeas(r);
          try { sessionStorage.setItem(key, JSON.stringify(r)); } catch { /* ignore */ }
        })
        .catch((e: Error) => { if (e.name !== 'AbortError') setError(e.message); });
    },
    [qs, attempt, router],
  );

  useEffect(() => {
    const c = new AbortController();
    load(c.signal);
    return () => c.abort();
  }, [load]);

  if (!ideas) {
    return (
      <Generating
        title="Finding projects that fit"
        error={error}
        onRetry={() => setAttempt((a) => a + 1)}
        backHref={`/generate?${qs}`}
        backLabel="Change answers"
      />
    );
  }

  return (
    <Container className="py-14">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl">Three projects for you</h1>
          <p className="mt-3 text-ink-2">Pick one and we will write the full build plan: features, stack, roadmap and your first commit.</p>
        </div>
        <Button variant="ghost" onClick={() => setAttempt((a) => a + 1)}>Get three different ideas</Button>
      </div>

      <ol className="mt-10 border-t border-rule">
        {ideas.map((idea, i) => (
          <li key={idea.title + i} className="border-b border-rule py-8 grid gap-6 md:grid-cols-[1fr_220px]">
            <div>
              <h2 className="text-2xl">{idea.title}</h2>
              <p className="mt-2 text-ink-2 max-w-[62ch]">{idea.description}</p>
              {idea.realWorldComparison && <p className="mt-2 text-[0.95rem]">{idea.realWorldComparison}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                <Tag>{idea.difficulty}</Tag>
                <Tag>Time fit: {idea.timeFit}</Tag>
                {idea.techStack.primary.slice(0, 4).map((t) => <Tag key={t.name} tone="pine">{t.name}</Tag>)}
              </div>
              {idea.features.length > 0 && (
                <ul className="mt-4 text-[0.95rem] list-disc pl-5 space-y-1">
                  {idea.features.slice(0, 3).map((f) => <li key={f.name}><strong>{f.name}</strong>{f.description && `: ${f.description}`}</li>)}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-4 md:items-stretch">
              {idea.matchBreakdown && (
                <p className="text-[0.95rem]">
                  <span className="font-mono text-2xl font-bold">{Math.round(idea.matchBreakdown.overall)}%</span>
                  <span className="text-ink-2"> match to your answers</span>
                </p>
              )}
              <Button onClick={() => router.push(`/generate/build?${qs}&title=${encodeURIComponent(idea.title)}`)}>Build this plan</Button>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
