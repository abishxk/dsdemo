import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-bg pt-24">
      <Container className="text-center">
        <p className="font-heading text-sm uppercase tracking-[0.2em] text-blue-a11y">404</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-wide">Page not found</h1>
        <p className="mt-3 text-muted">The page you're looking for doesn't exist.</p>
        <Button as="link" to="/" className="mt-8">
          Back to Home
        </Button>
      </Container>
    </section>
  );
}
