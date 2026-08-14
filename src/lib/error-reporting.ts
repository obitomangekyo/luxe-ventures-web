import { Sentry } from "@/lib/sentry";

type ErrorMeta = Record<string, unknown>;

function serializeError(error: unknown) {
  return error instanceof Error
    ? { message: error.message, stack: error.stack }
    : { message: String(error) };
}

export function reportError(error: unknown, meta?: ErrorMeta) {
  const payload = {
    ...serializeError(error),
    meta,
    href: globalThis.location?.href,
    timestamp: new Date().toISOString(),
  };
  if (import.meta.env.DEV) {
    console.error("[AppError]", payload);
  }
  Sentry.captureException(error, { extra: meta });
}

export function normalizeError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === "string") return new Error(error);
  try {
    return new Error(JSON.stringify(error));
  } catch {
    return new Error("Unknown application error");
  }
}
