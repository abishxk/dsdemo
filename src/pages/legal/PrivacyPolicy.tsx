import { Link } from "react-router-dom";
import { LegalPageLayout } from "./LegalPageLayout";
import { business, fullAddress } from "../../data/business";

export function PrivacyPolicy() {
  return (
    <LegalPageLayout title="PRIVACY POLICY" updated="September 2026">
      <p className="text-sm text-muted">
        This policy explains what personal information {business.legalName} ("we", "us") collects through this
        website, why, and how we handle it. It's written to reflect what this site actually does — it doesn't cover
        every hypothetical use, only the ones described below.
      </p>

      <h2>Who we are</h2>
      <p>
        {business.legalName} operates an auto detailing shop at {fullAddress}, and this website
        (dsspotlessauto.com). You can reach us at{" "}
        <a href={`tel:${business.phoneHref}`}>{business.phone}</a> or through the contact details on our{" "}
        <Link to="/about">About</Link> page.
      </p>

      <h2>What we collect</h2>
      <p>The only personal information this site actively collects is what you choose to give us:</p>
      <ul>
        <li>
          <strong>Booking requests:</strong> when you use the Book page, we collect your name, phone number, email
          address, vehicle year/make/model and type, the package and add-ons you're interested in, your preferred
          date and time, and any notes you add.
        </li>
        <li>
          <strong>Direct contact:</strong> if you call, text, email, or message us on Instagram, we receive whatever
          information you choose to share in that conversation.
        </li>
      </ul>
      <p>We don't ask for payment card details, government ID, or any information beyond what's needed to book and confirm a detailing appointment.</p>

      <h2>Why we collect it</h2>
      <p>We use booking information to prepare, confirm, and provide the appointment you've requested — for example, calling or emailing you to confirm a time, or knowing what your vehicle needs before you arrive.</p>
      <p>
        If you separately tick the marketing checkbox on the booking form, we'll also use your email or phone number
        to send you occasional offers and reminders. That's opt-in and optional — leaving it unchecked doesn't affect
        your booking.
      </p>
      <p>We don't sell, rent, or trade your personal information to anyone.</p>

      <h2>How your information is stored</h2>
      <p>
        Booking requests submitted through this site are stored using a third-party data platform (Supabase) that
        hosts the underlying database on our behalf, acting as our service provider. Where this site is running
        without that service connected, requests are instead kept only in your own browser's local storage and are
        never transmitted anywhere — that mode exists for demonstration purposes.
      </p>
      <p>We keep appointment details for as long as needed to fulfill your booking and for a reasonable period afterward for our own business records, then delete or anonymize them. You can ask us to delete your information sooner at any time — see "Your choices" below.</p>

      <h2>Third-party services this site uses</h2>
      <ul>
        <li><strong>Supabase</strong> (data hosting) — stores booking requests on our behalf, as described above.</li>
        <li><strong>Google Maps</strong> — the map on our Location section is an embedded Google Maps frame. Interacting with it is subject to Google's own privacy policy, not ours.</li>
        <li><strong>Google Fonts</strong> — this site loads typefaces from Google's font service, which may receive your IP address and browser information when the page loads, the same as any embedded web font.</li>
        <li><strong>Instagram</strong> — links to our Instagram profile open Instagram in a new tab; we don't embed any Instagram tracking script on this site itself.</li>
      </ul>
      <p>See our <Link to="/cookie-policy">Cookie Policy</Link> for what each of these does or doesn't store on your device.</p>

      <h2>What we don't do</h2>
      <ul>
        <li>We don't run advertising or analytics tracking on this site (no Google Analytics, Meta Pixel, or similar).</li>
        <li>We don't build advertising profiles or share your information with data brokers.</li>
        <li>We don't process payments through this website — any payment for services is arranged directly with us.</li>
      </ul>

      <h2>Your choices</h2>
      <p>Under Canadian privacy law (PIPEDA), you can:</p>
      <ul>
        <li>Ask what personal information we hold about you</li>
        <li>Ask us to correct inaccurate information</li>
        <li>Withdraw consent, or ask us to delete your information, at any time</li>
        <li>Unsubscribe from marketing messages using the link in any message, or by telling us directly</li>
      </ul>
      <p>
        To do any of this, contact our Privacy Officer at <a href={`tel:${business.phoneHref}`}>{business.phone}</a>.
        We'll respond within a reasonable time.
      </p>

      <h2>Security</h2>
      <p>We take reasonable technical and organizational steps to protect the information you share with us. No method of storage or transmission is completely secure, and we can't guarantee absolute security.</p>

      <h2>Children's privacy</h2>
      <p>This site isn't directed at children, and we don't knowingly collect personal information from anyone under 13.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time, for example if we start using a new tool or service. The "Last updated" date at the top reflects the most recent revision.</p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy or your information can be directed to our Privacy Officer at{" "}
        <a href={`tel:${business.phoneHref}`}>{business.phone}</a>, or by mail at {fullAddress}.
      </p>
    </LegalPageLayout>
  );
}
