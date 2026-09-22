import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel } from "./Carousel";
import { cn } from "../../lib/utils";

interface CardCarouselProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderCard: (item: T, index: number) => ReactNode;
  ariaLabel: string;
  /** Plural noun for the controls' accessible labels, e.g. "package". */
  itemNoun?: string;
}

/**
 * Mobile treatment for card sections that would otherwise stack into a very
 * long vertical column: one centred card, swipeable, infinite.
 *
 * Discoverability matters more here than in the gallery — a user must be able
 * to tell at a glance that there are more cards. Three signals do that: the
 * next card peeks in at the edge, the dots show how many there are and which
 * one you're on, and the arrows give an explicit tap target (the carousel's
 * own arrows are hidden below `sm`).
 */
export function CardCarousel<T>({ items, getKey, renderCard, ariaLabel, itemNoun = "card" }: CardCarouselProps<T>) {
  const [active, setActive] = useState(0);
  const n = items.length;

  const step = (delta: number) => setActive((a) => (((a + delta) % n) + n) % n);

  return (
    <div>
      <Carousel
        items={items}
        getKey={(item) => getKey(item)}
        renderSlide={renderCard}
        ariaLabel={ariaLabel}
        activeIndex={active}
        onActiveChange={setActive}
        trackClassName="gap-3 py-2"
        slideClassName="w-[72%]"
      />

      <div className="mt-5 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={`Previous ${itemNoun}`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center">
          {items.map((item, i) => (
            <button
              key={getKey(item)}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${itemNoun} ${i + 1} of ${n}`}
              aria-current={i === active}
              className="flex h-11 w-7 items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === active ? "w-5 bg-blue-bright" : "w-1.5 bg-white/25",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label={`Next ${itemNoun}`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
