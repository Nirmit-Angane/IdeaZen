'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Download, FileText } from 'lucide-react';
import { Button, field } from './ui';
import { CopyButton } from './copy-button';
import { KITS } from '@/content/kits';
import { TOOLS, buildPack, type Tool } from '@/lib/ai-pack';
import { download, slugify } from '@/lib/markdown';
import type { GeneratedProject } from '@/lib/types';
import { zip } from '@/lib/zip';

/** Builds the brief, stack, design and AI instruction files from a plan and lets the user copy or download them. */
export function AiExport({ project }: { project: GeneratedProject }) {
  const [tool, setTool] = useState<Tool>('claude');
  const [kitSlug, setKitSlug] = useState('');
  const kit = KITS.find((k) => k.slug === kitSlug) ?? null;
  const pack = useMemo(() => buildPack(project, kit, tool), [project, kit, tool]);
  const toolInfo = TOOLS.find((t) => t.value === tool)!;

  return (
    <div className="border border-rule bg-sheet rounded-panel p-5 space-y-5">
      <p className="text-ink-2 prose-spec">
        Give your AI coding tool a real brief instead of a one-line prompt. This bundles your plan, tech stack and design rules, plus instructions that tell the AI to build one phase at a time.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-[0.95rem]">
          <span className="font-semibold block mb-1">AI tool</span>
          <select className={field} value={tool} onChange={(e) => setTool(e.target.value as Tool)}>
            {TOOLS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </label>
        <label className="block text-[0.95rem]">
          <span className="font-semibold block mb-1">Design</span>
          <select className={field} value={kitSlug} onChange={(e) => setKitSlug(e.target.value)}>
            <option value="">General anti-template rules</option>
            {KITS.map((k) => <option key={k.slug} value={k.slug}>{k.name}: {k.category.toLowerCase()}</option>)}
          </select>
        </label>
      </div>
      <p className="text-[0.9rem] text-ink-2">
        {toolInfo.note} Not sure which design? <Link href="/design">Preview all design kits</Link>.
      </p>

      <ul className="font-mono text-[0.8rem] text-ink-2 grid sm:grid-cols-2 gap-x-6 gap-y-1" aria-label="Files in the pack">
        {pack.files.map((f) => <li key={f.path} className="flex items-center gap-2"><FileText size={14} aria-hidden />{f.path}</li>)}
      </ul>

      <div className="flex flex-wrap gap-2">
        <CopyButton text={pack.prompt} label="Copy prompt" variant="primary" />
        <Button variant="secondary" onClick={() => download(`${slugify(project.title)}-ai-pack.zip`, zip(pack.files) as BlobPart, 'application/zip')}>
          <Download size={16} aria-hidden /> Download .zip
        </Button>
        <CopyButton text={pack.designMd} label="Copy DESIGN.md" variant="secondary" />
      </div>
    </div>
  );
}
