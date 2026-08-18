import { useEffect, useState } from "react";
import { InstagramPostMedia } from "@/components/site/instagram-post-media";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { BeholdPost } from "@/lib/behold";

export function InstagramPostDialog({
  posts,
  activeIndex,
  onOpenChange,
}: {
  posts: BeholdPost[];
  activeIndex: number | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(activeIndex ?? 0);

  useEffect(() => {
    if (!api) return;

    if (activeIndex !== null) {
      api.scrollTo(activeIndex, true);
      setCurrent(activeIndex);
    }

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, activeIndex]);

  return (
    <Dialog open={activeIndex !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-11/12 overflow-auto rounded-none border-brand-detail/40 bg-brand-bg p-0 sm:max-w-3xl">
        <DialogTitle className="sr-only">Instagram post preview</DialogTitle>
        <Carousel
          setApi={setApi}
          opts={{ startIndex: activeIndex ?? 0 }}
          className="w-full min-w-0 overflow-hidden"
        >
          <CarouselContent className="min-w-0">
            {posts.map((post, index) => (
              <CarouselItem key={post.id} className="min-w-0 overflow-hidden">
                <InstagramPostMedia post={post} isActive={index === current} />
                <div className="flex min-w-0 items-center justify-between gap-4 px-6 py-4">
                  {post.prunedCaption ? (
                    <p className="line-clamp-2 min-w-0 font-body text-brand-text/80 text-xs">
                      {post.prunedCaption}
                    </p>
                  ) : (
                    <span />
                  )}
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 font-body text-[10px] text-brand-text uppercase tracking-[0.18em] underline underline-offset-4"
                  >
                    Open on Instagram
                  </a>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 rounded-none disabled:hidden" />
          <CarouselNext className="right-4 rounded-none disabled:hidden" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
