import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { Photo } from "../components/ui/Photo";
import { InstagramIcon } from "../components/ui/InstagramIcon";
import { business } from "../data/business";
import { galleryItems } from "../data/gallery";

export function InstagramSection() {
  const featured = galleryItems.slice(0, 6);

  return (
    <section className="bg-bg py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={business.instagramHandle} title="FOLLOW THE WORK." subtitle="See the latest vehicles, detailing work and package highlights." />
          <Reveal>
            <Button as="a" href={business.instagramUrl} target="_blank" rel="noreferrer" variant="outline">
              <InstagramIcon className="h-4 w-4" /> View Instagram
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-lg"
              >
                <Photo imageId={item.imageId} className="aspect-square w-full transition-transform duration-500 hover:scale-105" />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
