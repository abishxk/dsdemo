import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Reveal } from "../components/ui/Reveal";
import { business, fullAddress } from "../data/business";
import { useReducedMotion } from "../hooks/useReducedMotion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -20 },
  visible: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: { duration: 0.45, delay: i * 0.1 + 0.15, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

export function TrustBar() {
  const reduced = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  // Replays every time the strip scrolls back into view, matching every
  // other entrance animation on the site.
  const inView = useInView(gridRef, { once: false, amount: 0.6 });

  return (
    <section className="border-y border-white/5 bg-surface py-6 sm:py-8">
      <Container>
        {/* Mobile-only redesign: the old side-by-side row (icon left of a
            centred text block) always looked slightly off, since the icon's
            own width pushed the text right of true centre. Below `sm` this is
            now a pair of stat cards — bigger tap targets, a clearer sense
            that these are two distinct, tappable facts, and room for the
            icon to badge itself properly instead of being squeezed into a
            text row. `sm:hidden` / `hidden sm:flex` keep desktop pixel-identical
            to before. */}
        <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:hidden">
          <motion.a
            href="#reviews"
            custom={0}
            initial={reduced ? undefined : "hidden"}
            animate={reduced ? undefined : inView ? "visible" : "hidden"}
            variants={reduced ? undefined : cardVariants}
            whileTap={reduced ? undefined : { scale: 0.96 }}
            className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-bg px-3 py-4 text-center transition-colors duration-300 hover:border-blue-bright/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright"
          >
            <motion.div
              custom={0}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : inView ? "visible" : "hidden"}
              variants={reduced ? undefined : iconVariants}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-bright/10 transition-colors duration-300 group-hover:bg-blue-bright/20"
            >
              <Star className="h-5 w-5 fill-blue-bright text-blue-bright" aria-hidden="true" />
            </motion.div>
            <div>
              <p className="font-heading text-xl font-semibold tracking-wide leading-none">{business.rating}</p>
              <p className="mt-1.5 text-[11px] leading-snug text-muted">
                {business.reviewCount} reviews <span className="opacity-60">(approx.)</span>
              </p>
            </div>
          </motion.a>

          <motion.a
            href="#location"
            custom={1}
            initial={reduced ? undefined : "hidden"}
            animate={reduced ? undefined : inView ? "visible" : "hidden"}
            variants={reduced ? undefined : cardVariants}
            whileTap={reduced ? undefined : { scale: 0.96 }}
            className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-bg px-3 py-4 text-center transition-colors duration-300 hover:border-blue-bright/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright"
          >
            <motion.div
              custom={1}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : inView ? "visible" : "hidden"}
              variants={reduced ? undefined : iconVariants}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-bright/10 transition-colors duration-300 group-hover:bg-blue-bright/20"
            >
              <MapPin className="h-5 w-5 text-blue-bright" aria-hidden="true" />
            </motion.div>
            <div>
              <p className="font-heading text-xl font-semibold tracking-wide leading-none">Toronto, ON</p>
              <p className="mt-1.5 text-pretty text-[11px] leading-snug text-muted">{fullAddress}</p>
            </div>
          </motion.a>
        </div>

        {/* Desktop/tablet: the original side-by-side row, untouched. */}
        <div className="hidden sm:flex sm:items-center sm:justify-between">
          <Reveal delay={0} y={14}>
            <a
              href="#reviews"
              className="group flex items-center gap-3 rounded-lg transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright"
            >
              <Star
                className="h-5 w-5 flex-shrink-0 fill-blue-bright text-blue-bright transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12"
                aria-hidden="true"
              />
              <div>
                <p className="font-heading text-lg font-semibold tracking-wide leading-none">{business.rating}</p>
                <p className="mt-1 text-xs text-muted">
                  {business.reviewCount} customer reviews <span className="opacity-60">(approx.)</span>
                </p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.12} y={14}>
            <a
              href="#location"
              className="group flex items-center gap-3 rounded-lg transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright"
            >
              <MapPin
                className="h-5 w-5 flex-shrink-0 text-blue-bright transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="font-heading text-lg font-semibold tracking-wide leading-none">Toronto, ON</p>
                <p className="mt-1 text-xs text-muted">{fullAddress}</p>
              </div>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
