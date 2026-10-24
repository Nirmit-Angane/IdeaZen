'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Generating } from '@/components/generating';
import { Button, Container, field } from '@/components/ui';
import { fetchHackathon } from '@/lib/client-api';
import { saveRecord } from '@/lib/storage';
import type { HackathonInputs } from '@/lib/hackathon-types';

const TIMELINES = ['24', '36', '48', '72'];
const TEAM = [['solo', 'Solo'], ['2 people', '2 people'], ['3-4 people', '3 to 4'], ['5+ people', '5 or more']];
const SKILLS = ['frontend', 'backend', 'fullstack', 'design', 'ml', 'devops'];
const SUBMIT = [['demo', 'Working demo'], ['pitch-deck', 'Pitch deck'], ['video', 'Demo video'], ['github', 'GitHub repo'], ['deployment', 'Live deployment']];
const GOALS = [['win', 'Win'], ['learn', 'Learn'], ['mvp', 'Ship a real MVP'], ['networking', 'Meet people']];

function Group({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="font-semibold mb-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Choice({ type, name, value, checked, onChange, children }: {
  type: 'radio' | 'checkbox'; name: string; value: string; checked: boolean; onChange: () => void; children: React.ReactNode;
}) {
  return (
    <label className={`relative isolate cursor-pointer min-h-11 px-4 py-2 border rounded-input flex items-center has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-pine ${checked ? 'border-ink text-on-mark' : 'border-rule bg-sheet hover:border-ink-2'}`}>
      {checked && <span aria-hidden className="swipe absolute inset-0 -z-10" />}
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}

export function HackathonForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [timeline, setTimeline] = useState('48');
  const [team, setTeam] = useState('2 people');
  const [skills, setSkills] = useState<string[]>(['fullstack']);
  const [level, setLevel] = useState('intermediate');
  const [submit, setSubmit] = useState<string[]>(['demo', 'github']);
  const [goal, setGoal] = useState('win');
  const [state, setState] = useState<'form' | 'loading' | 'error'>('form');
  const [error, setError] = useState<string | null>(null);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const run = async () => {
    const inputs: HackathonInputs = {
      projectTitle: title.trim(), timeline, teamSize: team,
      teamMembers: skills.map((skill) => ({ skill, level })), submissionRequirements: submit, priority: goal,
    };
    setState('loading');
    setError(null);
    try {
      const plan = await fetchHackathon(inputs);
      if (!plan.roadmap.length) throw new Error('The AI returned an incomplete plan. Try again.');
      router.push(`/hackathon/plan/${saveRecord({ kind: 'hackathon', title: plan.title, data: plan, inputs })}`);
    } catch (e) {
      setError((e as Error).message);
      setState('error');
    }
  };

  if (state !== 'form') {
    return <Generating title="Planning your hours" error={error} onRetry={run} backHref="/hackathon" backLabel="Edit my answers" />;
  }

  return (
    <Container className="py-14 max-w-2xl">
      <h1 className="text-3xl sm:text-5xl">Plan your hackathon, hour by hour</h1>
      <p className="mt-4 text-ink-2 prose-spec">
        Describe the idea and the constraints. You get a task list per block of hours, what to cut if you fall behind, the risks to watch, and a demo script.
      </p>
      <form
        className="mt-10 space-y-8"
        onSubmit={(e) => { e.preventDefault(); if (title.trim() && skills.length) run(); }}
      >
        <div>
          <label htmlFor="title" className="font-semibold block mb-2">What are you building?</label>
          <input id="title" required maxLength={120} className={field} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Real-time flood alerts map for my city" />
        </div>
        <Group legend="How many hours do you have?">
          {TIMELINES.map((t) => <Choice key={t} type="radio" name="timeline" value={t} checked={timeline === t} onChange={() => setTimeline(t)}>{t} hours</Choice>)}
        </Group>
        <Group legend="Team size">
          {TEAM.map(([v, l]) => <Choice key={v} type="radio" name="team" value={v} checked={team === v} onChange={() => setTeam(v)}>{l}</Choice>)}
        </Group>
        <Group legend="What skills does your team have?">
          {SKILLS.map((s) => <Choice key={s} type="checkbox" name="skills" value={s} checked={skills.includes(s)} onChange={() => toggle(skills, setSkills, s)}>{s}</Choice>)}
        </Group>
        <div>
          <label htmlFor="level" className="font-semibold block mb-2">Typical experience level</label>
          <select id="level" className={`${field} sm:w-64`} value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <Group legend="What must you submit?">
          {SUBMIT.map(([v, l]) => <Choice key={v} type="checkbox" name="submit" value={v} checked={submit.includes(v)} onChange={() => toggle(submit, setSubmit, v)}>{l}</Choice>)}
        </Group>
        <Group legend="Main goal">
          {GOALS.map(([v, l]) => <Choice key={v} type="radio" name="goal" value={v} checked={goal === v} onChange={() => setGoal(v)}>{l}</Choice>)}
        </Group>
        <Button type="submit" disabled={!title.trim() || !skills.length}>Generate plan</Button>
      </form>
    </Container>
  );
}
