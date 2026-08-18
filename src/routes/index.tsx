import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/about";
import { AmbientParticles } from "@/components/site/ambient-particles";
import { Contact } from "@/components/site/contact";
import { FeaturedWork } from "@/components/site/featured-work";
import { Footer } from "@/components/site/footer";
import { Gallery } from "@/components/site/gallery";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { SiteHeader } from "@/components/site/site-header";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <AmbientParticles />
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedWork />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
