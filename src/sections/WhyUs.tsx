import { ArrowRight, Gauge, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { CardCarousel } from "../components/ui/CardCarousel";
import { business } from "../data/business";
import { useMediaQuery } from "../hooks/useMediaQuery";

const features = [
  {
    icon: ShieldCheck,
    title: "Attention to Detail",
    description: "Thorough cleaning that goes beyond the obvious — see it for yourself in our recent work.",
    to: "/work",
    cta: "See recent work",
  },
  {
    icon: Gauge,
    title: "Deep Cleaning",
    description: "Packages designed for everything from routine refreshes to intensive interior cleaning.",
    to: "/packages",
    cta: "Compare packages",
  },
  {
    icon: SlidersHorizontal,
    title: "Built Around Your Vehicle",
    description: "Choose the level of detailing that fits your vehicle's needs.",
    to: "/book",
    cta: "Start your booking",
  },
];

type Feature = (typeof features)[number];

function FeatureCard({ f, index }: { f: Feature; index: number }) {
  return (
    <Link
      to={f.to}
      className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-bg p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-bright/30 hover:shadow-[0_20px_40px_-24px_rgba(40,100,255,0.35)]"
    >
      <span className="absolute right-5 top-5 font-heading text-xs tracking-wide text-white/20 transition-colors duration-300 group-hover:text-blue-bright/50">
        0{index + 1}
      </span>

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-bright/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-bright/20">
        <f.icon
          className="h-6 w-6 text-blue-bright transition-transform duration-300 group-hover:rotate-6"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-5 font-heading text-lg font-semibold tracking-wide">{f.title}</h3>
      <p className="mt-2 flex-1 text-sm text-pretty text-muted sm:text-wrap">{f.description}</p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-blue-a11y">
        {f.cta}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export function WhyUs() {
  // Below sm the grid collapses to a single column; swap to a swipeable
  // carousel there so the section doesn't become a long vertical stack.
  const stacks = useMediaQuery("(max-width: 639px)");

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface py-16 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #2864FF, transparent 70%)" }}
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Why D's Spotless"
          title="DETAIL IS IN THE DIFFERENCE."
          subtitle={`Backed by a ${business.rating}★ rating from ${business.reviewCount} customers — every package built around what your vehicle actually needs.`}
          align="center"
        />

        {stacks ? (
          <div className="mt-12">
            <CardCarousel
              items={features}
              getKey={(f) => f.title}
              ariaLabel="Why D's Spotless"
              renderCard={(f, i) => <FeatureCard f={f} index={i} />}
            />
          </div>
        ) : (
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <FeatureCard f={f} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
