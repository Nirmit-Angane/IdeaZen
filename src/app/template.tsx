// Unlike layout.tsx, a template remounts on every navigation, so each page gets the enter animation.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
