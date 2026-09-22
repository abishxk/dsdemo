import { useRef } from "react";
import { MapPin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { business, fullAddress } from "../../data/business";

/**
 * Real embedded Google Map (no API key required — the `/maps?output=embed`
 * endpoint is a stable, publicly documented embed format). Pans/zooms in
 * from a wide, country-level scale every time this section scrolls into
 * view, and zooms back out every time it leaves — not just once.
 */
export function StaticMap({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  // Query by business name (not raw coordinates or a street address alone)
  // so Google labels the pin with the actual business name.
  const query = encodeURIComponent(`${business.legalName}, ${fullAddress}`);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: false, margin: "-80px" });

  return (
    <div ref={rootRef} className={cn("relative overflow-hidden rounded-2xl bg-surface", className)}>
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={reduced ? undefined : inView ? { scale: 1, opacity: 1 } : { scale: 4.5, opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* The embed handles one-finger drags itself, which on a phone meant a
            swipe starting on the map panned the map instead of scrolling the
            page. Below sm it is display-only — the pin below and the "Get
            Directions" button still open the real map. */}
        <iframe
          title="D's Spotless Auto Detailing location map"
          src={`https://www.google.com/maps?q=${query}&z=17&output=embed`}
          className="pointer-events-none h-full w-full sm:pointer-events-auto"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent" />

      <motion.a
        href={business.googleMapsUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${business.legalName} in Google Maps`}
        className="group absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        initial={false}
        animate={reduced ? undefined : inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 0.5,
          delay: reduced ? 0 : inView ? 1.05 : 0,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-bright shadow-[0_0_0_8px_rgba(40,100,255,0.15)] transition-transform duration-200 group-hover:scale-110">
          <MapPin className="h-6 w-6 text-white" aria-hidden="true" fill="currentColor" />
        </div>
        <span className="mt-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm transition-colors duration-200 group-hover:text-white">
          {business.shortName}
        </span>
      </motion.a>
    </div>
  );
}
