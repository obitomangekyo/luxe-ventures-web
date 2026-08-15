export const navigationLinks = [
  { href: "story", label: "Our story" },
  { href: "services", label: "Services" },
  { href: "gallery", label: "Showcase" },
] as const;

export const gallery = [
  {
    asset: imageAssets.ballroomEntrance,
    alt: "Candlelit Floral Ballroom Entrance",
    className: "aspect-4/5",
  },
  {
    asset: imageAssets.intimateDinner,
    alt: "Romantic Candlelit Floral Table Setting",
    className: "aspect-square md:mt-20",
  },
  {
    asset: imageAssets.placeSetting,
    alt: "Elegant dinner party styling",
    className: "aspect-4/5",
  },
  {
    asset: imageAssets.gardenCelebration,
    alt: "Outdoor celebration beneath greenery",
    className: "aspect-square md:mt-20",
  },
] as const;

export const services = [
  {
    number: "01",
    title: "Social Celebrations",
    copy: "From milestones and birthdays to elegant bridal showers and intimate dinners, we curate personalized micro-environments that match your exact theme.",
    image: imageAssets.socialCelebration,
    alt: "Blush floral table centerpiece for a social celebration",
  },
  {
    number: "02",
    title: "Corporate Galas",
    copy: "Elevating business launches, gala nights, and holiday parties with crisp, professional layouts that honor and reflect your brand profile.",
    image: imageAssets.corporateGala,
    alt: "Elevated corporate gala lounge and event design",
  },
  {
    number: "03",
    title: "Custom Themes",
    copy: "Bespoke creative design structures built from the ground up for specific large-scale event settings and elite installations.",
    image: imageAssets.customTheme,
    alt: "Bespoke floral backdrop and wedding installation",
  },
] as const;

import { imageAssets } from "@/lib/image-assets";
