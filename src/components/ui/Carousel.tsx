import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface CarouselProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderSlide: (item: T, index: number) => ReactNode;
  ariaLabel: string;
  className?: string;
  trackClassName?: string;
  /** Width of each slide. */
  slideClassName?: string;
  onActiveChange?: (index: number) => void;
  /** Scrolls the track to this index when it changes externally (e.g. a lightbox navigating). */
  activeIndex?: number;
}

const RADIUS = 2; // up to 2 cards on either side of the focused card

/**
 * Circular, windowed carousel — genuinely circular, not a scroll-position
 * trick. Only the real items ever exist in the DOM (no cloned copies): the
 * currently visible window is computed straight from `active % items.length`,
 * so going past the last item simply IS the first item, every time, with
 * nothing to "jump" back from. Framer Motion's `layout` animates cards
 * smoothly between slots as the window shifts; entering/exiting cards
 * fade and scale in/out at the window's edges.
 */
export function Carousel<T>({
  items,
  getKey,
  renderSlide,
  ariaLabel,
  className,
  trackClassName,
  slideClassName,
  onActiveChange,
  activeIndex,
}: CarouselProps<T>) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const effectiveRadius = n > 0 ? Math.min(RADIUS, Math.floor((n - 1) / 2)) : 0;

  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  useEffect(() => {
    setActive(0);
  }, [n]);

  useEffect(() => {
    if (activeIndex === undefined || n === 0) return;
    const normalized = ((activeIndex % n) + n) % n;
    setActive((prev) => (prev === normalized ? prev : normalized));
  }, [activeIndex, n]);

  function step(delta: number) {
    if (n === 0) return;
    setActive((prev) => (((prev + delta) % n) + n) % n);
  }

  function handleDragEnd(_event: unknown, info: PanInfo) {
    const { offset, velocity } = info;
    if (offset.x < -80 || velocity.x < -500) step(1);
    else if (offset.x > 80 || velocity.x > 500) step(-1);
  }

  const visible: { item: T; index: number; offset: number }[] = [];
  for (let o = -effectiveRadius; o <= effectiveRadius; o++) {
    const index = ((active + o) % n + n) % n;
    visible.push({ item: items[index], index, offset: o });
  }

  return (
    <div className={cn("relative", className)}>
      <div
        role="group"
        aria-label={ariaLabel}
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
        className={cn(
          "flex items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright",
          trackClassName,
        )}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map(({ item, index, offset }) => {
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const scale = 1 - abs * 0.18;
            const opacity = Math.max(0.15, 1 - abs * 0.4);
            const rotate = reduced ? 0 : Math.sign(offset) * Math.min(abs, 1) * -3;

            return (
              <motion.div
                key={getKey(item, index)}
                layout
                initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                animate={{ opacity: reduced ? 1 : opacity, scale: reduced ? 1 : scale, rotate }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={isActive ? handleDragEnd : undefined}
                style={{ zIndex: 10 - abs }}
                className={cn(
                  "flex-shrink-0",
                  isActive && "cursor-grab active:cursor-grabbing",
                  slideClassName ?? "w-full",
                )}
              >
                {renderSlide(item, index)}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {n > 1 && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-black/70 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next"
            className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-black/70 sm:flex"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
