"use client";
import { useEffect } from "react";

function useRefeshAfter({ afterSeconds }: { afterSeconds: number }) {
  useEffect(
    function refreshAfter() {
      const refresh = () => {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      };
      const timeout = setTimeout(refresh, afterSeconds * 1000);
      return () => clearTimeout(timeout);
    },
    [afterSeconds],
  );
}
export function RefreshAfter({ afterSeconds }: { afterSeconds: number }) {
  useRefeshAfter({ afterSeconds });
  return null;
}
