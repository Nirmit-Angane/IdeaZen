import { ButtonLink, Container } from '@/components/ui';

export default function NotFound() {
  return (
    <Container className="py-24 max-w-xl">
      <h1 className="text-4xl">Page not found</h1>
      <p className="mt-3 text-ink-2">That address does not exist. Plans you made are saved in the browser you made them in, so a plan link will not open on another device.</p>
      <div className="mt-6 flex gap-3 flex-wrap">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/ideas" variant="secondary">Browse ideas</ButtonLink>
      </div>
    </Container>
  );
}
