"use client";
import { useMissingResultsToImport } from "@/components/hooks/use-backfill-results";
import { useDefaultSession } from "@/components/hooks/useDefaultSession";
import { LocalGamesBanner } from "@/components/import-local-games-banner";

export function ImportSection() {
  const { session } = useDefaultSession();
  const { data } = useMissingResultsToImport({ userId: session?.user?.id });

  return <LocalGamesBanner games={data} />;
}
