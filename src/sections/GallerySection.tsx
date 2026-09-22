import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { GalleryGrid } from "../components/ui/GalleryGrid";

export function GallerySection() {
  return (
    <section className="bg-bg py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Gallery" title="THE WORK SPEAKS FOR ITSELF." />
      </Container>
      <Reveal delay={0.1} className="mt-10">
        <GalleryGrid />
      </Reveal>
    </section>
  );
}
