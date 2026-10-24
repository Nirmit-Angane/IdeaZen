import Link from 'next/link';
import { Tag } from './ui';
import { LEVELS, STACKS, type CuratedIdea } from '@/content/ideas';

export function IdeaRow({ idea }: { idea: CuratedIdea }) {
  return (
    <li className="border-b border-rule">
      <Link href={`/ideas/${idea.slug}`} className="grid md:grid-cols-[1fr_auto] gap-2 md:gap-8 py-5 px-2 -mx-2 no-underline hover:bg-sheet">
        <span>
          <span className="block text-xl font-semibold">{idea.title}</span>
          <span className="block text-ink-2 text-[0.95rem] max-w-[62ch]">{idea.summary}</span>
        </span>
        <span className="flex flex-wrap gap-2 md:justify-end md:self-center">
          <Tag>{LEVELS[idea.level].name.split(' ')[0]}</Tag>
          <Tag>{idea.time}</Tag>
          {idea.stacks.map((s) => <Tag key={s} tone="pine">{STACKS[s].name}</Tag>)}
        </span>
      </Link>
    </li>
  );
}

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-2 mb-6">
      <ol className="flex flex-wrap gap-x-2">
        {items.map((c, i) => (
          <li key={c.name} className="flex gap-2">
            {c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
