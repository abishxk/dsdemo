import { Link } from "react-router-dom";
import { LegalPageLayout } from "./LegalPageLayout";
import { business } from "../../data/business";

export function CookiePolicy() {
  return (
    <LegalPageLayout title="COOKIE POLICY" updated="September 2026">
      <p className="text-sm text-muted">
        The short version: this site doesn't use advertising or tracking cookies, and there's no analytics script
        running on it. Here's exactly what it does store, and why.
      </p>

      <h2>What this site stores on your device</h2>
      <ul>
        <li>
          <strong>Booking form draft (local storage).</strong> If this site is running without its booking database
          connected, an in-progress appointment request is temporarily kept in your browser's local storage — a
          basic web storage feature, not a tracking cookie — purely so the request works. It isn't used to identify
          or track you, and isn't shared with any third party.
        </li>
        <li>
          <strong>Google Maps.</strong> The map embedded in our Location section is loaded directly from Google.
          Google may set its own cookies in that embedded frame when you interact with it, under Google's own
          privacy and cookie policies — not ours, and outside our control.
        </li>
        <li>
          <strong>Google Fonts.</strong> This site loads its typefaces from Google's font service, which doesn't
          set tracking cookies but does receive a request from your browser (including your IP address) the same
          as any externally hosted resource would.
        </li>
      </ul>

      <h2>What this site doesn't use</h2>
      <ul>
        <li>No advertising or retargeting cookies</li>
        <li>No analytics tracking (no Google Analytics, Meta Pixel, or similar)</li>
        <li>No cross-site tracking of any kind</li>
      </ul>

      <h2>Why there's no cookie consent banner</h2>
      <p>
        Canadian privacy law (PIPEDA) doesn't require the EU-style cookie consent banner some sites use — that
        requirement comes from EU/UK law, not Canadian law. A consent banner is really about giving you a choice
        before non-essential tracking cookies load. Since this site doesn't set any non-essential tracking cookies,
        there's nothing to ask your permission for. If that changes — for example, if analytics or advertising
        tools are added later — this page and a consent mechanism would be updated accordingly.
      </p>

      <h2>Your choices</h2>
      <p>
        You can clear your browser's local storage and cookies at any time through your browser's settings. Doing so
        won't affect your ability to browse this site — at most, it would clear an unsubmitted, in-progress booking
        draft.
      </p>

      <h2>Changes to this policy</h2>
      <p>We'll update this page if what this site stores on your device changes. See our <Link to="/privacy-policy">Privacy Policy</Link> for how we handle the personal information you actually submit to us.</p>

      <h2>Contact us</h2>
      <p>Questions about this policy can be directed to <a href={`tel:${business.phoneHref}`}>{business.phone}</a>.</p>
    </LegalPageLayout>
  );
}
