import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { GtmTracking } from "@/components/GtmTracking";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env";
import { reportError } from "@/lib/error-reporting";
import { Sentry } from "@/lib/sentry";
import { ThemeProvider } from "@/lib/theme";

export function RootLayout() {
  useEffect(() => {
    const onUnhandledRejection = (event: PromiseRejectionEvent) =>
      reportError(event.reason, { kind: "unhandledrejection" });
    const onError = (event: ErrorEvent) =>
      reportError(event.error ?? event.message, {
        kind: "window.error",
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
      });
    globalThis.addEventListener("unhandledrejection", onUnhandledRejection);
    globalThis.addEventListener("error", onError);
    return () => {
      globalThis.removeEventListener("unhandledrejection", onUnhandledRejection);
      globalThis.removeEventListener("error", onError);
    };
  }, []);

  return (
    <ThemeProvider>
      <GoogleReCaptchaProvider
        reCaptchaKey={env.VITE_RECAPTCHA_SITE_KEY}
        scriptProps={{ async: true, defer: true, appendTo: "head" }}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${env.VITE_GTM_ID}`}
            height="0"
            width="0"
            title="GTM"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Sentry.ErrorBoundary fallback={<RootCrashFallback />}>
          <Outlet />
        </Sentry.ErrorBoundary>
        <GtmTracking />
        <Toaster position="top-right" />
      </GoogleReCaptchaProvider>
    </ThemeProvider>
  );
}

function RootCrashFallback() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-bg px-6 text-center">
      <div>
        <h1 className="font-heading text-4xl">Something went quiet.</h1>
        <p className="mt-4 font-body text-brand-text/65 text-sm">Please refresh and try again.</p>
        <button
          type="button"
          onClick={() => globalThis.location?.reload()}
          className="mt-7 border border-brand-text px-5 py-3 font-body text-[10px] uppercase tracking-[0.2em]"
        >
          Reload
        </button>
      </div>
    </main>
  );
}
