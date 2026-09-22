import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { BackLink } from "../components/ui/BackLink";
import { PackageComparison } from "../sections/PackageComparison";
import { BookingCTA } from "../sections/BookingCTA";

export function Packages() {
  return (
    <>
      <section className="bg-bg pb-10 pt-32 sm:pt-28">
        <Container>
          <BackLink />
          <SectionHeading
            as="h1"
            eyebrow="Packages"
            title="DETAILING PACKAGES"
            subtitle="Three levels of detail, built around what your vehicle actually needs."
          />
        </Container>
      </section>
      <PackageComparison />
      <BookingCTA />
    </>
  );
}
