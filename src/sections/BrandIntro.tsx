import { ArrowRight } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { useMediaQuery } from "../hooks/useMediaQuery";

export function BrandIntro() {
  // The packages section is the very next thing on this page, so on mobile
  // the button scrolls straight to it instead of navigating to the separate
  // /packages page. Desktop keeps the original navigation.
  const isMobile = useMediaQuery("(max-width: 639px)");

  return (
    <section className="bg-bg py-14 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <h2 className="font-heading text-4xl font-semibold leading-[1.05] tracking-wide lg:text-5xl">
              DETAIL IS IN
              <br />
              THE NAME.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-pretty text-muted sm:text-wrap">
              From everyday drivers to family SUVs, trucks and premium vehicles, D's Spotless focuses on the
              details that make a vehicle feel clean, refreshed and cared for.
            </p>
            {isMobile ? (
              <Button
                as="a"
                href="#packages"
                variant="ghost"
                className="mt-6 px-0 hover:bg-transparent hover:text-blue-a11y"
              >
                Explore Our Packages <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                as="link"
                to="/packages"
                variant="ghost"
                className="mt-6 px-0 hover:bg-transparent hover:text-blue-a11y"
              >
                Explore Our Packages <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
