'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { OptionRow } from '@/components/option-row';
import { Button, Container } from '@/components/ui';
import { LEVELS, answersQuery, isLevel, questionsFor } from '@/lib/wizard';

/** One question per screen. All state lives in the URL, so refresh and back/forward just work. */
export function Wizard() {
  const router = useRouter();
  const params = useSearchParams();
  const level = params.get('level');

  const go = (next: URLSearchParams, push = true) => {
    const url = `/generate?${next.toString()}`;
    push ? router.push(url) : router.replace(url);
  };

  const questions = isLevel(level) ? questionsFor(level) : [];
  const step = Math.min(Math.max(Number(params.get('q')) || 0, 0), Math.max(questions.length - 1, 0));
  const q = questions[step];
  const current = q ? (params.get(q.id)?.split(',').filter(Boolean) ?? []) : [];

  const finish = (p: URLSearchParams) => router.push(`/generate/ideas?${answersQuery(p)}`);

  const advance = (p: URLSearchParams) => {
    if (step + 1 >= questions.length) return finish(p);
    p.set('q', String(step + 1));
    go(p);
  };

  const choose = (value: string) => {
    const p = new URLSearchParams(params.toString());
    if (!q) return;
    if (q.isMultiSelect) {
      const set = new Set(current);
      set.has(value) ? set.delete(value) : set.add(value);
      set.size ? p.set(q.id, [...set].join(',')) : p.delete(q.id);
      go(p, false);
    } else {
      p.set(q.id, value);
      setTimeout(() => advance(p), 220); // let the highlighter swipe register
      go(p, false);
    }
  };

  const pickLevel = (value: string) => go(new URLSearchParams({ level: value, q: '0' }));

  // number keys choose options
  const optionCount = q ? q.options.length : LEVELS.length;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || (e.target as HTMLElement)?.tagName === 'INPUT') return;
      const n = Number(e.key);
      if (n >= 1 && n <= optionCount) q ? choose(q.options[n - 1].value) : pickLevel(LEVELS[n - 1].value);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!q) {
    return (
      <Container className="py-14 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl">What is your skill level?</h1>
        <p className="mt-3 text-ink-2">This sets the scope of the projects and how detailed the plan is. Press 1, 2 or 3 to choose.</p>
        <div role="radiogroup" aria-label="Skill level" className="mt-8 grid gap-3">
          {LEVELS.map((l, i) => (
            <OptionRow key={l.value} index={i} label={l.label} hint={l.hint} selected={false} onSelect={() => pickLevel(l.value)} />
          ))}
        </div>
      </Container>
    );
  }

  const back = () => {
    if (step === 0) return router.push('/generate');
    const p = new URLSearchParams(params.toString());
    p.set('q', String(step - 1));
    go(p);
  };

  return (
    <Container className="py-14 max-w-2xl">
      <div className="flex items-center justify-between text-sm text-ink-2">
        <button onClick={back} className="underline cursor-pointer min-h-11">Back</button>
        <span className="font-mono" aria-live="polite">{step + 1} / {questions.length}</span>
      </div>
      <h1 className="mt-4 text-3xl sm:text-4xl">{q.question}</h1>
      <p className="mt-3 text-ink-2">{q.description}.</p>
      <div role={q.isMultiSelect ? 'group' : 'radiogroup'} aria-label={q.question} className="mt-8 grid gap-3">
        {q.options.map((o, i) => (
          <OptionRow
            key={o.value} index={i} label={o.label} multi={q.isMultiSelect}
            selected={current.includes(o.value)} onSelect={() => choose(o.value)}
          />
        ))}
      </div>
      {q.isMultiSelect && (
        <div className="mt-6 flex gap-3">
          <Button onClick={() => advance(new URLSearchParams(params.toString()))}>
            {current.length ? 'Continue' : 'Skip'}
          </Button>
        </div>
      )}
    </Container>
  );
}
