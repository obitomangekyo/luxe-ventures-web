import { type ImageAsset, imageAssets } from "@/lib/image-assets";

export type Service = {
  number: string;
  title: string;
  description: string;
  asset: ImageAsset;
  alt: string;
};
export type GalleryItem = {
  title: string;
  asset: ImageAsset;
  alt: string;
  width: number;
  height: number;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Social Celebrations",
    description:
      "From milestones and birthdays to elegant bridal showers and intimate dinners, we curate personalized micro-environments that match your exact theme.",
    asset: imageAssets.socialCelebration,
    alt: "A vivid orange celebration table with cobalt napkins, colorful flowers, and jewel-toned glassware",
  },
  {
    number: "02",
    title: "Corporate Galas",
    description:
      "Elevating business launches, gala nights, and holiday parties with crisp, professional layouts that honor and reflect your brand profile.",
    asset: imageAssets.corporateGala,
    alt: "A modern concrete gala venue with coral lounge seating, chrome tables, and colorful floral arrangements",
  },
  {
    number: "03",
    title: "Custom Themes",
    description:
      "Bespoke creative design structures built from the ground up for specific large-scale event settings and elite installations.",
    asset: imageAssets.customTheme,
    alt: "A bespoke installation of oversized pink, orange, purple, and cobalt floral forms against geometric panels",
  },
];

export const gallery: GalleryItem[] = [
  {
    title: "A color-blocked place setting",
    asset: imageAssets.placeSetting,
    alt: "A color-blocked place setting with an orange napkin, cobalt glass, pink anthurium, and chrome cutlery",
    width: 1200,
    height: 1200,
  },
  {
    title: "An electric dinner setting",
    asset: imageAssets.intimateDinner,
    alt: "An evening dinner table with vivid flowers, pink and orange taper candles, purple glassware, and cobalt napkins",
    width: 1200,
    height: 1200,
  },
  {
    title: "A geometric venue entrance",
    asset: imageAssets.geometricVenueEntrance,
    alt: "A geometric event entrance framed by coral, pink, and cobalt panels with a colorful floral installation",
    width: 960,
    height: 1372,
  },
  {
    title: "A saturated garden celebration",
    asset: imageAssets.gardenCelebration,
    alt: "A colorful outdoor garden table with a cobalt cloth, coral napkins, bright flowers, and a pink canopy",
    width: 1200,
    height: 1200,
  },
];
