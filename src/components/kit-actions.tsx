'use client';
import { Download } from 'lucide-react';
import { Button } from './ui';
import { CopyButton } from './copy-button';
import { download } from '@/lib/markdown';

export function KitActions({ markdown, filename = 'DESIGN.md' }: { markdown: string; filename?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <CopyButton text={markdown} label="Copy DESIGN.md" variant="primary" />
      <Button variant="secondary" onClick={() => download(filename, markdown)}><Download size={16} aria-hidden /> Download</Button>
    </div>
  );
}
