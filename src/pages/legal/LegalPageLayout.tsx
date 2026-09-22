import type { ReactNode } from "react";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/SectionHeading";

/**
 * Shared shell for the four policy pages. Anton (font-heading) stays on the
 * H1 for consistency with every other page title on the site, but body
 * subheadings use the regular body font — a dense, long-form legal document
 * reads better that way than shouting every subheading in a condensed
 * poster face.
 */
export function LegalPageLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-bg pb-24 pt-32 sm:pt-40">
      <Container className="max-w-3xl">
        <SectionHeading as="h1" eyebrow={`Last updated ${updated}`} title={title} />
        <div className="prose-legal mt-10 max-w-none text-[15px] leading-relaxed text-white/80 [&_a]:text-blue-a11y [&_a]:underline [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-wide [&_h2]:text-white [&_h2:first-child]:mt-0 [&_li]:mt-1.5 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </div>
      </Container>
    </section>
  );
}
