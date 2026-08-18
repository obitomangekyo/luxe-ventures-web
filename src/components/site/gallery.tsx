import ArrowNE from "@/assets/svgs/doodle-icons/arrow-ne.svg?react";
import { InstagramShowcase } from "@/components/site/instagram-showcase";
import { SectionIntro } from "@/components/site/section-intro";
import { ThemedImage } from "@/components/site/themed-image";
import { gallery } from "@/data/content";
import { env } from "@/env";
import { cn } from "@/lib/utils";

export function Gallery() {
  return (
    <section id="gallery" className="bg-brand-muted">
      <div className="container mx-auto px-5 py-28 xl:px-10 xl:py-40">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionIntro eyebrow="A glimpse into the work" title="Made to be remembered." />
          <a
            href={`https://instagram.com/${env.VITE_CONTACT_INSTAGRAM}`}
            target="_blank"
            rel="noreferrer"
            className="mb-12 flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] underline decoration-brand-detail underline-offset-8"
          >
            Follow @{env.VITE_CONTACT_INSTAGRAM} <ArrowNE className="w-[1lh]" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {gallery.map((image) => (
            <div className={cn("overflow-hidden", image.className)} key={image.asset.luxury.src}>
              <ThemedImage
                asset={image.asset}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover grayscale-15 transition duration-700 hover:scale-105 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
        <InstagramShowcase />
      </div>
    </section>
  );
}
