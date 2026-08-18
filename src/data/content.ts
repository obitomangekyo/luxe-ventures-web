import { imageAssets } from "@/lib/image-assets";

export const navigationLinks = [
  { href: "story", label: "Our story" },
  { href: "services", label: "Services" },
  { href: "gallery", label: "Showcase" },
] as const;

export const gallery = [
  {
    asset: imageAssets.venueEntrance,
    alt: {
      luxury: "Candlelit floral entrance with ivory drapery and soft champagne lighting",
      summer:
        "Bright garden-venue entrance with mint fabric, warm peach ribbons, and seasonal flowers",
    },
    className: "aspect-4/5",
  },
  {
    asset: imageAssets.intimateDinner,
    alt: {
      luxury:
        "Romantic candlelit dinner table with ivory flowers, crystal glassware, and warm linen",
      summer:
        "Open-air dinner table with warm white linen, mint napkins, warm peach flowers, and garden greenery",
    },
    className: "aspect-square md:mt-20",
  },
  {
    asset: imageAssets.placeSetting,
    alt: {
      luxury:
        "Elegant dinner place setting with ivory linen, champagne flatware, and delicate florals",
      summer:
        "Handmade ceramic place setting with mint linen, warm peach cup, clear glass, and fresh greenery",
    },
    className: "aspect-4/5",
  },
  {
    asset: imageAssets.gardenCelebration,
    alt: {
      luxury: "Outdoor celebration table beneath greenery with refined floral arrangements",
      summer:
        "Sunny garden celebration table with warm white linen, mint accents, warm peach flowers, and fruit",
    },
    className: "aspect-square md:mt-20",
  },
  {
    asset: imageAssets.centerPiece,
    alt: {
      luxury:
        "Tall elevated floral centerpiece with ivory blooms on a champagne-gold stand in a formal reception",
      summer:
        "Tall mint and peach floral centerpiece elevated above a bright contemporary celebration table",
    },
    className: "aspect-4/5",
  },
] as const;

export const services = [
  {
    number: "01",
    title: "Social Celebrations",
    copy: "From milestones and birthdays to elegant bridal showers and intimate dinners, we curate personalized settings that match your exact theme.",
    image: imageAssets.socialCelebration,
    alt: {
      luxury: "Ivory floral table centerpiece for an intimate social celebration",
      summer:
        "Welcoming open-air brunch table with mint linen, warm peach napkins, seasonal flowers, and peaches",
    },
  },
  {
    number: "02",
    title: "Corporate Gatherings",
    copy: "Elevating business launches, gala nights, and holiday parties with crisp, professional layouts that honor and reflect your brand profile.",
    image: imageAssets.corporateGathering,
    alt: {
      luxury:
        "Elevated corporate gala lounge with charcoal seating, warm lighting, and floral accents",
      summer:
        "Light-filled corporate gathering lounge with mint seating, warm peach cushions, pale wood, and plants",
    },
  },
  {
    number: "03",
    title: "Custom Themes",
    copy: "Bespoke creative design structures built from the ground up for specific large-scale event settings and elite installations.",
    image: imageAssets.customTheme,
    alt: {
      luxury: "Bespoke floral backdrop and sculptural installation for an elegant event",
      summer:
        "Handmade outdoor ceremony backdrop with mint arches, warm peach fabric, canvas, wood, and greenery",
    },
  },
] as const;
