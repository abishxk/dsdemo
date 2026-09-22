import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { Photo } from "../components/ui/Photo";
import { ScrollVelocityContainer, ScrollVelocityRow } from "../components/ui/ScrollVelocity";
import { workItems } from "../data/work";
import type { WorkItem } from "../types";

const TIER_LABEL: Record<string, string> = { silver: "Silver Package", gold: "Gold Package", diamond: "Diamond Package" };

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <div className="group mr-6 w-64 flex-shrink-0 whitespace-normal sm:w-72">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)]">
        <Photo
          imageId={item.imageId}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
      </div>
      <p className="mt-3 font-heading text-xs font-semibold uppercase tracking-wide text-blue-a11y">
        {TIER_LABEL[item.packageTier]}
      </p>
      <p className="mt-0.5 text-sm text-white/70">{item.note ?? item.vehicleLabel}</p>
    </div>
  );
}

export function RecentWork() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading
          title="RECENTLY AT D'S SPOTLESS"
          subtitle="A closer look at recent details, by package."
        />
      </Container>

      <Reveal delay={0.1} className="mt-10">
        {/* Breaks out of the page container to bleed edge-to-edge, with the
            track masked so cards fade in/out at the edges instead of being
            hard-cropped by the overflow. */}
        <div
          className="mx-[calc(50%-50vw)] w-screen [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          <ScrollVelocityContainer>
            <ScrollVelocityRow baseVelocity={10} direction={1} className="py-2">
              {workItems.map((item) => (
                <WorkCard key={item.id} item={item} />
              ))}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </div>
      </Reveal>
    </section>
  );
}
