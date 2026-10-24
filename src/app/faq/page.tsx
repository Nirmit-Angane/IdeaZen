import type { Metadata } from 'next';
import { Container } from '@/components/ui';
import { FaqList } from '@/components/faq-list';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers about IdeaZen: cost, accounts, how plans are generated, accuracy, privacy and the hackathon planner.',
  alternates: { canonical: '/faq' },
};

export default function Page() {
  return (
    <Container className="py-14 max-w-3xl">
      <h1 className="text-3xl sm:text-5xl mb-8">Frequently asked questions</h1>
      <FaqList />
    </Container>
  );
}
