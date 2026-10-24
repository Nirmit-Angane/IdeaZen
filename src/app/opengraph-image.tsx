import { ImageResponse } from 'next/og';

export const alt = 'IdeaZen: project ideas with build plans';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: '#f3f4f1', color: '#14201a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 40, fontWeight: 700 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="12" fill="#14201a" />
            <path d="M17 18H47L17 46H47" fill="none" stroke="#f3f4f1" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx="17" cy="18" r="5.5" fill="#14201a" stroke="#f3f4f1" strokeWidth="3.5" />
            <circle cx="47" cy="18" r="5.5" fill="#14201a" stroke="#f3f4f1" strokeWidth="3.5" />
            <circle cx="17" cy="46" r="5.5" fill="#14201a" stroke="#f3f4f1" strokeWidth="3.5" />
            <circle cx="47" cy="46" r="7" fill="#f5d547" />
          </svg>
          IdeaZen
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, marginTop: 24, display: 'flex', flexWrap: 'wrap' }}>
          <span>Get a project plan&nbsp;</span>
          <span style={{ background: '#f5d547', padding: '0 12px' }}>you can start today</span>
        </div>
        <div style={{ fontSize: 32, marginTop: 36, color: '#48554e' }}>Features, roadmap and first commit for your level, stack and time.</div>
      </div>
    ),
    size,
  );
}
