import { Link } from "@tanstack/react-router";
import LuxeVenturesFullLogo from "@/assets/svgs/luxe-ventures-full-logo.svg?react";
import { useIsMobile } from "@/lib/use-is-mobile";

export function SiteHeader() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 border-black/10 border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-5 xl:h-20 xl:px-10">
        <Link to="/" aria-label="Luxe Ventures home">
          <LuxeVenturesFullLogo className="w-20 text-brand-detail xl:w-24" />
        </Link>
        {!isMobile ? (
          <nav
            className="flex items-center gap-7 font-bold text-xs uppercase tracking-[0.15em]"
            aria-label="Main navigation"
          >
            <Link to="." hash="about" className="transition-colors hover:text-brand-accent">
              About
            </Link>
            <Link to="." hash="services" className="transition-colors hover:text-brand-accent">
              Services
            </Link>
            <Link to="." hash="gallery" className="transition-colors hover:text-brand-accent">
              Gallery
            </Link>
            <Link
              to="."
              hash="contact"
              className="rounded-full bg-brand-text px-5 py-3 text-white transition-colors hover:bg-brand-accent"
            >
              Inquire
            </Link>
          </nav>
        ) : (
          <Link
            to="."
            hash="contact"
            className="rounded-full bg-brand-text px-4 py-2.5 font-bold text-white text-xs uppercase tracking-[0.14em]"
          >
            Inquire
          </Link>
        )}
      </div>
    </header>
  );
}
