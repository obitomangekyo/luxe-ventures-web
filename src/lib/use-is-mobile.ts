import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;
const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

const subscribe = (callback: () => void) => {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => false; // Default for Server-Side Rendering

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
