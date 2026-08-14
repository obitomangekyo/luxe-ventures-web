import * as Sentry from "@sentry/react";
import { env } from "@/env";

if (env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: env.VITE_SENTRY_DSN,
    environment: env.VITE_SENTRY_ENVIRONMENT,
    sendDefaultPii: false,
    tracesSampleRate: 0.05,
  });
}

export { Sentry };
