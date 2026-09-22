import { ReviewsSection } from "../sections/ReviewsSection";
import { BookingCTA } from "../sections/BookingCTA";

export function Reviews() {
  return (
    <>
      <ReviewsSection as="h1" alignTop />
      <BookingCTA />
    </>
  );
}
