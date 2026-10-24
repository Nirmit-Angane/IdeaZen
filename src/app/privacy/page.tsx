import type { Metadata } from 'next';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What data IdeaZen sends, what it stores, and where. No accounts and no tracking cookies.',
  alternates: { canonical: '/privacy' },
};

export default function Page() {
  return (
    <Container className="py-14 max-w-3xl">
      <h1 className="text-3xl sm:text-5xl">Privacy</h1>
      <div className="mt-6 space-y-4 prose-spec">
        <h2 className="text-2xl pt-2">What is sent</h2>
        <p>When you generate a plan, your answers and any project title you type are sent to our server and on to Groq, the AI provider, to produce the text. Do not enter secrets or personal data in those fields.</p>
        <h2 className="text-2xl pt-4">What is stored</h2>
        <p>Saved plans, task progress and your theme choice are stored in your browser (localStorage). They are not uploaded. Clearing site data deletes them, so use Backup on the Saved page if you want a copy.</p>
        <p>Our server keeps no database of your plans. Our host may keep short-lived request logs (such as IP address and time) for security and abuse prevention, and we use your IP address to rate limit requests.</p>
        <h2 className="text-2xl pt-4">Share links</h2>
        <p>A share link contains the whole plan inside the part of the address after the # sign. Browsers do not send that part to servers, but anyone who has the link can read the plan, and it may remain in chat or browser history.</p>
        <h2 className="text-2xl pt-4">Cookies and analytics</h2>
        <p>IdeaZen sets no cookies. There is no advertising or cross-site tracking.</p>
      </div>
    </Container>
  );
}
