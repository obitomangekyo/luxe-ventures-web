import type { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { env } from "@/env";

export type BeholdImageSize = {
  mediaUrl: string;
  width: number;
  height: number;
};

export type BeholdPost = {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  altText?: string;
  prunedCaption?: string;
  sizes: {
    small: BeholdImageSize;
    medium: BeholdImageSize;
  };
};

type BeholdFeed = {
  posts: BeholdPost[];
};

export async function fetchBeholdPosts({ signal }: QueryFunctionContext) {
  const response = await axios.get<BeholdFeed>(
    `https://feeds.behold.so/${env.VITE_BEHOLD_WIDGET_ID}`,
    { signal },
  );

  return Array.isArray(response.data.posts) ? response.data.posts.slice(0, 6) : [];
}
