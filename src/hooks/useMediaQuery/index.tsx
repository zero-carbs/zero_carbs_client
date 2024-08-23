// Modified from https://usehooks.com/usemediaquery

import { useSyncExternalStore, useCallback } from "react";

type MediaQueryType = "mobile" | "desktop";
type MatchMediaType = Record<MediaQueryType, string>;

export function useMediaQuery(type: MediaQueryType, query?: string) {
  const types: MatchMediaType = {
    mobile: "only screen and (max-width : 768px)",
    desktop: "only screen and (max-width : 1200px)",
  };

  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(types[type]);

      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [type],
  );

  const getSnapshot = useCallback(() => {
    return window.matchMedia(types[type] || query!).matches;
  }, [type, query]);

  const getServerSnapshot = () => {
    throw Error("useMediaQuery is a client-only hook");
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
