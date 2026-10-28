import { kitFontClasses } from '@/lib/kit-fonts';

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return <div className={kitFontClasses}>{children}</div>;
}
