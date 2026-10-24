import type { MetadataRoute } from 'next';
import { IDEAS, comboPages, stackPages } from '@/content/ideas';
import { GUIDES } from '@/content/guides';
import { abs } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number) => ({ url: abs(path), priority });
  return [
    page('/', 1),
    page('/generate', 0.9),
    page('/hackathon', 0.9),
    page('/ideas', 0.8),
    page('/guides', 0.7),
    page('/faq', 0.5),
    page('/about', 0.4),
    page('/privacy', 0.2),
    ...stackPages().map((s) => page(`/project-ideas/${s}`, 0.7)),
    ...comboPages().map((c) => page(`/project-ideas/${c.stack}/${c.level}`, 0.7)),
    ...IDEAS.map((i) => page(`/ideas/${i.slug}`, 0.6)),
    ...GUIDES.map((g) => page(`/guides/${g.slug}`, 0.6)),
  ];
}
