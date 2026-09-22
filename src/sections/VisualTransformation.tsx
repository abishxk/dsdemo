import { Container } from "../components/ui/Container";
import { Reveal } from "../components/ui/Reveal";
import { BeforeAfterSlider } from "../components/ui/BeforeAfterSlider";

export function VisualTransformation() {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.05} className="order-2 lg:order-1">
            <BeforeAfterSlider beforeImageId="before-dirty-suv" afterImageId="clean-suv" />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <h2 className="font-heading text-4xl font-semibold leading-[1.05] tracking-wide lg:text-5xl">
              SEE THE
              <br />
              DIFFERENCE.
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted">
              From deep interior cleaning to a finished exterior, every detail matters. Drag the
              slider to compare.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
