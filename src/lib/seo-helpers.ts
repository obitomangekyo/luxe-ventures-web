import { env } from "@/env";
import { SEO_CONSTANTS } from "@/lib/seo-constants";

export function generateStructuredData() {
  return {
    organizationData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SEO_CONSTANTS.siteName,
      url: SEO_CONSTANTS.siteUrl,
      description: SEO_CONSTANTS.description,
      image: SEO_CONSTANTS.socialImage,
      sameAs: [`https://instagram.com/${env.VITE_CONTACT_INSTAGRAM}`],
    },
    websiteData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SEO_CONSTANTS.siteName,
      url: SEO_CONSTANTS.siteUrl,
      description: SEO_CONSTANTS.description,
    },
    serviceData: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: SEO_CONSTANTS.siteName,
      description: SEO_CONSTANTS.description,
      url: SEO_CONSTANTS.siteUrl,
      image: SEO_CONSTANTS.socialImage,
      areaServed: "New Jersey",
      serviceType: "Event decoration and styling",
    },
  };
}
