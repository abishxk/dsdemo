import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { PackageCard } from "../components/ui/PackageCard";
import { Button } from "../components/ui/Button";
import { packages } from "../data/packages";
import { useMediaQuery } from "../hooks/useMediaQuery";

export function PackagesPreview() {
  // The comparison table sits far down the packages page — useful to jump
  // straight to on desktop, but on mobile (where the page is already a long
  // scroll) landing at the top, where the packages page's own heading and
  // context are, reads better than dropping in mid-page.
  const isMobile = useMediaQuery("(max-width: 639px)");

  return (
    // id + scroll-mt: the target for BrandIntro's "Explore Our Packages" link
    // on mobile, which scrolls here instead of navigating to /packages
    // (this section is already the very next thing on the page).
    <section id="packages" className="scroll-mt-16 border-t border-white/5 bg-bg py-16 sm:scroll-mt-20 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Packages"
          title="CHOOSE YOUR DETAIL"
          subtitle="From the essential refresh to a complete deep clean."
        />

        {/* Deliberately a stack (not a carousel) on small screens: this
            section's job is comparison, so all three tiers stay visible.
            PackageCard trims its own feature list on mobile to keep the
            stack short. */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <PackageCard pkg={pkg} key={pkg.id} delay={i * 0.1} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button as="link" to={isMobile ? "/packages" : "/packages#comparison"} variant="outline" size="md">
            See Everything In Detail
          </Button>
        </div>
      </Container>
    </section>
  );
}
