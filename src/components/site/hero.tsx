import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/eyebrow";
import { OptimizedImage } from "@/components/site/optimized-image";
import { imageAssets } from "@/lib/image-assets";

export function Hero() {
  return (
    <section className="container mx-auto min-h-[calc(100vh-77px)] px-5 pt-16 pb-14 text-center xl:px-10 xl:pt-28 xl:pb-24">
      <Eyebrow className="text-brand-accent">New Jersey · Events & styling</Eyebrow>
      <h1 className="mx-auto mt-5 max-w-4xl font-semibold text-5xl leading-[0.96] tracking-[-0.04em] sm:text-7xl xl:text-8xl">
        Events Wrapped <span className="text-brand-accent">in Luxury.</span>
      </h1>
      <p className="mx-auto mt-7 max-w-xl text-base text-brand-detail leading-7 sm:text-lg">
        Affordable, premium event decoration and styling tailored for your most memorable moments.
      </p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="."
          hash="contact"
          className="flex items-center justify-center gap-[1ch] rounded-full bg-brand-text px-7 py-3.5 font-bold text-sm text-white transition hover:bg-brand-accent"
        >
          Plan your event <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-[1lh]" />
        </Link>
        <Link
          to="."
          hash="gallery"
          className="rounded-full border border-black/20 px-7 py-3.5 font-bold text-sm transition hover:border-brand-accent hover:text-brand-accent"
        >
          Explore the work
        </Link>
      </div>
      <div className="mt-14 overflow-hidden rounded-xl shadow-lg sm:mt-20">
        <OptimizedImage
          asset={imageAssets.heroReception}
          alt="A bright modern event installation with coral and pink panels, colorful florals, and transparent acrylic furniture"
          width={1600}
          height={686}
          sizes="100vw"
          fetchPriority="high"
          className="aspect-21/9 w-full object-cover"
        />
      </div>
    </section>
  );
}
