import { describe, expect, it } from 'vitest';
import { decodeShare, encodeShare } from './share';
import { normalizeProject } from './normalize';

describe('share links', () => {
  it('round-trips a plan through the URL fragment encoding', async () => {
    const plan = { k: 'project' as const, d: { title: 'Café ☕ app', roadmap: [{ tasks: ['a'.repeat(5000)] }] } };
    const encoded = await encodeShare(plan);
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/); // URL-safe, no padding
    expect(encoded.length).toBeLessThan(500); // repetitive text compresses
    expect(await decodeShare(encoded)).toEqual(plan);
  });

  it('rejects garbage', async () => {
    await expect(decodeShare('not-a-real-link')).rejects.toThrow();
  });
});

describe('normalizeProject', () => {
  it('survives sparse and wrongly-typed model output', () => {
    const p = normalizeProject({
      title: 'X',
      techStack: { primary: ['React', { name: 'Node' }], alternative: 'oops' },
      features: ['Search'],
      roadmap: [{ tasks: [{ task: 'one' }, 'two'] }, null],
    });
    expect(p.techStack.primary.map((t) => t.name)).toEqual(['React', 'Node']);
    expect(p.techStack.alternative).toEqual([]);
    expect(p.features[0]).toMatchObject({ name: 'Search', tier: 'Core' });
    expect(p.roadmap[0].tasks).toEqual(['one', 'two']);
    expect(p.roadmap).toHaveLength(2);
    expect(normalizeProject(undefined).roadmap).toEqual([]);
  });
});
