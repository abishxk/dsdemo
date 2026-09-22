import { cn } from "../../lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Use "h1" when this is the primary heading for the page. Defaults to "h2". */
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "left", className, as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-blue-a11y">{eyebrow}</p>
      )}
      {/* Mobile-only typography: the condensed heading face was under-scaled at
          30px on a 390px column, and un-balanced wrapping left two-character
          orphan lines ("...FOR / IT."). Both reset from sm upwards. */}
      <Heading className="font-heading text-4xl font-semibold leading-[1.05] tracking-wide text-balance text-white sm:text-wrap lg:text-5xl">
        {title}
      </Heading>
      {subtitle && <p className="mt-4 text-base text-pretty text-muted sm:text-wrap sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
