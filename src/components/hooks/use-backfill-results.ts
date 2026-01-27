import { useMutation, useQuery } from "@tanstack/react-query";
import { LocalGame, localStorageKeyBase } from "./use-game-recorder";
import { useMemo } from "react";

export function useMissingIotds({ userId }: { userId?: string }) {
  return useQuery({
    queryKey: ["iotdsMissingResults", userId],
    queryFn: async () => {
      const resp = (await (
        await fetch(`/api/user/iotds-without-results`, {
          method: "GET",
        })
      ).json()) as { id: number }[];
      return resp;
    },
    select: (data) => {
      return data.map((r) => r.id);
    },
    enabled: !!userId,
  });
}

export function useMissingResultsToImport({ userId }: { userId?: string }) {
  const {
    data: missingIotds,
    refetch: refetchMissingIotds,
    isLoading,
    isError,
    error,
  } = useMissingIotds({
    userId,
  });

  const localResultsToImport = useMemo(() => {
    if (!missingIotds || !missingIotds.length) return [];

    const localResults: LocalGame[] = [];
    for (const id of missingIotds) {
      const localResult = localStorage.getItem(`${localStorageKeyBase}-${id}`);
      if (localResult) {
        localResults.push(JSON.parse(localResult) as LocalGame);
      }
    }
    return localResults;
  }, [missingIotds]);

  return {
    data: localResultsToImport,
    refetch: refetchMissingIotds,
    isLoading,
    isError,
    error,
  };
}

export function useBackfillResults({ userId }: { userId?: string }) {
  const { data: localGamesToImport, refetch } = useMissingResultsToImport({
    userId,
  });
  const { mutateAsync, isPending, error, data, isSuccess, isError } =
    useMutation({
      mutationKey: ["backfill-results", userId],
      mutationFn: async (result: LocalGame[]) => {
        const resp = await fetch("/api/game/record-results", {
          method: "POST",
          body: JSON.stringify(result),
        });
        if (!resp.ok) {
          return Promise.reject(await resp.json());
        } else {
          return (await resp.json()) as { data: number[] };
        }
      },
      onSuccess() {
        refetch();
      },
    });
  const backfill = async () => {
    return await mutateAsync(localGamesToImport);
  };

  return {
    backfill,
    localGamesToImport,
    data: data?.data,
    error,
    isPending,
    isSuccess,
    isError,
  };
}
