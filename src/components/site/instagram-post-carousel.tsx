import ArrowNE from "@/assets/svgs/doodle-icons/arrow-ne.svg?react";
import Play from "@/assets/svgs/doodle-icons/play.svg?react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { env } from "@/env";
import type { BeholdPost } from "@/lib/behold";

export function InstagramPostCarousel({
  posts,
  onSelect,
}: {
  posts: BeholdPost[];
  onSelect: (index: number) => void;
}) {
  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <CarouselContent className="-ml-3 sm:-ml-5">
        {posts.map((post, index) => {
          const image = post.sizes.medium ?? post.sizes.small;

          return (
            <CarouselItem key={post.id} className="min-w-0 basis-1/2 pl-3 sm:basis-1/3 sm:pl-5">
              <button
                type="button"
                onClick={() => onSelect(index)}
                className="group relative block w-full min-w-0 overflow-hidden border border-brand-detail/40 bg-brand-bg"
              >
                <img
                  src={image.mediaUrl}
                  alt={post.altText || "Luxe Ventures Instagram event styling detail"}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                />
                {post.mediaType === "VIDEO" && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-bg/80 text-brand-text transition group-hover:scale-110">
                      <Play className="ml-0.5 w-[1em]" aria-hidden="true" />
                    </span>
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-brand-bg/90 px-4 py-3 font-body text-[9px] text-brand-text uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-y-0">
                  {post.mediaType === "VIDEO" ? "Play" : "View"}
                </span>
              </button>
            </CarouselItem>
          );
        })}
        <CarouselItem className="min-w-0 basis-1/2 pl-3 sm:basis-1/3 sm:pl-5">
          <a
            href={`https://instagram.com/${env.VITE_CONTACT_INSTAGRAM}`}
            target="_blank"
            rel="noreferrer"
            className="flex aspect-square w-full flex-col items-center justify-center gap-3 border border-brand-detail/40 bg-brand-bg/60 text-center transition hover:bg-brand-bg"
          >
            <ArrowNE className="w-4" />
            <span className="font-body text-[10px] text-brand-text uppercase tracking-[0.18em]">
              View all on Instagram
            </span>
          </a>
        </CarouselItem>
      </CarouselContent>
      <div className="mt-6 flex items-center justify-end gap-3">
        <CarouselPrevious className="static translate-y-0 rounded-none" />
        <CarouselNext className="static translate-y-0 rounded-none" />
      </div>
    </Carousel>
  );
}
