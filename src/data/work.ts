import type { WorkItem } from "../types";

// Representative examples of the vehicle types and package levels seen on
// @dsspotlessauto — presented as category imagery, not photographs of the
// specific vehicles posted there. Every entry uses a distinct real photo,
// separate from the images used in the Gallery section.
export const workItems: WorkItem[] = [
  { id: "w1", packageTier: "gold", vehicleType: "suv", vehicleLabel: "SUV Detail", imageId: "work-acadia" },
  { id: "w2", packageTier: "gold", vehicleType: "suv", vehicleLabel: "SUV Detail", imageId: "work-atlas" },
  { id: "w3", packageTier: "gold", vehicleType: "truck", vehicleLabel: "Truck Detail", imageId: "work-pickup" },
  { id: "w4", packageTier: "gold", vehicleType: "car", vehicleLabel: "Sports Detail", imageId: "work-sports-car" },
  { id: "w5", packageTier: "silver", vehicleType: "car", vehicleLabel: "Sedan Detail", imageId: "work-sedan" },
  { id: "w6", packageTier: "diamond", vehicleType: "car", vehicleLabel: "Performance Detail", imageId: "work-golf-gti" },
  {
    id: "w7",
    packageTier: "diamond",
    vehicleType: "truck",
    vehicleLabel: "Truck Detail",
    imageId: "work-gmc-sierra",
    note: "Diamond + exterior polish",
  },
  { id: "w8", packageTier: "silver", vehicleType: "suv", vehicleLabel: "SUV Detail", imageId: "work-suv" },
  { id: "w9", packageTier: "gold", vehicleType: "car", vehicleLabel: "Sedan Detail", imageId: "work-bmw-m3" },
  {
    id: "w10",
    packageTier: "diamond",
    vehicleType: "suv",
    vehicleLabel: "SUV Detail",
    imageId: "work-jeep-suv",
    note: "Diamond + interior protection",
  },
  {
    id: "w11",
    packageTier: "silver",
    vehicleType: "car",
    vehicleLabel: "Interior Deep Clean",
    imageId: "work-bmw-interior",
  },
  {
    id: "w12",
    packageTier: "diamond",
    vehicleType: "car",
    vehicleLabel: "Paint Correction",
    imageId: "work-paint-correction",
    note: "Diamond + paint correction",
  },
];
