import type { Metadata, Viewport } from 'next';
import { Schibsted_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { CornerShapes } from '@/components/shapes';
import { ScrollReveal } from '@/components/scroll-reveal';
import { JsonLd } from '@/components/json-ld';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL, abs } from '@/lib/site';

const sans = Schibsted_Grotesk({ subsets: ['latin'], variable: '--font-schibsted', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME}: ${SITE_TAGLINE}`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico', sizes: '48x48' }], apple: '/apple-touch-icon.png' },
  openGraph: { type: 'website', siteName: SITE_NAME, url: SITE_URL, title: `${SITE_NAME}: ${SITE_TAGLINE}`, description: SITE_DESCRIPTION },
  twitter: { card: 'summary_large_image', title: `${SITE_NAME}: ${SITE_TAGLINE}`, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f4f1' },
    { media: '(prefers-color-scheme: dark)', color: '#101512' },
  ],
};

const themeScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('ideazen:theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': abs('/#org'), name: SITE_NAME, url: SITE_URL, logo: abs('/icon-512.png') },
    { '@type': 'WebSite', '@id': abs('/#site'), url: SITE_URL, name: SITE_NAME, publisher: { '@id': abs('/#org') } },
    {
      '@type': 'WebApplication', name: SITE_NAME, url: SITE_URL, applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any', description: SITE_DESCRIPTION, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={siteSchema} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-30 focus:bg-mark focus:text-on-mark focus:px-4 focus:py-2">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="relative isolate overflow-x-clip">
          <CornerShapes />
          {children}
        </main>
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
