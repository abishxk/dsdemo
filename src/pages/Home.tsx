import { Hero } from "../sections/Hero";
import { TrustBar } from "../sections/TrustBar";
import { BrandIntro } from "../sections/BrandIntro";
import { PackagesPreview } from "../sections/PackagesPreview";
import { VisualTransformation } from "../sections/VisualTransformation";
import { RecentWork } from "../sections/RecentWork";
import { GallerySection } from "../sections/GallerySection";
import { ServicesDetail } from "../sections/ServicesDetail";
import { ReviewsSection } from "../sections/ReviewsSection";
import { WhyUs } from "../sections/WhyUs";
import { BookingCTA } from "../sections/BookingCTA";
import { LocationSection } from "../sections/LocationSection";
import { InstagramSection } from "../sections/InstagramSection";

export function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <BrandIntro />
      <PackagesPreview />
      <VisualTransformation />
      <RecentWork />
      <GallerySection />
      <ServicesDetail />
      <ReviewsSection />
      <WhyUs />
      <BookingCTA />
      <LocationSection />
      <InstagramSection />
    </>
  );
}
