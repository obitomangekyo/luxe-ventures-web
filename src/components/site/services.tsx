import { Eyebrow } from "@/components/site/eyebrow";
import { services } from "@/data/content";
import { OptimizedImage } from "./optimized-image";

export function Services() {
  return (
    <section id="services" className="container mx-auto px-5 py-16 xl:px-10 xl:py-24">
      <div className="mb-10 flex items-end justify-between gap-5">
        <div>
          <Eyebrow className="text-brand-accent">What we do</Eyebrow>
          <h2 className="mt-3 font-semibold text-4xl sm:text-5xl">Designed around you.</h2>
        </div>
        <span className="hidden text-brand-detail text-sm sm:block">01 — 03</span>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.number}
            className="group border border-black/10 bg-white p-3 transition duration-300 hover:-translate-y-2 hover:border-brand-accent hover:shadow-[8px_8px_0_#de5d83]"
          >
            <OptimizedImage
              asset={service.asset}
              alt={service.alt}
              width={1200}
              height={900}
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              fetchPriority="low"
              className="aspect-4/3 w-full object-cover"
            />
            <div className="p-4">
              <p className="font-bold text-brand-accent text-xs tracking-[0.18em]">
                {service.number}
              </p>
              <h3 className="mt-3 font-semibold text-2xl">{service.title}</h3>
              <p className="mt-3 text-brand-detail text-sm leading-6">{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
