import { Bricolage_Grotesque, DM_Sans, Figtree, Geist, Geist_Mono, IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from 'next/font/google';

// Fonts used only by the live design-kit previews under /design. Loaded by those pages, not site-wide.
const plex = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-plex', display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono', display: 'swap' });
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader', display: 'swap' });
const dmsans = DM_Sans({ subsets: ['latin'], variable: '--font-dmsans', display: 'swap' });
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });
const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' });

export const kitFontClasses = [plex, plexMono, newsreader, dmsans, geist, geistMono, bricolage, figtree].map((f) => f.variable).join(' ');
