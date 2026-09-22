import { useEffect, useState } from "react";

/**
 * Matches a CSS media query. The initial value is read synchronously in the
 * state initialiser so the very first paint already has the right layout —
 * important when this drives a layout swap (grid vs carousel) rather than
 * just motion, where a one-frame flash would be visible.
 *
 * Call sites pass literal constant queries, so there is deliberately no
 * re-sync on `query` change beyond re-subscribing.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
