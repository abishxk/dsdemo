import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * An explicit, on-page way back — the persistent Navbar already has a Home
 * link, but landing on a page like /work after clicking "View Our Work" from
 * the hero gives no visible sign that going back is even possible, let alone
 * how. This makes it obvious.
 *
 * Prefers real browser history (so "back" means back to wherever you
 * actually came from, not always Home) and only falls back to `fallback`
 * when there's no in-app history to pop — landing here via a fresh tab,
 * bookmark, or typed URL, where `location.key` is React Router's "default".
 */
export function BackLink({ fallback = "/" }: { fallback?: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleBack() {
    if (location.key === "default") navigate(fallback);
    else navigate(-1);
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="group mb-2 inline-flex items-center gap-1.5 py-3 text-sm font-medium text-muted transition-colors hover:text-white sm:mb-4 sm:py-1"
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
      Back
    </button>
  );
}
