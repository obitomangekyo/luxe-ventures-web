export type ImageAsset = {
  src: string;
  width: number;
  height: number;
};

export type ThemeImageAsset = { luxury: ImageAsset; summer: ImageAsset };

const image = (src: string, width: number, height: number): ImageAsset => ({ src, width, height });

export const imageAssets = {
  heroCelebration: {
    luxury: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1086,h_1448,c_fill,g_auto/v1786871320/luxe-ventures-web/assets/images/luxury/hero-celebration.jpg",
      1086,
      1448,
    ),
    summer: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1086,h_1448,c_fill,g_auto/v1786871740/luxe-ventures-web/assets/images/summer/hero-celebration.jpg",
      1086,
      1448,
    ),
  },
  socialCelebration: {
    luxury: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1448,h_1086,c_fill,g_auto/v1786871333/luxe-ventures-web/assets/images/luxury/social-celebration.jpg",
      1448,
      1086,
    ),
    summer: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1448,h_1086,c_fill,g_auto/v1786871701/luxe-ventures-web/assets/images/summer/social-celebration.jpg",
      1448,
      1086,
    ),
  },
  corporateGathering: {
    luxury: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1448,h_1086,c_fill,g_auto/v1786871338/luxe-ventures-web/assets/images/luxury/corporate-gathering.jpg",
      1448,
      1086,
    ),
    summer: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1448,h_1086,c_fill,g_auto/v1786871616/luxe-ventures-web/assets/images/summer/corporate-gathering.jpg",
      1448,
      1086,
    ),
  },
  customTheme: {
    luxury: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1448,h_1086,c_fill,g_auto/v1786871336/luxe-ventures-web/assets/images/luxury/custom-theme.jpg",
      1448,
      1086,
    ),
    summer: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1448,h_1086,c_fill,g_auto/v1786871663/luxe-ventures-web/assets/images/summer/custom-theme.jpg",
      1448,
      1086,
    ),
  },
  venueEntrance: {
    luxury: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1122,h_1402,c_fill,g_auto/v1786871340/luxe-ventures-web/assets/images/luxury/venue-entrance.jpg",
      1122,
      1402,
    ),
    summer: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1122,h_1402,c_fill,g_auto/v1786871686/luxe-ventures-web/assets/images/summer/venue-entrance.jpg",
      1122,
      1402,
    ),
  },
  intimateDinner: {
    luxury: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1254,ar_1:1,c_fill,g_auto/v1786871324/luxe-ventures-web/assets/images/luxury/intimate-dinner.jpg",
      1254,
      1254,
    ),
    summer: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1254,ar_1:1,c_fill,g_auto/v1786871649/luxe-ventures-web/assets/images/summer/intimate-dinner.jpg",
      1254,
      1254,
    ),
  },
  placeSetting: {
    luxury: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1122,h_1402,c_fill,g_auto/v1786871322/luxe-ventures-web/assets/images/luxury/place-setting.jpg",
      1122,
      1402,
    ),
    summer: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1254,ar_1:1,c_fill,g_auto/v1786871717/luxe-ventures-web/assets/images/summer/place-setting.jpg",
      1254,
      1254,
    ),
  },
  gardenCelebration: {
    luxury: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1254,ar_1:1,c_fill,g_auto/v1786871325/luxe-ventures-web/assets/images/luxury/garden-celebration.jpg",
      1254,
      1254,
    ),
    summer: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1254,ar_1:1,c_fill,g_auto/v1786871505/luxe-ventures-web/assets/images/summer/garden-celebration.jpg",
      1254,
      1254,
    ),
  },
  centerPiece: {
    luxury: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1086,h_1448,c_fill,g_auto/v1787073448/luxe-ventures-web/assets/luxury-center-piece.jpg",
      1086,
      1448,
    ),
    summer: image(
      "https://res.cloudinary.com/smoqpurp/image/upload/f_auto,q_auto,w_1086,h_1448,c_fill,g_auto/v1787073448/luxe-ventures-web/assets/summer-center-piece.jpg",
      1086,
      1448,
    ),
  },
} as const satisfies Record<string, ThemeImageAsset>;
