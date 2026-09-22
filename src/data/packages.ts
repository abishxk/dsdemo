import type { ComparisonRow, ServicePackage } from "../types";

// NOTE: Historical menu structure/inclusions are from a Dec 2023 price list.
// The priceLabel values below are PLACEHOLDERS chosen for layout purposes —
// they are not verified pricing. Replace them with the real, confirmed
// prices before this goes live.

export const packages: ServicePackage[] = [
  {
    id: "silver",
    name: "Silver",
    tagline: "The Essential Detail",
    description:
      "A thorough interior and exterior refresh for vehicles that need a careful, professional clean.",
    highlights: [
      "Interior thoroughly cleaned and vacuumed",
      "Rubber and carpet mats pressure washed",
      "Windows cleaned inside and out",
      "Door jambs detailed and hand wiped",
      "Tires and rims cleaned, tire shine applied",
      "Professional hand wash with pH-neutral shampoo",
    ],
    fullInclusions: [
      "Interior thoroughly cleaned and vacuumed using fine detailing tools",
      "Rubber and carpet mats pressure washed",
      "Air pressure used to remove dirt and debris from seams and crevices",
      "Windows cleaned inside and out",
      "Door jambs detailed and hand wiped",
      "Tires and rims cleaned from visible debris",
      "Tire and rim shine applied",
      "Professionally hand washed using pH-neutral shampoo",
      "Hand dried",
    ],
    priceLabel: "$150",
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "The Deep Clean",
    description:
      "Everything in Silver plus deep interior treatment — steam cleaning, stain extraction and odour elimination.",
    highlights: [
      "Everything in Silver, plus:",
      "Carpets steam cleaned, stains extracted",
      "Leather seats deep cleaned and conditioned",
      "Upholstery shampooed, steam cleaned and extracted",
      "Pet hair and brake dust removal",
      "Ozone odour sanitization treatment",
    ],
    fullInclusions: [
      "Pet hair removal",
      "Vent cleaning",
      "Brake dust removal",
      "Interior ceiling/headliner professionally cleaned and wiped",
      "Carpets steam cleaned",
      "Common stains extracted",
      "Vinyl and plastic surfaces deep cleaned",
      "Surface conditioner applied",
      "Moonroof/sunroof cleaned inside and out",
      "Leather seats deep cleaned",
      "Leather conditioner applied",
      "Upholstery seats shampooed, steam cleaned and extracted",
      "Trunk cargo area vacuumed and extracted",
      "Ozone odour sanitization treatment",
      "Fabric freshener and odour eliminator",
    ],
    priceLabel: "$200",
  },
  {
    id: "diamond",
    name: "Diamond",
    tagline: "The Complete Treatment",
    description:
      "The full package — Gold's deep clean plus engine shampoo, professional polish and headlight restoration.",
    highlights: [
      "Everything in Gold, plus:",
      "Engine shampoo",
      "Professional polish",
      "Headlight restoration",
      "Underbody wash",
      "Third-row SUV cleaning",
    ],
    fullInclusions: [
      "Engine shampoo",
      "Thorough stain removal",
      "Salt stain removal",
      "Third-row SUV cleaning",
      "Hand wash",
      "Professional polish",
      "Headlight restoration",
      "Underbody wash",
    ],
    priceLabel: "$300",
    premium: true,
  },
];

export const comparisonRows: ComparisonRow[] = [
  { label: "Interior cleaning", silver: true, gold: true, diamond: true },
  { label: "Exterior hand wash", silver: true, gold: true, diamond: true },
  { label: "Mat cleaning", silver: true, gold: true, diamond: true },
  { label: "Window cleaning", silver: true, gold: true, diamond: true },
  { label: "Door jambs", silver: true, gold: true, diamond: true },
  { label: "Pet hair removal", silver: false, gold: true, diamond: true },
  { label: "Vent cleaning", silver: false, gold: true, diamond: true },
  { label: "Steam cleaning", silver: false, gold: true, diamond: true },
  { label: "Stain extraction", silver: false, gold: true, diamond: true },
  { label: "Leather treatment", silver: false, gold: true, diamond: true },
  { label: "Upholstery extraction", silver: false, gold: true, diamond: true },
  { label: "Ozone treatment", silver: false, gold: true, diamond: true },
  { label: "Engine shampoo", silver: false, gold: false, diamond: true },
  { label: "Salt stain removal", silver: false, gold: false, diamond: true },
  { label: "Third-row detailing", silver: false, gold: false, diamond: true },
  { label: "Professional polish", silver: false, gold: false, diamond: true },
  { label: "Headlight restoration", silver: false, gold: false, diamond: true },
  { label: "Underbody wash", silver: false, gold: false, diamond: true },
];

export const addOns = [
  { id: "exterior-polish", label: "Exterior polish" },
  { id: "engine-shampoo", label: "Engine shampoo" },
  { id: "headlight-restoration", label: "Headlight restoration" },
  { id: "other", label: "Other" },
];
