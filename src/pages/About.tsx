import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { BackLink } from "../components/ui/BackLink";
import { WhyUs } from "../sections/WhyUs";
import { ServicesDetail } from "../sections/ServicesDetail";
import { LocationSection } from "../sections/LocationSection";
import { BookingCTA } from "../sections/BookingCTA";
import { BeforeAfterSlider } from "../components/ui/BeforeAfterSlider";

export function About() {
  return (
    <>
      <section className="bg-bg pb-20 pt-32 sm:pt-28">
        <Container>
          <BackLink />
          {/* items-start, not items-center: the photo column is taller than
              the text column, and centering pulled the H1 well below where
              it sits on every other page (Packages/Work start it right at
              the top of the content area). */}
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            {/* No extra Reveal here — SectionHeading already wraps itself in
                one. A second, outer Reveal was doubling up the entrance
                transform for no visual benefit, and was the one remaining
                thing keeping this column from lining up with Packages/Work. */}
            <SectionHeading
              as="h1"
              eyebrow="About"
              title="DETAIL IS IN THE NAME."
              subtitle="D's Spotless Auto Detailing is a Toronto-based detailing studio focused on the details that make a vehicle feel clean, refreshed and cared for — from everyday drivers to family SUVs, trucks and premium vehicles."
            />
            <Reveal delay={0.1}>
              <BeforeAfterSlider beforeImageId="before-dirty-suv" afterImageId="clean-suv" />
            </Reveal>
          </div>
        </Container>
      </section>
      <ServicesDetail />
      <WhyUs />
      <LocationSection />
      <BookingCTA />
    </>
  );
}
