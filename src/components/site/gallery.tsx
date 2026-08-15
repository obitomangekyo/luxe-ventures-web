import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { cn } from "#/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { gallery } from "@/data/content";
import { OptimizedImage } from "./optimized-image";

export function Gallery() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  return (
    <section id="gallery" className="bg-brand-text text-white">
      <div className="container mx-auto px-5 py-16 xl:px-10 xl:py-24">
        <div className="flex items-end justify-between">
          <div>
            <Eyebrow className="text-brand-accent">Selected work</Eyebrow>
            <h2 className="mt-3 font-semibold text-4xl sm:text-5xl">A little atmosphere.</h2>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              aria-label="Previous gallery image"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!carouselApi?.canScrollPrev?.()}
              className="size-10 rounded-full border border-white/30 transition hover:border-brand-accent hover:text-brand-accent"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-[1lh]" />
            </Button>
            <Button
              type="button"
              aria-label="Next gallery image"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!carouselApi?.canScrollNext?.()}
              className="size-10 rounded-full border border-white/30 transition hover:border-brand-accent hover:text-brand-accent"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-[1lh]" />
            </Button>
          </div>
        </div>
        <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: true }} className="mt-10">
          <CarouselContent className="-ml-4">
            {gallery.map((item, index) => (
              <CarouselItem
                key={item.title}
                className="basis-88/100 pl-4 sm:basis-1/2 xl:basis-1/4"
              >
                <button
                  type="button"
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={cn("group block w-full text-left")}
                >
                  <OptimizedImage
                    asset={item.asset}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 88vw"
                    fetchPriority="low"
                    className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <span className="mt-3 block font-bold text-white/70 text-xs uppercase tracking-[0.14em]">
                    {item.title}
                  </span>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
