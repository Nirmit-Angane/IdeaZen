import type { MetadataRoute } from 'next';
import { SITE_URL, abs } from '@/lib/site';

// AI crawlers are allowed on purpose so answers can cite public pages. Remove entries to opt out.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/spec/', '/s', '/saved', '/generate/ideas', '/generate/build', '/hackathon/plan/'] }],
    sitemap: abs('/sitemap.xml'),
    host: SITE_URL,
  };
}
