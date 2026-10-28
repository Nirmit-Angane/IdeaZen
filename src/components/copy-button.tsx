'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from './ui';

export function CopyButton({ text, label = 'Copy', variant = 'secondary' }: { text: string; label?: string; variant?: 'primary' | 'secondary' | 'ghost' }) {
  const [state, setState] = useState<'idle' | 'done' | 'failed'>('idle');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState('done');
    } catch {
      setState('failed');
    }
    setTimeout(() => setState('idle'), 2000);
  };
  return (
    <Button variant={variant} onClick={copy} aria-live="polite">
      {state === 'done' ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      {state === 'done' ? 'Copied' : state === 'failed' ? 'Copy failed. Select the text manually.' : label}
    </Button>
  );
}
