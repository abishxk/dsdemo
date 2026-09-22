import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Minus, Sparkles } from "lucide-react";
import { useInView } from "framer-motion";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { comparisonRows, packages } from "../data/packages";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { PackageTier } from "../types";

// Each tier's own hover-highlight tint — silvery neutral, warm gold, and the
// brand's icy blue-bright for Diamond.
const TIER_HOVER_BG: Record<PackageTier, string> = {
  silver: "bg-white/[0.07]",
  gold: "bg-tier-gold/[0.09]",
  diamond: "bg-blue-bright/[0.08]",
};

// The row itself fades/rises in on `revealed`; the icon rides along at full
// opacity but starts scaled down and pops up to size on a short delay after —
// a small two-beat reveal (row arrives, then the mark springs in) instead of
// everything appearing as one flat block. Same overshoot ease already used
// for the map pin (StaticMap) and the trust-strip cards (TrustBar).
function Mark({
  included,
  compact = false,
  revealed = true,
  delayMs = 0,
}: {
  included: boolean;
  compact?: boolean;
  revealed?: boolean;
  delayMs?: number;
}) {
  const style = { transitionDelay: `${delayMs}ms` };
  return included ? (
    <Check
      style={style}
      className={cn(
        "mx-auto flex-shrink-0 text-blue-bright transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-125 md:mx-0",
        compact ? "h-3.5 w-3.5" : "h-4 w-4",
        revealed ? "scale-100" : "scale-0",
      )}
      aria-label="Included"
    />
  ) : (
    <Minus
      style={style}
      className={cn(
        "mx-auto flex-shrink-0 text-white/15 transition-transform duration-300 ease-out md:mx-0",
        compact ? "h-3.5 w-3.5" : "h-4 w-4",
        revealed ? "scale-100" : "scale-75",
      )}
      aria-label="Not included"
    />
  );
}

const cellPad = "px-5 sm:px-6";

/**
 * Pricing + full feature comparison. Two entirely separate layouts sharing
 * one `useInView` reveal:
 *
 * - Below `md`: a genuine side-by-side grid, sized to fit a phone's width
 *   without horizontal scrolling — the whole point being that all three
 *   tiers stay comparable at a glance, the way a comparison table should
 *   read, instead of three full-length lists stacked one after another.
 * - `md` and up: the original merged card+table grid, untouched.
 */
