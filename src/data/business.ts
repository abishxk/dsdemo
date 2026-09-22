export const business = {
  legalName: "D's Spotless Auto Detailing Ltd.",
  shortName: "D's Spotless",
  city: "Toronto",
  region: "ON",
  address: {
    street: "1180 Dupont St",
    city: "Toronto",
    region: "ON",
    postalCode: "M6H 2A4",
    country: "Canada",
  },
  phone: "416-533-0990",
  phoneHref: "+14165330990",
  // Exact coordinates for D's Spotless Auto Detailing Ltd.'s Google Business
  // Profile listing (resolved from the business's own Google Maps share link).
  coordinates: { lat: 43.6686981, lng: -79.4394819 },
  // The business's own official Google Maps share link — use this directly
  // rather than reconstructing a maps.google.com URL by hand.
  googleMapsUrl: "https://maps.app.goo.gl/qU9AVVD5nb6jQqdEA",
  instagramHandle: "@dsspotlessauto",
  instagramUrl: "https://www.instagram.com/dsspotlessauto/",
  // Easy to update — not independently verified by this website.
  rating: 4.7,
  reviewCount: "350+",
  // Placeholder search link — replace with the verified Google Business
  // Profile / review platform URL once confirmed.
  reviewsUrl: "https://www.google.com/search?q=D%27s+Spotless+Auto+Detailing+Toronto+reviews",
};

export const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`;
