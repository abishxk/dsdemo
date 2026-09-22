import { MapPin, Navigation, Phone } from "lucide-react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { StaticMap } from "../components/ui/StaticMap";
import { business, fullAddress } from "../data/business";

export function LocationSection() {
  return (
    <section id="location" className="scroll-mt-16 border-t border-white/5 bg-surface py-16 sm:scroll-mt-20 sm:py-24">
      <Container>
        <SectionHeading title="FIND US IN TORONTO" />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <StaticMap className="aspect-[4/3] w-full rounded-2xl lg:aspect-auto lg:h-full" />
          </Reveal>

          {/* 32px of padding inside a 341px phone column squeezed the address onto
              a "…M6H / 2A4" orphan line; 24px on mobile only gives it room. */}
          <Reveal delay={0.1} className="flex flex-col justify-center rounded-2xl border border-white/10 bg-bg p-6 sm:p-8">
            <p className="font-heading text-xl font-semibold tracking-[0.04em]">{business.legalName}</p>
            <div className="mt-4 flex items-start gap-3 text-white/80">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-bright" aria-hidden="true" />
              <p className="text-balance sm:text-wrap">{fullAddress}</p>
            </div>
            <div className="mt-3 flex items-center gap-3 text-white/80">
              <Phone className="h-5 w-5 flex-shrink-0 text-blue-bright" aria-hidden="true" />
              <p>{business.phone}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button as="a" href={`tel:${business.phoneHref}`} variant="secondary" size="md">
                <Phone className="h-4 w-4" /> Call Now
              </Button>
              <Button
                as="a"
                href={business.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="md"
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
