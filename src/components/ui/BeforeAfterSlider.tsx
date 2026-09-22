import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { Photo } from "./Photo";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface BeforeAfterSliderProps {
  beforeImageId: string;
  afterImageId: string;
}

// The hint sweep: out to the clean side, across to the dirty side, then back to
// centre. Timed so each leg travels at roughly the same speed — the middle leg
// covers twice the distance, so it gets twice the share of the duration.
const HINT_LEFT = 18;
const HINT_RIGHT = 82;
const HINT_CENTRE = 50;
const HINT_TIMES = [0, 0.28, 0.72, 1];

export function BeforeAfterSlider({ beforeImageId, afterImageId }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(HINT_CENTRE);
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: false, amount: 0.5 });

  // Mirrors `position` without reading state inside the effect, so the hint can
  // start from wherever the handle currently sits instead of snapping first.
  const positionRef = useRef(HINT_CENTRE);
  const hintRef = useRef<{ stop: () => void } | null>(null);

  function applyPosition(value: number) {
    positionRef.current = value;
    setPosition(value);
  }

  function stopHint() {
    hintRef.current?.stop();
    hintRef.current = null;
  }

  // Replays on every entry, not just the first, so the section still
  // demonstrates itself when you scroll back to it.
  useEffect(() => {
    if (reduced || !inView) return;

    const from = positionRef.current;
    const controls = animate(from, [from, HINT_LEFT, HINT_RIGHT, HINT_CENTRE], {
      duration: 1.7,
      delay: 0.4,
      times: HINT_TIMES,
      ease: "easeInOut",
      onUpdate: applyPosition,
    });
    hintRef.current = controls;

    return () => {
      controls.stop();
      hintRef.current = null;
    };
  }, [inView, reduced]);

  return (
    <div ref={rootRef}>
      {/* `touch-action: none` swallowed vertical swipes, so a finger that landed
          on this 340x256 block could not scroll the page on a phone. `pan-y`
          hands vertical panning back to the browser while the range input keeps
          horizontal drags; unchanged from sm upwards. */}
      <div className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-2xl border border-white/10 sm:aspect-video sm:touch-none">
        <div className="absolute inset-0">
          <Photo imageId={afterImageId} className="h-full w-full" />
          <span className="absolute right-3 top-3 rounded-full bg-blue/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            After
          </span>
        </div>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Photo imageId={beforeImageId} className="h-full w-full" />
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            Before
          </span>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 flex w-0.5 -translate-x-1/2 items-center justify-center bg-white/80"
          style={{ left: `${position}%` }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-bg shadow-lg">
            <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => applyPosition(Number(e.target.value))}
          // Any real input wins immediately — the hint never fights the user.
          onPointerDown={stopHint}
          onKeyDown={stopHint}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Slide to compare before and after"
        />
      </div>
    </div>
  );
}
