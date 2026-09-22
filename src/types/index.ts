export type PackageTier = "silver" | "gold" | "diamond";

export interface ServicePackage {
  id: PackageTier;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  fullInclusions: string[];
  priceLabel: string;
  premium?: boolean;
}

export interface ComparisonRow {
  label: string;
  silver: boolean;
  gold: boolean;
  diamond: boolean;
}

export type VehicleType = "car" | "suv" | "truck" | "van";

export interface WorkItem {
  id: string;
  packageTier: PackageTier;
  vehicleType: VehicleType;
  vehicleLabel: string;
  imageId: string;
  note?: string;
}

export type GalleryCategory = "interior" | "exterior" | "suvs-trucks" | "cars";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  imageId: string;
  caption: string;
}

export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  source: string;
}

export type AppointmentStatus =
  | "NEW"
  | "CONTACTED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleType: VehicleType | "";
  package: PackageTier | "not-sure" | "";
  addOns: string[];
  preferredDate: string;
  preferredTime: "morning" | "afternoon" | "evening" | "";
  notes: string;
  // Opt-in for marketing messages, unchecked by default. CASL (Canada's
  // Anti-Spam Legislation) requires its own express consent for promotional
  // email/SMS — separate from, and not a condition of, booking itself.
  marketingOptIn: boolean;
  status: AppointmentStatus;
  createdAt: string;
}

export type AppointmentInput = Omit<Appointment, "id" | "status" | "createdAt">;

export interface ImageAsset {
  id: string;
  src: string;
  alt: string;
}
