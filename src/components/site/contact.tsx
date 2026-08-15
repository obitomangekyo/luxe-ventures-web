import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ContactForm } from "@/components/contact/contact-form";
import { Eyebrow } from "@/components/site/eyebrow";
import { env } from "@/env";

export function Contact() {
  return (
    <section id="contact" className="bg-brand-accent">
      <div className="container mx-auto grid gap-10 px-5 py-16 *:min-w-0 xl:grid-cols-[0.8fr_1.2fr] xl:items-start xl:gap-24 xl:px-10 xl:py-24">
        <div>
          <Eyebrow>Start a conversation</Eyebrow>
          <h2 className="mt-4 font-semibold text-5xl leading-none sm:text-6xl">
            Your next beautiful chapter starts here.
          </h2>
          <p className="mt-6 max-w-sm leading-7">
            Tell us what you&apos;re imagining. We&apos;ll bring the structure, polish, and
            finishing touches.
          </p>
          <div className="mt-8 flex flex-col items-start gap-2 font-semibold text-sm">
            <a
              href={`mailto:${env.VITE_CONTACT_EMAIL}`}
              className="border-brand-text/40 border-b pb-1 transition-colors hover:border-brand-text"
            >
              {env.VITE_CONTACT_EMAIL}
            </a>
            <a
              href={`https://instagram.com/${env.VITE_CONTACT_INSTAGRAM}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-[1ch] border-brand-text/40 border-b pb-1 transition-colors hover:border-brand-text"
            >
              Follow along on Instagram
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-[1lh]" />
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
