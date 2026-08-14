import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

export function GtmTracking() {
  const location = useLocation();

  useEffect(() => {
    // Check if dataLayer exists (it might not on server render)
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "page_view",
        page_path: location.hash,
      });
    }
  }, [location.hash]);

  return null;
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
