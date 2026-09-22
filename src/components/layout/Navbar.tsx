import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { business } from "../../data/business";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

const links = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Packages" },
  { to: "/work", label: "Our Work" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  // The panel only exists below lg, where the page used to keep scrolling
  // underneath it while it was open.
  useLockBodyScroll(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "bg-bg/90 backdrop-blur-md border-b border-white/5" : "bg-gradient-to-b from-black/50 to-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link to="/" className="flex items-center overflow-hidden rounded-lg py-0.5 sm:py-0" onClick={() => setOpen(false)}>
          <img src="/images/ds-logo.png" alt="D's Spotless Auto Detailing" className="h-10 w-auto sm:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium tracking-wide text-muted transition-colors hover:text-white",
                  isActive && "text-white",
                )
              }
            >
              {link.label.toUpperCase()}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button as="link" to="/book" size="md">
            Book Now
          </Button>
        </div>

        {/* Only rendered below lg, so 44px here is a phone/tablet-only tap target. */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/5 bg-bg lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-white/5 hover:text-white",
                      isActive && "text-white",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-white/5 px-3 py-3 text-base font-medium text-white"
              >
                Book Appointment
              </Link>
              <a
                href={`tel:${business.phoneHref}`}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-muted hover:bg-white/5 hover:text-white"
              >
                <Phone className="h-4 w-4" /> Call {business.phone}
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
