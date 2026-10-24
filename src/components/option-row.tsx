'use client';

/** Large selectable row used by the wizards. Selection gets the highlighter swipe. */
export function OptionRow({
  label, hint, selected, multi, index, onSelect,
}: { label: string; hint?: string; selected: boolean; multi?: boolean; index: number; onSelect: () => void }) {
  return (
    <button
      type="button"
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      onClick={onSelect}
      className={`relative isolate w-full text-left flex items-start gap-4 min-h-14 px-4 py-3 border rounded-input cursor-pointer transition-colors ${
        selected ? 'border-ink' : 'border-rule bg-sheet hover:border-ink-2'
      }`}
    >
      {selected && <span aria-hidden className="swipe absolute inset-0 -z-10" />}
      <kbd className={`font-mono text-[0.8rem] mt-1 w-5 shrink-0 ${selected ? 'text-on-mark' : 'text-ink-2'}`}>{index + 1}</kbd>
      <span className={selected ? 'text-on-mark' : ''}>
        <span className="block font-semibold">{label}</span>
        {hint && <span className={`block text-[0.9rem] ${selected ? 'text-on-mark' : 'text-ink-2'}`}>{hint}</span>}
      </span>
    </button>
  );
}
