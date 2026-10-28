// Hand-designed style kits. Each is an original look (not a copy of any brand) with exact tokens,
// so an AI coding tool has concrete rules to follow instead of falling back on its default style.

export type KitCategory = 'Web app' | 'Landing page';

export interface Kit {
  slug: string;
  name: string;
  category: KitCategory;
  tagline: string;
  bestFor: string[];
  dark?: boolean;
  /** CSS variable name of the next/font family used in the live preview */
  fontVar: { display: string; body: string; mono: string };
  fonts: { display: string; body: string; mono: string };
  tokens: { bg: string; surface: string; ink: string; muted: string; line: string; accent: string; accentInk: string; accent2?: string;
    /** Border for inputs and controls. Must reach 3:1 against bg and surface (WCAG 1.4.11); `line` is for decorative dividers only. */
    control: string;
    /** Error text and borders. Must reach 4.5:1 on bg and surface. */
    danger: string };
  shape: { radius: string; border: string; shadow: string };
  density: string;
  scale: { type: string; space: string };
  principles: string[];
  components: Record<string, string>;
  layout: string[];
  motion: string;
  avoid: string[];
}

export const KITS: Kit[] = [
  {
    slug: 'ledger',
    name: 'Ledger',
    category: 'Web app',
    tagline: 'Dense, calm dashboards for data you read all day.',
    bestFor: ['Analytics and admin dashboards', 'Finance and inventory tools', 'Internal tools with tables'],
    fontVar: { display: 'var(--font-plex)', body: 'var(--font-plex)', mono: 'var(--font-plex-mono)' },
    fonts: { display: 'IBM Plex Sans', body: 'IBM Plex Sans', mono: 'IBM Plex Mono' },
    tokens: { bg: '#F4F6F8', surface: '#FFFFFF', ink: '#0F1B2D', muted: '#5A6B80', line: '#D6DDE6', accent: '#0E7C86', accentInk: '#FFFFFF', control: '#6B7C93', danger: '#B42318' },
    shape: { radius: '4px', border: '1px', shadow: 'none' },
    density: 'Compact. 4px spacing base, 32px table rows, 14px body text.',
    scale: { type: '12 / 14 / 16 / 20 / 24 px. Body 14px, line height 1.5, headings semibold.', space: '4, 8, 12, 16, 24, 32, 48 px' },
    principles: [
      'Information first: numbers and tables are the design. Chrome stays quiet.',
      'One accent color (teal) marks the single most important action or value on a screen.',
      'Separate regions with 1px lines and background steps, never shadows.',
      'Right-align numbers, use the mono font for figures and IDs so columns line up.',
      'Show state with text plus color (a label and a dot), never color alone.',
    ],
    components: {
      Button: 'Primary: teal fill, white text, 32px tall, 4px radius. Secondary: 1px line border, ink text. No icons-only primary buttons.',
      Card: 'White surface on the grey page, 1px line border, 4px radius, 16px padding, no shadow. Title 14px semibold, optional muted caption.',
      Input: '32px tall, 1px line border, 4px radius, teal 2px focus ring. Label above in 12px muted.',
      Table: '32px rows, 1px line between rows, sticky header in muted 12px, numeric columns right-aligned in mono, row hover is a 4% ink tint.',
      Stat: 'Large mono number (24px), muted label beneath, small delta with an arrow and sign. Never a gauge or donut for a single number.',
      Navigation: 'Left sidebar 220px, text links with 16px icons, the active item has a 2px teal bar on its left edge.',
      Badge: 'Square-ish (2px radius), 12px text, tinted background plus a leading dot.',
    },
    layout: ['App shell: fixed 220px sidebar, 48px top bar, content max 1280px.', '12-column grid with 16px gutters; stat row on top, then table or chart.', 'Charts: one hue per chart plus grey; thin 1.5px lines; label directly on the line instead of a legend when possible.'],
    motion: 'Almost none. 120ms colour transitions on hover. Skeleton rows while loading; no page animations.',
    avoid: ['Gradients, glows and glassmorphism', 'Large rounded cards with soft shadows', 'Emoji or multicolour icons', 'Purple or blue-violet accents', 'Centered text blocks', 'Donut charts for anything with more than 4 slices'],
  },
  {
    slug: 'marginalia',
    name: 'Marginalia',
    category: 'Web app',
    tagline: 'A reading-and-writing app that feels like a well-set page.',
    bestFor: ['Notes, docs and journaling apps', 'Learning and study tools', 'Content and publishing tools'],
    fontVar: { display: 'var(--font-newsreader)', body: 'var(--font-dmsans)', mono: 'var(--font-plex-mono)' },
    fonts: { display: 'Newsreader', body: 'DM Sans', mono: 'IBM Plex Mono' },
    tokens: { bg: '#F6F6F3', surface: '#FFFFFF', ink: '#1F1F1F', muted: '#6B6B66', line: '#E1E0DA', accent: '#C2255C', accentInk: '#FFFFFF', control: '#85847D', danger: '#A8260F' },
    shape: { radius: '2px', border: '1px', shadow: 'none' },
    density: 'Roomy. 8px spacing base, 18px body text with 1.65 line height, content column 68ch.',
    scale: { type: '15 / 17 / 20 / 26 / 36 / 48 px. Body 17 to 18px, line height 1.65, titles in the serif.', space: '4, 8, 16, 24, 32, 48, 96 px' },
    principles: [
      'The text is the interface. Give it room and a comfortable measure (60 to 70 characters).',
      'Serif headings give the app a voice; the sans body keeps controls clear.',
      'Raspberry is used sparingly: links, the active item and one primary action.',
      'Prefer underlines and spacing to boxes. Few borders, no shadows.',
      'Writing surfaces are distraction-free: hide controls until they are needed.',
    ],
    components: {
      Button: 'Primary: raspberry fill, white text, 40px tall, 2px radius. Secondary: text with an underline on hover. Keep labels as verbs ("Save note").',
      Card: 'Avoid cards. List items are separated by a 1px line and 16px vertical padding. Where a panel is needed: white surface, 1px line.',
      Input: 'Borderless on the page background with a 1px bottom line that turns raspberry on focus. Large (18px) for titles.',
      Editor: 'Single column, 68ch, serif title at 36px, body 18px. Floating toolbar appears on text selection only.',
      Navigation: 'Slim left list of documents (260px) in 15px sans; the active document is bold with a raspberry 2px left rule. Top bar holds only search and the account.',
      Tag: 'Plain muted text with a leading "#". No filled pills.',
    },
    layout: ['Two columns: document list (260px) and the page (centered, 68ch max).', 'Generous top margin (96px) above the document title.', 'Settings and secondary views open as full pages, not modals.'],
    motion: 'Subtle. 150ms fades when switching documents. Respect reduced motion.',
    avoid: ['Card grids for lists of documents', 'Filled colourful tags', 'Drop shadows and heavy borders', 'Cream backgrounds with terracotta accents (a common default)', 'Sans-serif for large titles', 'Toolbars that are always visible'],
  },
  {
    slug: 'night-shift',
    name: 'Night Shift',
    category: 'Web app',
    dark: true,
    tagline: 'A dark, keyboard-first look for tools developers live in.',
    bestFor: ['Developer tools and CLIs with a web UI', 'API dashboards and log viewers', 'Command-palette driven apps'],
    fontVar: { display: 'var(--font-geist)', body: 'var(--font-geist)', mono: 'var(--font-geist-mono)' },
    fonts: { display: 'Geist', body: 'Geist', mono: 'Geist Mono' },
    tokens: { bg: '#0C1118', surface: '#141B25', ink: '#DCE6F2', muted: '#8393A7', line: '#243041', accent: '#FFB020', accentInk: '#1A1200', control: '#5F7189', danger: '#FF7B72' },
    shape: { radius: '6px', border: '1px', shadow: 'none' },
    density: 'Compact-medium. 4px spacing base, 36px rows, 14px text, mono for anything the user might copy.',
    scale: { type: '12 / 13 / 14 / 16 / 20 / 28 px. Body 14px, code 13px, line height 1.5.', space: '4, 8, 12, 16, 24, 32 px' },
    principles: [
      'Keyboard first: every action has a shortcut, shown in the UI as a small key chip.',
      'Dark slate surfaces with amber as the only accent; never use pure black or pure white.',
      'Mono type for code, commands, IDs and timestamps; sans for everything else.',
      'Depth comes from surface steps (bg, surface, raised) and 1px lines, not shadows.',
      'Status uses colour plus a text label: green, amber, red kept low-saturation.',
    ],
    components: {
      Button: 'Primary: amber fill, dark text, 32px, 6px radius. Secondary: surface fill with line border. Show the shortcut in a key chip at the right of the label.',
      Card: 'Surface background, 1px line border, 6px radius, 16px padding. Header row with mono title.',
      Input: 'Dark surface, 1px line border, amber 2px focus ring, mono text for code fields.',
      CommandPalette: 'Centered 560px panel, search input on top, results with the matched letters in amber, keys on the right. Opens with Cmd/Ctrl+K.',
      CodeBlock: 'Raised surface, mono 13px, copy button top right, line numbers in muted.',
      Navigation: 'Thin left rail with icons and tooltips, or a top tab row. Active item gets an amber underline.',
      Badge: 'Mono 12px, 1px border in the status colour, transparent fill.',
    },
    layout: ['Full-bleed app, no max width for log and table views; 720px max for forms.', 'Split panes where useful (list left, detail right), resizable.', 'Sticky headers on long tables and logs.'],
    motion: 'Instant. Only a 100ms fade for the command palette. No decorative animation.',
    avoid: ['Neon glows and gradients', 'Pure black (#000) or pure white (#fff)', 'Acid-green terminal clichés', 'Rounded pill buttons', 'Icons without labels or tooltips', 'Light-mode-only previews'],
  },
  {
    slug: 'launchpad',
    name: 'Launchpad',
    category: 'Landing page',
    tagline: 'A bold, confident landing page with hard edges and one loud colour.',
    bestFor: ['SaaS and product landing pages', 'Launch and waitlist pages', 'Hackathon and event sites'],
    fontVar: { display: 'var(--font-bricolage)', body: 'var(--font-figtree)', mono: 'var(--font-plex-mono)' },
    fonts: { display: 'Bricolage Grotesque', body: 'Figtree', mono: 'IBM Plex Mono' },
    tokens: { bg: '#FFFFFF', surface: '#F2F4FF', ink: '#0A0A23', muted: '#4B4B6B', line: '#0A0A23', accent: '#2748FF', accentInk: '#FFFFFF', accent2: '#FFD23F', control: '#0A0A23', danger: '#C4161C' },
    shape: { radius: '14px', border: '2px', shadow: '4px 4px 0 #0A0A23' },
    density: 'Spacious. 8px base, sections 96 to 128px apart, hero headline 64 to 88px.',
    scale: { type: '16 / 18 / 24 / 32 / 48 / 72 / 88 px. Body 16 to 18px, display line height 1.02 to 1.1, tight tracking.', space: '8, 16, 24, 32, 64, 96, 128 px' },
    principles: [
      'One idea per section. Each section has a headline a stranger could understand in 3 seconds.',
      'Blue is the brand colour, yellow is the highlight. Use yellow on at most one phrase per screen.',
      '2px ink borders and a hard offset shadow (no blur) give every interactive block the same tactile feel.',
      'Big, tight display type (Bricolage) against calm body copy (Figtree).',
      'Show the product early: a real screenshot or live demo above the fold, not an illustration.',
    ],
    components: {
      Button: 'Primary: blue fill, white text, 2px ink border, 14px radius, hard 4px shadow; on hover it moves 2px and the shadow shrinks to 2px. Secondary: white fill, same border.',
      Card: 'Surface (#F2F4FF) fill, 2px ink border, 14px radius, hard shadow. Content aligned left.',
      Input: '48px tall, 2px ink border, 10px radius, blue focus ring. Pair with a primary button on the same row for sign-ups.',
      Hero: 'Left-aligned headline (64 to 88px), one sentence of support, primary and secondary buttons, product screenshot on the right with the same border and shadow.',
      Feature: 'Three blocks maximum per row. Each: a short bold heading, two lines of text, optional tiny screenshot. No icon-in-a-circle.',
      Pricing: 'Two or three plans as bordered cards; the recommended one has the yellow highlight on its price.',
      Footer: 'Ink background with white text, simple link columns, one repeated call to action.',
    },
    layout: ['Max width 1120px, 12 columns, left-aligned text.', 'Sections alternate white and surface backgrounds; no full-bleed gradients.', 'Sticky top nav: logo, 3 links, one primary button.'],
    motion: 'One moment on load (hero headline slides in). Buttons respond to hover and press. Nothing animates on scroll except a single reveal per section.',
    avoid: ['Purple-to-blue gradients', 'Soft blurred shadows and glassmorphism', 'Stock illustrations of people at laptops', 'Icon-in-circle feature trios', 'Centred paragraphs', 'More than one highlighted phrase per screen'],
  },
];

export const getKit = (slug: string) => KITS.find((k) => k.slug === slug);