export function PackageComparison() {
  const reduced = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: false, margin: "-60px" });
  const [hoveredTier, setHoveredTier] = useState<PackageTier | null>(null);

  // This section sits just below a short page heading, so on most screens
  // it's already on screen at load — `inView` goes true almost immediately,
  // and the entrance animation would fire (and finish) before anyone's eyes
  // actually land on it. Hold the very first reveal back for a beat so it's
  // never missed; once that's passed, later scroll-triggered replays (the
  // user scrolling away and back) happen at full, immediate speed as normal.
  const [pastInitialDelay, setPastInitialDelay] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setPastInitialDelay(true), 450);
    return () => clearTimeout(timer);
  }, []);
  const revealed = reduced || (pastInitialDelay && inView);

  return (
    <section id="comparison" className="scroll-mt-16 bg-surface py-12 sm:scroll-mt-20 sm:py-16">
      <Container>
        <div ref={gridRef}>
          {/* Mobile: compact side-by-side comparison. Fixed, narrow column
              widths so label + all three tiers fit one screen width; the
              label column is sticky so it stays put on the rare device where
              the columns don't quite fit and a sliver of horizontal scroll
              is needed. Each header cell is itself the "Select" tap target —
              there's no room for a separate button at this width, so the
              whole name/price cell links to booking instead. */}
          <div
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: "550ms",
              transitionTimingFunction: "ease-out",
            }}
            className={cn(
              "grid grid-cols-[92px_repeat(3,1fr)] gap-0 overflow-x-auto overflow-y-hidden rounded-2xl border border-white/10 md:hidden",
              revealed ? "scale-100 opacity-100" : "scale-[0.97] opacity-0",
            )}
          >
            <div className="contents">
              <div
                style={{
                  order: 0,
                  transitionProperty: "opacity, transform",
                  transitionDuration: "500ms",
                  transitionTimingFunction: "ease-out",
                }}
                className={cn(
                  "sticky left-0 z-10 flex flex-col justify-center border-b border-white/10 bg-surface px-2 py-3",
                  revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
              >
                <p className="font-heading text-xs font-semibold uppercase tracking-wide text-white/80">
                  Included
                </p>
              </div>
              {comparisonRows.map((row, i) => {
                const delay = reduced ? 0 : Math.min(i * 15, 250);
                return (
                  <div
                    key={row.label}
                    style={{
                      order: i + 1,
                      transitionProperty: "opacity, transform",
                      transitionDuration: "500ms",
                      transitionTimingFunction: "ease-out",
                      transitionDelay: `${delay}ms`,
                    }}
                    className={cn(
                      "sticky left-0 z-10 flex items-center border-b border-white/5 bg-surface px-2 py-2.5 text-[10.5px] leading-snug text-white/70",
                      revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                    )}
                  >
                    {row.label}
                  </div>
                );
              })}
            </div>

            {packages.map((pkg, pkgIndex) => (
              <div key={pkg.id} className="contents">
                <Link
                  to={`/book?package=${pkg.id}`}
                  style={{
                    order: 0,
                    transitionProperty: "opacity, transform, background-color",
                    transitionDuration: "500ms, 500ms, 150ms",
                    transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
                    // Entrance (opacity/transform) is staggered by column; the
                    // background-color transition stays at 0ms delay always, so
                    // tap feedback never feels laggy.
                    transitionDelay: reduced ? "0ms, 0ms, 0ms" : `${pkgIndex * 90}ms, ${pkgIndex * 90}ms, 0ms`,
                  }}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-1 border-b border-l border-white/10 px-1.5 py-3 text-center active:scale-[0.97] active:bg-white/[0.06]",
                    revealed ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-90 opacity-0",
                    pkg.premium ? "bg-blue-bright/[0.07]" : "bg-white/[0.02]",
                  )}
                >
                  {pkg.premium && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-bright text-white">
                      <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                    </span>
                  )}
                  <span className="font-heading text-[11px] font-semibold uppercase tracking-wide">{pkg.name}</span>
                  <span
                    className={cn(
                      "font-heading text-xs font-bold",
                      pkg.premium ? "text-blue-a11y" : "text-white/80",
                    )}
                  >
                    {pkg.priceLabel}
                  </span>
                  {/* A pill, not plain text — the whole cell is already the tap
                      target, but this is what tells the eye "this is a button"
                      at a glance. Solid for the premium tier, outlined for the
                      other two, mirroring the real Button component's own
                      primary/outline split on desktop. */}
                  <span
                    className={cn(
                      "mt-0.5 inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide",
                      pkg.premium ? "bg-blue-bright text-white" : "border border-white/25 text-white",
                    )}
                  >
                    Select
                  </span>
                </Link>

                {comparisonRows.map((row, i) => {
                  const delay = reduced ? 0 : Math.min(i * 15, 250);
                  return (
                    <div
                      key={row.label}
                      style={{
                        order: i + 1,
                        transitionProperty: "opacity, transform",
                        transitionDuration: "500ms",
                        transitionTimingFunction: "ease-out",
                        transitionDelay: `${delay}ms`,
                      }}
                      className={cn(
                        "flex items-center justify-center border-b border-l border-white/5 px-1 py-2.5",
                        revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                      )}
                    >
                      <Mark included={row[pkg.id]} compact revealed={revealed} delayMs={delay + 140} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Desktop/tablet: the original merged card+table grid, with its own
              entrance reveal (frame included, see below) layered on top. */}
          <div
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: "600ms",
              transitionTimingFunction: "ease-out",
            }}
            className={cn(
              "mx-auto hidden max-w-sm gap-0 overflow-hidden rounded-2xl border border-white/10 md:grid md:max-w-none md:grid-cols-4",
              revealed ? "scale-100 opacity-100" : "scale-[0.97] opacity-0",
            )}
          >
            {/* Label column */}
            <section className="contents">
              <div
                style={{
                  order: 0,
                  transitionProperty: "opacity, transform",
                  transitionDuration: "550ms",
                  transitionTimingFunction: "ease-out",
                }}
                className={cn(
                  cellPad,
                  "flex flex-col justify-center border-b border-white/10 bg-white/[0.02] py-10",
                  revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                )}
              >
                <p className="font-heading text-base font-semibold uppercase tracking-wide text-white/80">Included</p>
              </div>
              {comparisonRows.map((row, i) => {
                const delay = reduced ? 0 : Math.min(i * 25, 300);
                return (
                  <div
                    key={row.label}
                    style={{
                      order: i + 1,
                      transitionProperty: "opacity, transform",
                      transitionDuration: "550ms",
                      transitionTimingFunction: "ease-out",
                      transitionDelay: `${delay}ms`,
                    }}
                    className={cn(
                      cellPad,
                      "flex items-center border-b border-white/5 py-3.5 text-white/70",
                      revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                    )}
                  >
                    {row.label}
                  </div>
                );
              })}
            </section>

            {packages.map((pkg, pkgIndex) => (
              <section key={pkg.id} className="contents">
                <div
                  onMouseEnter={() => setHoveredTier(pkg.id)}
                  onMouseLeave={() => setHoveredTier((t) => (t === pkg.id ? null : t))}
                  style={{
                    order: 0,
                    transitionProperty: "opacity, transform, background-color",
                    transitionDuration: "450ms, 300ms, 200ms",
                    transitionTimingFunction: "ease-out",
                    // Entrance is staggered by column; hover response (and its
                    // own transform, the lift) always reacts instantly.
                    transitionDelay: reduced ? "0ms, 0ms, 0ms" : `${pkgIndex * 70}ms, 0ms, 0ms`,
                  }}
                  className={cn(
                    cellPad,
                    "relative flex flex-col justify-end border-b border-white/10 pb-5 pt-10",
                    !revealed
                      ? "translate-y-6 bg-transparent opacity-0"
                      : hoveredTier === pkg.id
                        ? cn(TIER_HOVER_BG[pkg.id], "-translate-y-1 opacity-100")
                        : "translate-y-0 bg-transparent opacity-100",
                  )}
                >
                  {pkg.premium && (
                    <span className="absolute right-5 top-4 inline-flex items-center gap-1 rounded-full bg-blue-bright px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm sm:right-6">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      Best Value
                    </span>
                  )}
                  <h3 className="font-heading text-xl font-semibold tracking-wide">{pkg.name}</h3>
                  <p className="mt-0.5 text-xs uppercase tracking-wide text-blue-a11y">{pkg.tagline}</p>
                  {/* The price is the thing a comparison table exists to let you
                      compare — it was smaller than the tagline above it. Now the
                      most prominent number in the cell, bigger even than the
                      tier name. */}
                  <p
                    className={cn(
                      "mt-3 font-heading text-3xl font-bold tracking-wide",
                      pkg.premium ? "text-blue-bright" : "text-white",
                    )}
                  >
                    {pkg.priceLabel}
                  </p>
                  <Button
                    as="link"
                    to={`/book?package=${pkg.id}`}
                    size="sm"
                    variant={pkg.premium ? "primary" : "outline"}
                    className="mt-4 w-full"
                  >
                    Select {pkg.name}
                  </Button>
                </div>

                {comparisonRows.map((row, i) => {
                  const included = row[pkg.id];
                  const delay = reduced ? 0 : Math.min(i * 25, 300);
                  return (
                    <div
                      key={row.label}
                      onMouseEnter={() => setHoveredTier(pkg.id)}
                      onMouseLeave={() => setHoveredTier((t) => (t === pkg.id ? null : t))}
                      className={cn(
                        cellPad,
                        "group flex items-center justify-center gap-2.5 border-b border-white/5 py-3.5",
                        hoveredTier === pkg.id && TIER_HOVER_BG[pkg.id],
                        revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                      )}
                      style={{
                        order: i + 1,
                        transitionProperty: "opacity, transform, background-color",
                        transitionDuration: "550ms, 550ms, 150ms",
                        transitionTimingFunction: "ease-out",
                        // Only the initial reveal fade/rise is staggered — hover
                        // color changes should always respond instantly.
                        transitionDelay: `${delay}ms, ${delay}ms, 0ms`,
                      }}
                    >
                      <Mark included={included} revealed={revealed} delayMs={delay + 160} />
                    </div>
                  );
                })}
              </section>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm text-muted">
          Additional services may be available depending on vehicle condition and requirements.
        </p>
      </Container>
    </section>
  );
}
