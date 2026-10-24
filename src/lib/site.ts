export const SITE_NAME = 'IdeaZen';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ideazen.vercel.app').replace(/\/$/, '');
export const SITE_TAGLINE = 'Project ideas with build plans';
export const SITE_DESCRIPTION =
  'Free tool that turns your skill level, tech stack and available time into a project spec: features, tech stack, a phased roadmap and a first-commit guide. Includes an hour-by-hour hackathon planner.';

export const abs = (path: string) => `${SITE_URL}${path}`;
