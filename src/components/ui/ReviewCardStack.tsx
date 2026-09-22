import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { StarRating } from "./StarRating";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { Review } from "../../types";

interface ReviewCardStackProps {
  reviews: Review[];
}

const VISIBLE_DEPTH = 3;

// Progressive offset per card depth (front = 0). Kept intentionally modest
// so behind cards read as a subtle stack, not a scattered pile, and stay
// well clear of the viewport edge on mobile.
const OFFSETS = [
  { x: 0, y: 0, scale: 1, rotate: 0 },
  { x: 16, y: 14, scale: 0.96, rotate: -2.5 },
  { x: 30, y: 26, scale: 0.92, rotate: 3 },
];

// Off-canvas resting spot for the card one step *behind* the active one.
// Kept mounted (invisible) so stepping backward has something already in
// the DOM to animate in from, instead of popping in with no transition.
const PREV_HIDDEN_OFFSET = { x: -70, y: 10, scale: 0.88, rotate: -6 };

/**
 * Premium editorial testimonial stack: one front card, two cards visibly
 * offset behind it (diagonal stack, slight scale/rotation). Front card
 * supports drag-to-swipe; arrows and a counter drive the same index.
 */
export function ReviewCardStack({ reviews }: ReviewCardStackProps) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const total = reviews.length;

  function step(delta: number) {
    setActive((prev) => ((prev + delta) % total + total) % total);
  }

  function handleDragEnd(_event: unknown, info: { offset: { x: number }; velocity: { x: number } }) {
    const { offset, velocity } = info;
    if (offset.x < -80 || velocity.x < -500) step(1);
    else if (offset.x > 80 || velocity.x > 500) step(-1);
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Customer reviews"
        aria-roledescription="carousel"
        aria-live="polite"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
        className="relative h-[380px] w-full max-w-[640px] outline-none focus-visible:ring-2 focus-visible:ring-blue-bright sm:h-[360px]"
      >
        {reviews.map((review, i) => {
          const diff = (i - active + total) % total;
          const isPrev = total > VISIBLE_DEPTH && diff === total - 1;
          if (diff >= VISIBLE_DEPTH && !isPrev) return null;
          const isFront = diff === 0;
          const offset = isPrev ? PREV_HIDDEN_OFFSET : OFFSETS[diff];

          return (
            <motion.div
              key={i}
              className={cn(
                "absolute inset-0 flex flex-col rounded-2xl border border-white/10 bg-surface p-7 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)] sm:p-8",
                isFront && "cursor-grab active:cursor-grabbing",
              )}
              style={{ zIndex: isPrev ? -1 : VISIBLE_DEPTH - diff }}
              initial={false}
              animate={{
                x: reduced ? 0 : offset.x,
                y: reduced ? 0 : offset.y,
                scale: reduced ? 1 : offset.scale,
                rotate: reduced ? 0 : offset.rotate,
                opacity: isPrev ? 0 : diff === 0 ? 1 : 1 - diff * 0.28,
              }}
              transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={isFront ? handleDragEnd : undefined}
              aria-hidden={!isFront}
            >
              <Quote className="h-5 w-5 flex-shrink-0 text-blue-bright/50" aria-hidden="true" />
              <StarRating rating={review.rating} className="mt-3" />
              <div className="mt-4 flex flex-1 items-center">
                {/* The narrow phone column needs up to 8 lines for the longest
                    review; five cut people off mid-sentence. The card already
                    has the height for it, so nothing grows. */}
                <p className="line-clamp-8 text-[15px] leading-relaxed text-white/85 sm:line-clamp-5">
                  "{review.text}"
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                {review.name ? (
                  <p className="text-sm font-medium text-white">{review.name}</p>
                ) : (
                  <span aria-hidden="true" />
                )}
                <span className="flex-shrink-0 text-xs text-muted">{review.source} Review</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex max-w-[640px] items-center justify-between">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous review"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/5 sm:h-10 sm:w-10"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="font-heading text-sm tracking-wide tabular-nums text-muted">
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next review"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/5 sm:h-10 sm:w-10"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
