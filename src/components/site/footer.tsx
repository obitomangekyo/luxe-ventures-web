import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import LuxeVenturesWordmark from "@/assets/svgs/luxe-ventures-wordmark.svg?react";
import { env } from "@/env";

export function Footer() {
  return (
    <footer className="bg-brand-text text-sm text-white/70">
      <div className="container mx-auto flex flex-col gap-6 px-5 py-8 xl:px-10">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <LuxeVenturesWordmark className="w-26 text-brand-detail" />
          <span>&copy; {new Date().getFullYear()} Luxe Ventures. Events wrapped in luxury.</span>
        </div>
        <div className="flex flex-col items-start gap-3 border-white/15 border-t pt-5 text-xs uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:gap-6">
          <a
            href={`mailto:${env.VITE_CONTACT_EMAIL}`}
            className="transition-colors hover:text-brand-accent"
          >
            {env.VITE_CONTACT_EMAIL}
          </a>
          <a
            href={`https://instagram.com/${env.VITE_CONTACT_INSTAGRAM}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-[1ch] transition-colors hover:text-brand-accent"
          >
            Instagram
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-[1lh]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
