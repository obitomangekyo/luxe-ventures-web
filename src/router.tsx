import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import "@/lib/sentry";

// Create a new router instance
export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
  });

  return router;
}
