import type { Kit } from '@/content/kits';

// Screenshot of each kit's live preview (public/kits/<slug>.jpg). Regenerate these when a kit's design changes.
export function KitThumb({ kit, priority = false }: { kit: Kit; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/kits/${kit.slug}.jpg`}
      alt={`${kit.name} design preview: ${kit.tagline}`}
      width={1072}
      height={520}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="w-full aspect-[1072/520] object-cover object-top border border-rule rounded-[6px] bg-sheet"
    />
  );
}
