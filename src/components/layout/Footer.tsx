import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { InstagramIcon } from "../ui/InstagramIcon";
import { Reveal } from "../ui/Reveal";
import { business, fullAddress } from "../../data/business";

const nav = [
  { to: "/packages", label: "Packages" },
  { to: "/work", label: "Our Work" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/book", label: "Book" },
];

/**
 * Every page but Home and Book already ends in a full `<BookingCTA>` section
 * directly above this footer, so a second "book now" block here would just
 * repeat it. Instead the brand column carries a single, restrained
 * "Book Your Detail" link — present, not competing.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-surface">
      <Container className="grid gap-x-8 gap-y-6 py-14 sm:grid-cols-2 sm:gap-y-10 sm:py-16 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-y-0 lg:py-20">
        {/* Brand — the one column meant to carry real visual weight. */}
        <Reveal delay={0}>
          <div>
            <Link to="/" className="inline-block">
              <img src="/images/ds-logo.png" alt="D's Spotless Auto Detailing" className="h-14 w-auto" />
            </Link>
            <p className="mt-4 max-w-[24ch] text-sm text-muted">Professional auto detailing in Toronto.</p>
            <Link
              to="/book"
              className="group mt-3 inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-blue-a11y transition-colors hover:text-white"
            >
              Book Your Detail
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <nav aria-label="Footer">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Explore</p>
            {/* Compact on purpose: a short, readable tap height per link (py-2)
                with only a sliver of gap between them, instead of padding each
                row out to a tall, sparse list. */}
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="block py-2 text-sm text-white/80 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <Reveal delay={0.16}>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Contact</p>
            <a
              href={`tel:${business.phoneHref}`}
              className="flex items-center gap-2 py-1.5 font-heading text-base font-semibold tracking-wide text-white transition-colors hover:text-blue-a11y"
            >
              <Phone className="h-4 w-4 flex-shrink-0 text-blue-bright" aria-hidden="true" />
              {business.phone}
            </a>
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1.5 flex items-start gap-2 py-1.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-bright" aria-hidden="true" />
              <span>{fullAddress}</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Connect</p>
            <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-3 py-1">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-bright group-hover:text-blue-bright">
                <InstagramIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
              </span>
              <span>
                <span className="block text-sm font-medium text-white transition-colors group-hover:text-blue-a11y">
                  Follow our work
                </span>
                <span className="block text-xs text-muted">{business.instagramHandle}</span>
              </span>
            </a>
          </div>
        </Reveal>
      </Container>

      <div className="border-t border-white/5">
        {/* No Reveal here (unlike everything above) — this bar sits in the
            last ~70px of the entire page. Reveal's `whileInView` uses a
            "-80px" viewport margin, and once a user has scrolled to the true
            bottom of the page there's no further scroll room left to carry a
            short bottom-pinned element into that shrunk trigger zone — it
            could get stuck at its initial (invisible) state permanently.
            Nothing here needs an entrance animation anyway; it's just always
            shown. "Toronto, Ontario" is dropped below sm — the Contact
            column right above already shows the full address, so repeating
            the city here is pure height with nothing new to say on the
            tightest screens. */}
        <Container className="flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {business.legalName}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <Link to="/privacy-policy" className="py-1 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="py-1 transition-colors hover:text-white">
              Terms
            </Link>
            <Link to="/cookie-policy" className="py-1 transition-colors hover:text-white">
              Cookies
            </Link>
          </nav>
          <p className="hidden sm:block">Toronto, Ontario</p>
        </Container>
      </div>
    </footer>
  );
}
