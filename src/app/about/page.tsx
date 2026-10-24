import type { Metadata } from 'next';
import { ButtonLink, Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About',
  description: 'IdeaZen helps developers choose a project, plan it in phases, and finish it. What it does and how it is built.',
  alternates: { canonical: '/about' },
};

export default function Page() {
  return (
    <Container className="py-14 max-w-3xl">
      <h1 className="text-3xl sm:text-5xl">About IdeaZen</h1>
      <div className="mt-6 space-y-4 prose-spec">
        <p>IdeaZen helps developers get from "what should I build?" to a first commit. You answer a few questions and get a project plan: features, a tech stack, a roadmap in phases with concrete tasks, and the commands for your first commit.</p>
        <p>There is also a hackathon planner that turns an idea, a team and a deadline into an hour-by-hour plan with a list of what to cut when time runs short.</p>
        <h2 className="text-2xl pt-4">How it works</h2>
        <p>Plans are written by a language model (Llama 3.3 70B through Groq) from your answers. The idea library and guides are written by hand. Everything you save stays in your own browser; there are no accounts.</p>
        <h2 className="text-2xl pt-4">What to keep in mind</h2>
        <p>AI-written plans can contain mistakes, including wrong links and optimistic time estimates. Use them as a starting point and check what matters.</p>
      </div>
      <div className="mt-8"><ButtonLink href="/generate">Generate a project</ButtonLink></div>
    </Container>
  );
}
