import { ContactForm } from "@/components/contact/contact-form";
import { SectionIntro } from "@/components/site/section-intro";
import { env } from "@/env";

export function Contact() {
  return (
    <section id="contact">
      <div className="container mx-auto grid gap-16 px-5 py-28 *:min-w-0 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28 xl:px-10 xl:py-40">
        <div>
          <SectionIntro eyebrow="Your next chapter" title="Let's make something unforgettable." />
          <p className="max-w-sm font-body text-brand-text/65 text-sm leading-7">
            Tell us a little about your occasion, and we&apos;ll start shaping a setting that feels
            entirely yours.
          </p>
          <div className="mt-10 space-y-3 font-body text-brand-text/60 text-xs">
            <p>Based in New Jersey · Creating everywhere</p>
            <a
              href={`mailto:${env.VITE_CONTACT_EMAIL}`}
              className="inline-block underline decoration-brand-detail underline-offset-4"
            >
              {env.VITE_CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
