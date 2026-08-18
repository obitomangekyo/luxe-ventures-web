import { Link } from "@tanstack/react-router";
import ArrowNE from "@/assets/svgs/doodle-icons/arrow-ne.svg?react";
import Sparkles from "@/assets/svgs/sparkles.svg?react";
import { ThemedImage } from "@/components/site/themed-image";
import { Button } from "@/components/ui/button";
import { imageAssets } from "@/lib/image-assets";

export function Hero() {
  return (
    <section
      id="top"
      className="container mx-auto grid min-h-[calc(100vh-77px)] items-center gap-14 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-10 xl:px-10 xl:py-24"
    >
      <div className="max-w-2xl">
        <p className="mb-7 flex items-center gap-3 font-body text-[10px] text-brand-text/55 uppercase tracking-[0.3em]">
          <span className="h-px w-10 bg-brand-detail" /> Event design, thoughtfully considered
        </p>
        <h1 className="max-w-3xl text-5xl leading-[0.98] tracking-[-0.03em] sm:text-7xl lg:text-[6.7rem]">
          Events
          <br />
          <em className="text-brand-detail">wrapped</em>
          <br />
          in luxury.
        </h1>
        <p className="mt-8 max-w-lg font-body text-brand-text/65 text-sm leading-7 sm:text-base">
          Premium event decoration and styling tailored for your most memorable moments.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            nativeButton={false}
            render={<Link to="." hash="contact" />}
            className="h-12 rounded-none border border-brand-text bg-brand-text px-7 font-body text-[10px] text-brand-bg uppercase tracking-[0.22em] shadow-none transition-all duration-500 hover:bg-brand-detail hover:text-brand-text"
          >
            Begin your experience <ArrowNE className="ml-3 w-4" />
          </Button>
          <Link
            to="."
            hash="gallery"
            className="font-body text-[10px] text-brand-text/60 uppercase tracking-[0.2em] underline decoration-brand-detail underline-offset-8 transition-colors hover:text-brand-text"
          >
            Explore the work
          </Link>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-md md:ml-auto">
        <div className="absolute -inset-3 border border-brand-detail/70" />
        <ThemedImage
          asset={imageAssets.heroCelebration}
          alt={{
            luxury:
              "Candlelit luxury wedding reception styled with ivory flowers, crystal glassware, and warm drapery",
            summer:
              "Sunlit garden gathering with warm white linen, mint napkins, warm peach flowers, citrus, and woven chairs",
          }}
          fetchPriority="high"
          className="relative aspect-3/4 w-full object-cover"
        />
        <div className="absolute -bottom-8 -left-8 hidden max-w-41 bg-brand-bg/95 p-5 shadow-xl sm:block">
          <Sparkles className="mb-2 w-6 text-brand-detail" />
          <p className="font-heading text-lg leading-tight">The details make the moment.</p>
        </div>
      </div>
    </section>
  );
}
