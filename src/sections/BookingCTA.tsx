import { Container } from "../components/ui/Container";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { Photo } from "../components/ui/Photo";

export function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <Photo imageId="hero-alt" className="absolute inset-0 h-full w-full opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/70" />

      <Container className="relative text-center">
        <Reveal>
          <h2 className="font-heading text-4xl font-semibold tracking-wide text-balance sm:text-wrap sm:text-5xl lg:text-6xl">
            READY TO MAKE IT SPOTLESS?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted">
            Tell us about your vehicle and the level of detailing you're looking for.
          </p>
          <Button as="link" to="/book" size="lg" className="mt-8">
            Book an Appointment
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
