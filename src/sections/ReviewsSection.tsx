import { Container } from "../components/ui/Container";
import { Reveal } from "../components/ui/Reveal";
import { StarRating } from "../components/ui/StarRating";
import { Button } from "../components/ui/Button";
import { BackLink } from "../components/ui/BackLink";
import { ReviewCardStack } from "../components/ui/ReviewCardStack";
import { business } from "../data/business";
import { reviews } from "../data/reviews";
import { cn } from "../lib/utils";

export function ReviewsSection({ as: Heading = "h2", alignTop = false }: { as?: "h1" | "h2"; alignTop?: boolean }) {
  return (
    <section
      id="reviews"
      className={cn(
        "scroll-mt-16 bg-bg sm:scroll-mt-20",
        // On Home this is one section among many, so it gets even padding on
        // both sides. As the standalone /reviews page's own header (alignTop),
        // it needs the exact same top padding as every other content page
        // (Packages/Work: pt-32 sm:pt-28) so the heading lands at the same
        // height everywhere — plus BackLink, which those pages also render as
        // the first thing inside that same padded block.
        alignTop ? "pb-16 pt-32 sm:pb-24 sm:pt-28" : "py-16 sm:py-24",
      )}
    >
      <Container>
        {alignTop && <BackLink />}
        {/* On Home, this sits mid-page among other sections, so centering the
            (shorter) text column against the (taller) review-card stack reads
            fine. On the standalone /reviews page it's the page's own H1 —
            centering there pushed the heading ~80px below where it should
            sit, reading as "huge padding" even though the padding itself was
            fine. `alignTop` swaps to top-alignment for that one case. */}
        <div className={cn("grid gap-10 lg:grid-cols-5 lg:gap-12", alignTop ? "lg:items-start" : "lg:items-center")}>
          <Reveal className="text-center lg:col-span-2 lg:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-a11y">Reviews</p>
            <Heading className="mt-3 font-heading text-4xl font-semibold leading-[1.05] tracking-wide text-balance sm:text-wrap lg:text-5xl">
              DON'T TAKE OUR WORD FOR IT.
            </Heading>

            <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
              <span className="font-heading text-4xl font-semibold tracking-wide">{business.rating}</span>
              <div className="text-left">
                <StarRating rating={business.rating} />
                <p className="mt-1 text-xs text-muted">{business.reviewCount} reviews</p>
              </div>
            </div>

            <Button as="a" href={business.reviewsUrl} target="_blank" rel="noreferrer" variant="outline" size="sm" className="mt-7">
              See Customer Reviews
            </Button>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <ReviewCardStack reviews={reviews} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
