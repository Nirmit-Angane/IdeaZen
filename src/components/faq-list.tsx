import { FAQ } from '@/content/faq';
import { JsonLd } from './json-ld';

/** Native <details>: keyboard accessible, no JS, and the answers are in the HTML for crawlers. */
export function FaqList({ limit, schema = true }: { limit?: number; schema?: boolean }) {
  const items = FAQ.slice(0, limit);
  return (
    <>
      {schema && <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />}
      <div className="border-t border-rule">
        {items.map((f) => (
          <details key={f.q} className="border-b border-rule group">
            <summary className="cursor-pointer min-h-12 py-3 font-semibold list-none flex justify-between gap-4 items-center">
              {f.q}
              <span aria-hidden className="font-mono text-ink-2 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="pb-4 text-ink-2 prose-spec">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
