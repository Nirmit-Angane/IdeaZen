import { describe, expect, it } from 'vitest';
import { buildPack, kitToMarkdown } from './ai-pack';
import { KITS } from '@/content/kits';
import { crc32, zip } from './zip';
import { normalizeProject } from './normalize';

const project = normalizeProject({
  title: 'Habit tracker',
  techStack: { primary: [{ name: 'React', role: 'UI', reason: 'Familiar' }], alternative: [{ name: 'Svelte', whenToUse: 'Smaller bundles' }] },
  mvp: { description: 'Done when', conditions: ['Check in a habit'], demoScript: '' },
  roadmap: [{ phase: '1', title: 'Foundation', tasks: ['Init repo'] }],
});

describe('buildPack', () => {
  it('adds the tool-specific file and always includes the docs', () => {
    const paths = (t: 'any' | 'claude' | 'cursor' | 'agents') => buildPack(project, null, t).files.map((f) => f.path);
    expect(paths('claude')).toContain('CLAUDE.md');
    expect(paths('cursor')).toContain('.cursor/rules/ideazen.mdc');
    expect(paths('agents')).not.toContain('CLAUDE.md');
    for (const t of ['any', 'claude', 'cursor', 'agents'] as const)
      expect(paths(t)).toEqual(expect.arrayContaining(['AGENTS.md', 'docs/PROJECT.md', 'docs/STACK.md', 'docs/DESIGN.md']));
  });

  it('puts the kit tokens into DESIGN.md and the prompt', () => {
    const kit = KITS[0];
    const pack = buildPack(project, kit, 'any');
    expect(pack.designMd).toContain(kit.tokens.accent);
    expect(pack.prompt).toContain('Habit tracker');
    expect(pack.prompt).toContain(`DESIGN.md: ${kit.name}`);
    expect(pack.prompt).toContain('Start with Phase 1 only');
  });

  it('falls back to general anti-template rules without a kit', () => {
    expect(buildPack(project, null, 'any').designMd).toContain('general rules');
  });

  it('every kit renders every token with no placeholders', () => {
    for (const k of KITS) {
      const md = kitToMarkdown(k);
      for (const v of Object.values(k.tokens)) expect(md).toContain(v);
      expect(md).not.toMatch(/undefined|\[object/);
    }
  });
});

describe('zip', () => {
  it('has a correct crc32 and a well-formed end record', () => {
    expect(crc32(new TextEncoder().encode('123456789'))).toBe(0xcbf43926);
    const out = zip([{ path: 'a.md', content: 'héllo' }, { path: 'docs/b.md', content: 'x' }]);
    const dv = new DataView(out.buffer);
    expect(dv.getUint32(0, true)).toBe(0x04034b50);
    const eocd = out.length - 22;
    expect(dv.getUint32(eocd, true)).toBe(0x06054b50);
    expect(dv.getUint16(eocd + 10, true)).toBe(2);
    expect(dv.getUint32(dv.getUint32(eocd + 16, true), true)).toBe(0x02014b50); // central dir starts where EOCD says
  });
});

// Colour accessibility guard: a kit cannot ship with failing contrast.
const lum = (h: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

describe('kit contrast (WCAG)', () => {
  for (const k of KITS) {
    it(`${k.name}: text 4.5:1, control borders 3:1, danger 4.5:1`, () => {
      const t = k.tokens;
      for (const bg of [t.bg, t.surface]) {
        expect(ratio(t.ink, bg), 'ink').toBeGreaterThanOrEqual(4.5);
        expect(ratio(t.muted, bg), 'muted').toBeGreaterThanOrEqual(4.5);
        expect(ratio(t.accent, bg), 'accent text').toBeGreaterThanOrEqual(4.5);
        expect(ratio(t.control, bg), 'control border').toBeGreaterThanOrEqual(3);
        expect(ratio(t.danger, bg), 'danger').toBeGreaterThanOrEqual(4.5);
      }
      expect(ratio(t.accentInk, t.accent), 'text on accent').toBeGreaterThanOrEqual(4.5);
    });
  }

  it('DESIGN.md includes states, forms, feedback and responsive rules', () => {
    const md = kitToMarkdown(KITS[0]);
    for (const h of ['## Interaction states', '## Forms and validation', '## Feedback and system status', '## Responsive behaviour', '## Accessibility', '| control |', '| danger |'])
      expect(md).toContain(h);
  });
});
