import { useRef } from "react";
import { useInView } from "framer-motion";
import { Check } from "lucide-react";
import type { PackageTier, ServicePackage } from "../../types";
import { cn } from "../../lib/utils";
import { Reveal } from "./Reveal";
import { Button } from "./Button";

// Each tier's own accent — silvery neutral, warm gold, and the brand's icy
// blue-bright for Diamond. Drives the hover glow, the tagline and the
// checkmarks, so the three cards read as distinct tiers at a glance.
const TIER_GLOW: Record<PackageTier, string> = {
  silver: "hover:shadow-[0_0_90px_-10px_rgba(255,255,255,0.6)]",
  gold: "hover:shadow-[0_0_90px_-10px_rgba(212,175,55,0.65)]",
  diamond: "hover:shadow-[0_0_90px_-10px_rgba(40,100,255,0.75)]",
};

// The same glow, without the hover trigger. A phone has no pointer to hover
// with, so below `sm` the glow follows whichever card is crossing the middle of
// the screen instead. `max-sm:` keeps it off desktop entirely.
const TIER_GLOW_FOCUS: Record<PackageTier, string> = {
  silver: "max-sm:shadow-[0_0_90px_-10px_rgba(255,255,255,0.6)]",
  gold: "max-sm:shadow-[0_0_90px_-10px_rgba(212,175,55,0.65)]",
  diamond: "max-sm:shadow-[0_0_90px_-10px_rgba(40,100,255,0.75)]",
};

const TIER_TEXT: Record<PackageTier, string> = {
  silver: "text-white/70",
  gold: "text-tier-gold",
  // blue-a11y (not blue-bright) — this drives the 11px tagline text, which
  // needs the WCAG AA text threshold (4.5:1), not just the 3:1 icon/border
  // threshold blue-bright itself clears. Reused for the checkmark below too;
  // a slightly lighter blue there is a no-op visually, not a regression.
  diamond: "text-blue-a11y",
};

export function PackageCard({ pkg, delay = 0 }: { pkg: ServicePackage; delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  // A sliver of a viewport either side of dead centre — narrower than the gap
  // between two stacked cards, so exactly one card is ever lit at a time and
  // the glow hands off cleanly as you scroll.
  const centred = useInView(cardRef, { once: false, margin: "-49.5% 0px -49.5% 0px" });

  return (
    <Reveal delay={delay} className="h-full">
      <div
        ref={cardRef}
        className={cn(
          "flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 sm:p-8",
          TIER_GLOW[pkg.id],
          centred && TIER_GLOW_FOCUS[pkg.id],
          pkg.premium
            ? "border-blue-bright/30 bg-gradient-to-b from-surface-light to-surface"
            : "border-white/10 bg-surface hover:border-white/20",
        )}
      >
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-heading text-2xl font-semibold tracking-wide">{pkg.name}</h3>
          <p className="font-heading text-2xl font-semibold tracking-wide">{pkg.priceLabel}</p>
        </div>
        <p className={cn("mt-1 text-[11px] font-semibold uppercase tracking-wide", TIER_TEXT[pkg.id])}>
          {pkg.tagline}
        </p>

        {/* The description largely restates the highlights, so on mobile it's
            dropped in favour of showing the full, scannable list instead. */}
        <p className="mt-3 hidden text-sm leading-relaxed text-muted sm:block">{pkg.description}</p>

        <ul className="mt-6 flex-1 space-y-2.5">
          {pkg.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
              <Check className={cn("mt-[3px] h-3.5 w-3.5 flex-shrink-0", TIER_TEXT[pkg.id])} aria-hidden="true" />
              {/* Phone column is narrow enough that these wrap to a one-word second
                  line; `text-pretty` evens them out, and resets from sm upwards. */}
              <span className="text-pretty sm:text-wrap">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 border-t border-white/10 pt-5">
          <Button as="link" to={`/book?package=${pkg.id}`} size="md" className="w-full">
            Select
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
