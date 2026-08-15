import { Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import Loader2 from "@/assets/svgs/loader-2.svg?react";
import OctagonX from "@/assets/svgs/octagon-x.svg?react";
import { Button } from "@/components/ui/button";
import { normalizeError, reportError } from "@/lib/error-reporting";

export function RootPending() {
  return (
    <div className="grid min-h-screen place-items-center bg-brand-bg px-6 text-center">
      <div>
        <Loader2 className="mx-auto mb-5 size-12 animate-spin text-brand-detail" />
        <p className="font-heading text-2xl">Preparing something beautiful…</p>
      </div>
    </div>
  );
}

export function RootError({ error }: { error: unknown }) {
  const normalized = useMemo(() => normalizeError(error), [error]);
  useEffect(() => {
    reportError(normalized, { kind: "root.error-boundary" });
  }, [normalized]);
  return (
    <div className="grid min-h-screen place-items-center bg-brand-bg px-6">
      <div className="max-w-lg text-center">
        <OctagonX className="mx-auto mb-6 size-14 text-brand-detail" />
        <h1 className="font-heading text-4xl">Something went quiet.</h1>
        <p className="mt-4 font-body text-brand-text/65 text-sm leading-7">
          This is on us. Please refresh the page, or return home while we restore the experience.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button
            type="button"
            onClick={() => globalThis.location?.reload()}
            className="h-11 rounded-none bg-brand-text px-5 font-body text-[10px] text-brand-bg uppercase tracking-[0.2em] hover:bg-brand-detail hover:text-brand-text"
          >
            Reload
          </Button>
          <Button
            nativeButton={false}
            render={<Link to="/" />}
            variant="outline"
            className="h-11 rounded-none border-brand-text bg-transparent px-5 font-body text-[10px] uppercase tracking-[0.2em]"
          >
            Go home
          </Button>
        </div>
        {import.meta.env.DEV && (
          <pre className="mt-8 overflow-auto border border-brand-detail/50 bg-white/40 p-4 text-left font-mono text-xs">
            {normalized.stack ?? normalized.message}
          </pre>
        )}
      </div>
    </div>
  );
}

export function RootNotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-brand-bg px-6 text-center">
      <div>
        <OctagonX className="mx-auto mb-6 size-14 text-brand-detail" />
        <h1 className="font-heading text-4xl">That page has drifted away.</h1>
        <p className="mt-4 font-body text-brand-text/65 text-sm">
          The page you&apos;re looking for does not exist.
        </p>
        <Button
          nativeButton={false}
          render={<Link to="/" />}
          className="mt-8 h-11 rounded-none bg-brand-text px-5 font-body text-[10px] text-brand-bg uppercase tracking-[0.2em] hover:bg-brand-detail hover:text-brand-text"
        >
          Return home
        </Button>
      </div>
    </div>
  );
}
