import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { BackLink } from "../components/ui/BackLink";
import { RecentWork } from "../sections/RecentWork";
import { GallerySection } from "../sections/GallerySection";
import { BookingCTA } from "../sections/BookingCTA";

export function Work() {
  return (
    <>
      <section className="bg-bg pb-4 pt-32 sm:pt-28">
        <Container>
          <BackLink />
          <SectionHeading
            as="h1"
            eyebrow="Our Work"
            title="OUR WORK"
            subtitle="A look at the kinds of vehicles and packages we work on — from everyday drivers to premium SUVs and trucks."
          />
        </Container>
      </section>
      <RecentWork />
      <GallerySection />
      <BookingCTA />
    </>
  );
}
