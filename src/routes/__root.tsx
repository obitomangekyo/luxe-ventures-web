import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { RootError, RootNotFound, RootPending } from "@/components/root/root-boundaries";
import { RootDocument } from "@/components/root/root-document";
import { RootLayout } from "@/components/root/root-layout";
import { env } from "@/env";
import { reportError } from "@/lib/error-reporting";
import { SEO_CONSTANTS } from "@/lib/seo-constants";
import { generateStructuredData } from "@/lib/seo-helpers";
import appCss from "@/styles.css?url";

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  wrapInSuspense: true,
  pendingMs: 200,
  pendingMinMs: 350,
  pendingComponent: RootPending,
  errorComponent: RootError,
  notFoundComponent: RootNotFound,
  onError: (error) => reportError(error, { kind: "router.onError" }),
  onCatch: (error) => reportError(error, { kind: "router.onCatch" }),
  head: () => {
    const structured = generateStructuredData();
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "referrer",
          content: "strict-origin-when-cross-origin",
        },
        {
          name: "color-scheme",
          content: "light",
        },
        { title: SEO_CONSTANTS.title },
        { name: "description", content: SEO_CONSTANTS.description },
        { name: "keywords", content: SEO_CONSTANTS.keywords.join(", ") },
        { name: "theme-color", content: SEO_CONSTANTS.themeColor },
        { name: "author", content: SEO_CONSTANTS.siteName },
        { property: "og:type", content: "website" },
        { property: "og:title", content: SEO_CONSTANTS.title },
        { property: "og:description", content: SEO_CONSTANTS.description },
        { property: "og:url", content: SEO_CONSTANTS.siteUrl },
        { property: "og:image", content: SEO_CONSTANTS.socialImage },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:alt", content: SEO_CONSTANTS.socialImageAlt },
        { property: "og:image:width", content: SEO_CONSTANTS.socialImageWidth },
        { property: "og:image:height", content: SEO_CONSTANTS.socialImageHeight },
        { property: "og:locale", content: "en_US" },
        { property: "og:site_name", content: SEO_CONSTANTS.siteName },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SEO_CONSTANTS.title },
        { name: "twitter:description", content: SEO_CONSTANTS.description },
        { name: "twitter:image", content: SEO_CONSTANTS.socialImage },
        { name: "twitter:image:alt", content: SEO_CONSTANTS.socialImageAlt },
      ],
      links: [
        { rel: "stylesheet", href: appCss },

        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "canonical", href: SEO_CONSTANTS.siteUrl },
      ],
      scripts: [
        ...(import.meta.env.PROD
          ? [
              {
                children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${env.VITE_GTM_ID}');`,
              },
            ]
          : []),
        ...Object.values(structured).map((data) => ({
          type: "application/ld+json",
          children: JSON.stringify(data),
        })),
      ],
    };
  },
  shellComponent: RootDocument,
  component: RootLayout,
});
