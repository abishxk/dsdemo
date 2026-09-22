import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Photo } from "../components/ui/Photo";
import { useReducedMotion } from "../hooks/useReducedMotion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Every entrance here re-plays each time the hero scrolls back into view
 * (not just once on first page load) — driven by a single `useInView` on
 * the section, `once: false`, rather than a one-shot mount animation.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.5 });

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-end overflow-hidden bg-bg">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={reduced ? undefined : inView ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Photo imageId="hero-main" className="h-full w-full" eager />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-transparent" />
      {/* Top vignette so the fixed navbar stays readable over bright parts of the hero photo. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent sm:h-40" />

      <Container className="relative z-10 pb-20 sm:pb-28">
        <motion.div
          initial={reduced ? false : "hidden"}
          animate={reduced ? undefined : inView ? "visible" : "hidden"}
          variants={reduced ? undefined : containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-blue-a11y"
          >
            D'S Spotless Auto Detailing
          </motion.p>

          {/* Anton is a condensed poster face, so at 48px the headline only filled
              ~56% of a 390px column and read timid. 72px lets it run almost edge
              to edge on phones; sm and up are unchanged. */}
          <motion.h1
            variants={itemVariants}
            className="max-w-3xl font-heading text-[4.5rem] font-semibold leading-[0.98] tracking-wide text-white sm:text-6xl lg:text-7xl"
          >
            YOUR CAR.
            <br />
            SPOTLESS.
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-6 max-w-md text-lg text-white/80">
            Professional Auto Detailing in Toronto.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button as="link" to="/book" size="lg">
              Book Your Detail
            </Button>
            <Button as="link" to="/work" variant="outline" size="lg">
              View Our Work
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        className="absolute inset-x-0 bottom-6 hidden justify-center sm:flex"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-white/40" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
