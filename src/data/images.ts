export interface ImageSlot {
  id: string;
  alt: string;
  src: string;
  /** Optional CSS object-position override for this specific slot. */
  position?: string;
}

// Centralized image configuration. Every photo on the site is referenced by
// id from here and resolves to a real file under /public/images. Drop a PNG
// at the listed `src` path and it renders automatically — no component
// changes required. See <Photo> for the loading/fallback behavior.
export const imageSlots: Record<string, ImageSlot> = {
  "hero-main": {
    id: "hero-main",
    alt: "Freshly detailed dark luxury SUV inside D's Spotless detailing studio",
    src: "/images/hero/hero-main.png",
    position: "center 45%",
  },
  "hero-alt": {
    id: "hero-alt",
    alt: "Freshly detailed premium sedan outside a Toronto detailing facility",
    src: "/images/hero/hero-alt.png",
  },

  "before-dirty-suv": {
    id: "before-dirty-suv",
    alt: "SUV heavily covered in mud and dust before a professional detail",
    src: "/images/work/before-dirty-suv.png",
    position: "center 55%",
  },
  "clean-suv": {
    id: "clean-suv",
    alt: "The same SUV after a professional detail, mud and dust fully removed",
    src: "/images/work/clean-suv.png",
    position: "center 55%",
  },

  "service-interior": {
    id: "service-interior",
    alt: "Interior detailing — seats, dash and carpets deep cleaned",
    src: "/images/services/interior-detailing.png",
  },
  "service-exterior": {
    id: "service-exterior",
    alt: "Exterior detailing — hand wash and finishing",
    src: "/images/services/exterior-detailing.png",
  },
  "service-deep-clean": {
    id: "service-deep-clean",
    alt: "Deep cleaning — steam extraction and stain treatment",
    src: "/images/services/deep-cleaning.png",
  },
  "service-engine": {
    id: "service-engine",
    alt: "Additional care — engine bay and finishing detail",
    src: "/images/services/engine-detailing.png",
  },

  "work-acadia": {
    id: "work-acadia",
    alt: "Three-row SUV — Gold Package detail",
    src: "/images/work/work-acadia.png",
  },
  "work-atlas": {
    id: "work-atlas",
    alt: "Midsize SUV — Gold Package detail",
    src: "/images/work/work-atlas.png",
    position: "center 62%",
  },
  "work-pickup": {
    id: "work-pickup",
    alt: "Pickup truck — detailed exterior and interior",
    src: "/images/work/work-pickup.png",
  },
  "work-suv": {
    id: "work-suv",
    alt: "Premium SUV — full detail",
    src: "/images/work/work-suv.png",
    position: "center 60%",
  },
  "work-sedan": {
    id: "work-sedan",
    alt: "Luxury sedan — full detail",
    src: "/images/work/work-sedan.png",
  },
  "work-sports-car": {
    id: "work-sports-car",
    alt: "Sports coupe — Gold Package detail",
    src: "/images/work/work-sports-car.png",
  },
  "work-golf-gti": {
    id: "work-golf-gti",
    alt: "Red hot hatch — Diamond Package performance detail",
    src: "/images/work/work-golf-gti.png",
  },
  "work-gmc-sierra": {
    id: "work-gmc-sierra",
    alt: "Black pickup truck — Diamond Package detail",
    src: "/images/work/work-gmc-sierra.png",
  },
  "work-bmw-m3": {
    id: "work-bmw-m3",
    alt: "Gray sedan — Gold Package detail, rear view",
    src: "/images/work/work-bmw-m3.png",
  },
  "work-jeep-suv": {
    id: "work-jeep-suv",
    alt: "Black SUV — Diamond Package detail",
    src: "/images/work/work-jeep-suv.png",
  },
  "work-bmw-interior": {
    id: "work-bmw-interior",
    alt: "Cream leather interior — Silver Package interior deep clean",
    src: "/images/work/work-bmw-interior.png",
  },
  "work-paint-correction": {
    id: "work-paint-correction",
    alt: "Professional buffing machine polishing car paint — Diamond Package paint correction",
    src: "/images/work/work-paint-correction.png",
  },

  "gallery-01": { id: "gallery-01", alt: "Black sedan — exterior detail", src: "/images/gallery/gallery-01.png" },
  "gallery-02": { id: "gallery-02", alt: "Silver sedan — full detail", src: "/images/gallery/gallery-02.png" },
  "gallery-03": { id: "gallery-03", alt: "Sports coupe — exterior detail", src: "/images/gallery/gallery-03.png" },
  "gallery-04": { id: "gallery-04", alt: "Three-row SUV — full detail", src: "/images/gallery/gallery-04.png" },
  "gallery-05": { id: "gallery-05", alt: "Pickup truck — exterior detail", src: "/images/gallery/gallery-05.png" },
  "gallery-06": { id: "gallery-06", alt: "Family SUV — full detail", src: "/images/gallery/gallery-06.png", position: "center 60%" },
  "gallery-07": { id: "gallery-07", alt: "Deep-cleaned vehicle interior", src: "/images/gallery/gallery-07.png" },
  "gallery-08": { id: "gallery-08", alt: "Detailed wheel and paint finish", src: "/images/gallery/gallery-08.png" },
  "gallery-09": {
    id: "gallery-09",
    alt: "Detailed interior — black and saddle-brown leather dashboard and steering wheel",
    src: "/images/gallery/gallery-09.png",
  },
  "gallery-10": {
    id: "gallery-10",
    alt: "Detailed interior — center console with wood trim and leather seats",
    src: "/images/gallery/gallery-10.png",
  },
  "gallery-11": {
    id: "gallery-11",
    alt: "Detailed interior — steering wheel and dashboard, clean and polished",
    src: "/images/gallery/gallery-11.png",
  },
  "gallery-12": {
    id: "gallery-12",
    alt: "Exterior detail — pressure washing foam off a freshly cleaned car",
    src: "/images/gallery/gallery-12.png",
  },
  "gallery-13": {
    id: "gallery-13",
    alt: "Exterior detail — hand wiping a clean wheel and rim",
    src: "/images/gallery/gallery-13.png",
  },
  "gallery-14": { id: "gallery-14", alt: "Silver sedan parked outdoors — full detail", src: "/images/gallery/gallery-14.png" },
  "gallery-15": {
    id: "gallery-15",
    alt: "White sedan parked by the water — full detail",
    src: "/images/gallery/gallery-15.png",
  },
  "gallery-16": {
    id: "gallery-16",
    alt: "White SUV — full detail, rear three-quarter view",
    src: "/images/gallery/gallery-16.png",
  },
};
