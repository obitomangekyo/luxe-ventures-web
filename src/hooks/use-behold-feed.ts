import { useQuery } from "@tanstack/react-query";
import { fetchBeholdPosts } from "@/lib/behold";

export function useBeholdFeed(enabled: boolean) {
  return useQuery({
    queryKey: ["behold-feed"],
    queryFn: fetchBeholdPosts,
    enabled,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
