import { useState } from "react";
import ArrowNE from "@/assets/svgs/doodle-icons/arrow-ne.svg?react";
import { InstagramPostCarousel } from "@/components/site/instagram-post-carousel";
import { InstagramPostDialog } from "@/components/site/instagram-post-dialog";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env";
import { useBeholdFeed } from "@/hooks/use-behold-feed";
import { useInView } from "@/hooks/use-in-view";

export function InstagramShowcase() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({ triggerOnce: true });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { data: posts = [], isPending, isError } = useBeholdFeed(isInView);
  const isLoading = !isInView || isPending;

  return (
    <section
      ref={sectionRef}
      className="mt-24 border-brand-text/15 border-t pt-16 sm:mt-32 sm:pt-20"
      aria-live="polite"
    >
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-4 font-body text-[10px] text-brand-detail uppercase tracking-[0.3em]">
            From the studio
          </p>
          <h3 className="max-w-md text-3xl leading-tight sm:text-4xl">
            The moments between the big ones.
          </h3>
        </div>
        <a
          href={`https://instagram.com/${env.VITE_CONTACT_INSTAGRAM}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 self-start font-body text-[10px] text-brand-text uppercase tracking-[0.18em] underline decoration-brand-detail underline-offset-8 sm:self-auto"
        >
          Open Instagram <ArrowNE className="w-3.5" />
        </a>
      </div>

      {isLoading && <LoadingGrid />}
      {!isLoading && isError && (
        <Empty className="min-h-56 rounded-none border-brand-detail/50 bg-brand-bg/40">
          <EmptyHeader>
            <EmptyTitle>We could not bring the studio feed through.</EmptyTitle>
            <EmptyDescription>
              Visit Instagram directly for the latest Luxe Ventures work.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {!(isLoading || isError) && posts.length === 0 && (
        <Empty className="min-h-56 rounded-none border-brand-detail/50 bg-brand-bg/40">
          <EmptyHeader>
            <EmptyTitle>The studio feed is being prepared.</EmptyTitle>
            <EmptyDescription>
              Follow Luxe Ventures on Instagram for new celebrations, details, and ideas.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {!(isLoading || isError) && posts.length > 0 && (
        <>
          <InstagramPostCarousel posts={posts} onSelect={setActiveIndex} />
          <InstagramPostDialog
            posts={posts}
            activeIndex={activeIndex}
            onOpenChange={(open) => !open && setActiveIndex(null)}
          />
        </>
      )}
    </section>
  );
}

function LoadingGrid() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading Instagram feed">
      <div className="flex gap-3 overflow-hidden *:shrink-0 sm:gap-5">
        {["one", "two", "three", "four", "five", "six"].map((key) => (
          <Skeleton
            key={key}
            className="aspect-square basis-1/2 rounded-none border border-brand-detail/30 sm:basis-1/3"
          />
        ))}
      </div>
      <div className="flex gap-3">
        {["previous", "next"].map((key) => (
          <Skeleton key={key} className="size-7 rounded-none border border-brand-detail/30" />
        ))}
      </div>
    </div>
  );
}
