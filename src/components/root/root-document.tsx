import { HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { themeInitScript } from "@/lib/theme";

export function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap contains no user input */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body data-theme-default="luxury">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
