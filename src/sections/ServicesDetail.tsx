import { Car, Sparkles, Wand2, Wrench } from "lucide-react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { Photo } from "../components/ui/Photo";
import { CardCarousel } from "../components/ui/CardCarousel";
import { useMediaQuery } from "../hooks/useMediaQuery";

const categories = [
  {
    icon: Sparkles,
    title: "Interior Detailing",
    description: "Deep cleaning, vacuuming, upholstery, carpets, vents, stains, leather and odour treatment.",
    imageId: "service-interior",
  },
  {
    icon: Car,
    title: "Exterior Detailing",
    description: "Hand washing, wheels, tires, glass and exterior finishing.",
    imageId: "service-exterior",
  },
  {
    icon: Wand2,
    title: "Deep Cleaning",
    description: "Steam cleaning, extraction, pet hair, stains and hard-to-reach areas.",
    imageId: "service-deep-clean",
  },
  {
    icon: Wrench,
    title: "Additional Care",
    description: "Engine cleaning, polishing, headlight restoration and other available services.",
    imageId: "service-engine",
  },
];

type Category = (typeof categories)[number];

function ServiceCard({ cat }: { cat: Category }) {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-bg">
      <Photo imageId={cat.imageId} className="aspect-[4/3] w-full" />
      <div className="p-6">
        <cat.icon className="h-6 w-6 text-blue-bright" aria-hidden="true" />
        <h3 className="mt-3 font-heading text-lg font-semibold tracking-wide">{cat.title}</h3>
        <p className="mt-2 text-sm text-muted">{cat.description}</p>
      </div>
    </div>
  );
}

export function ServicesDetail() {
  // Below sm the grid collapses to a single column; swap to a swipeable
  // carousel there so the section doesn't become a long vertical stack.
  const stacks = useMediaQuery("(max-width: 639px)");

  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading title="MORE THAN A CLEAN CAR." />

        {stacks ? (
          <div className="mt-10">
            <CardCarousel
              items={categories}
              getKey={(cat) => cat.title}
              ariaLabel="Detailing services"
              itemNoun="service"
              renderCard={(cat) => <ServiceCard cat={cat} />}
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.08}>
                <ServiceCard cat={cat} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
