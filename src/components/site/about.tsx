import { Eyebrow } from "@/components/site/eyebrow";

export function About() {
  return (
    <section id="about" className="border-black/10 border-y bg-[#f8f8f8]">
      <div className="container mx-auto grid gap-10 px-5 py-16 *:min-w-0 xl:grid-cols-[0.8fr_1.2fr] xl:gap-24 xl:px-10 xl:py-24">
        <div>
          <Eyebrow className="text-brand-accent">The Luxe approach</Eyebrow>
          <h2 className="mt-4 max-w-sm font-semibold text-4xl leading-tight sm:text-5xl">
            What makes a moment unforgettable?
          </h2>
        </div>
        <div className="max-w-2xl space-y-5 text-brand-detail text-lg leading-8">
          <p>At Luxe Ventures, we believe every milestone deserves a breathtaking setting.</p>
          <p>
            We bring high-caliber design, meticulous attention to detail, and elegant styling to
            your events—making luxury accessible without compromising on sophistication.
          </p>
        </div>
      </div>
    </section>
  );
}
