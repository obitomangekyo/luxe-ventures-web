import ArrowNE from "@/assets/svgs/doodle-icons/arrow-ne.svg?react";
import { SectionIntro } from "@/components/site/section-intro";
import { ThemedImage } from "@/components/site/themed-image";
import { Separator } from "@/components/ui/separator";
import { services } from "@/data/content";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section id="services" className="container mx-auto px-5 py-28 xl:px-10 xl:py-40">
      <SectionIntro
        eyebrow="What we create"
        title="Every celebration, considered from every angle."
      />
      <div className="space-y-24 md:space-y-32">
        {services.map((service, index) => (
          <article
            className="grid items-center gap-10 md:grid-cols-2 md:gap-20"
            key={service.number}
          >
            <div className={cn("overflow-hidden", index % 2 === 1 && "md:order-2")}>
              <ThemedImage
                asset={service.image}
                alt={service.alt}
                className="aspect-4/3 w-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            <div className={cn("max-w-md", index % 2 === 1 && "md:order-1 md:justify-self-end")}>
              <p className="mb-5 font-body text-brand-detail text-xs tracking-[0.2em]">
                {service.number}
              </p>
              <h3 className="text-3xl sm:text-4xl">{service.title}</h3>
              <Separator className="my-6 bg-brand-detail/60" />
              <p className="font-body text-brand-text/65 text-sm leading-7">{service.copy}</p>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center font-body text-[10px] text-brand-text uppercase tracking-[0.2em] underline decoration-brand-detail underline-offset-8"
              >
                Discuss your vision <ArrowNE className="ml-2 w-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
