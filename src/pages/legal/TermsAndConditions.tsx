import { LegalPageLayout } from "./LegalPageLayout";
import { business, fullAddress } from "../../data/business";

export function TermsAndConditions() {
  return (
    <LegalPageLayout title="TERMS &amp; CONDITIONS" updated="September 2026">
      <p className="text-sm text-muted">
        These terms cover your use of this website (dsspotlessauto.com), operated by {business.legalName}. By using
        this site or submitting a booking request through it, you agree to them.
      </p>

      <h2>What this site is</h2>
      <p>
        This website describes our detailing packages and services, shows examples of our work, and lets you send us
        an appointment request. It's informational and a request tool — submitting the Book form sends us a request,
        it doesn't confirm an appointment. We'll contact you using the details you provide to confirm the time,
        vehicle details, and price before any work is scheduled.
      </p>

      <h2>Pricing and package information</h2>
      <p>
        Package names, inclusions, and prices shown on this site are provided as a general guide and may not reflect
        current pricing exactly. Final pricing depends on your vehicle's size, condition, and the services selected,
        and is confirmed with you directly before we begin work — not through this website.
      </p>

      <h2>Using this site</h2>
      <p>You agree to use this site for its intended purpose — browsing our services and requesting an appointment — and not to:</p>
      <ul>
        <li>Submit false or misleading information in a booking request</li>
        <li>Attempt to interfere with the site's normal operation or security</li>
        <li>Use any content from this site for a commercial purpose without our permission</li>
      </ul>

      <h2>Content and ownership</h2>
      <p>
        The text, photographs, logo, and design of this site belong to {business.legalName} unless otherwise noted.
        You're welcome to link to this site, but please don't reproduce our photos, written content, or branding
        elsewhere without asking us first.
      </p>

      <h2>Third-party links</h2>
      <p>
        This site links to services we don't control, including Google Maps, Google Search/Reviews, and Instagram.
        We aren't responsible for the content, availability, or privacy practices of those third-party sites.
      </p>

      <h2>No guarantee the site is error-free</h2>
      <p>
        We try to keep this site accurate and available, but we don't guarantee it will be uninterrupted, error-free,
        or free of typos — including in package descriptions or prices, which is why final pricing is always
        confirmed directly with you.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {business.legalName} isn't liable for indirect or consequential losses
        arising from your use of this website. Nothing in these terms limits any liability that can't be excluded
        under Ontario or Canadian law, including in connection with the detailing services themselves, which are
        governed separately by the terms agreed at the time of booking.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable in Ontario.</p>

      <h2>Changes to these terms</h2>
      <p>We may update these terms from time to time. The "Last updated" date above reflects the most recent revision. Continuing to use the site after a change means you accept the updated terms.</p>

      <h2>Contact us</h2>
      <p>
        Questions about these terms can be directed to <a href={`tel:${business.phoneHref}`}>{business.phone}</a>,
        or by mail at {fullAddress}.
      </p>
    </LegalPageLayout>
  );
}
