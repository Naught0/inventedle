import { ResultCreateWithoutUserInput } from "@/db/prisma/generated/models";
import { useCallback, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { useMutation } from "@tanstack/react-query";

export type LocalGame = Omit<
  ResultCreateWithoutUserInput,
  "user_id" | "created_at" | "num_guesses" | "guesses" | "user"
> & { guesses: number[] };

const localStorageKeyBase = "inventedle-game-result";

export function useGameRecorder({
  iotdId,
  inventionId,
  isLoggedIn,
}: {
  iotdId: number;
  inventionId: number;
  isLoggedIn: boolean;
}) {
  const localStorageKey = `${localStorageKeyBase}-${iotdId}`;
  const { mutate: mutateResult, isPending } = useMutation({
    mutationFn: async ({
      params,
    }: {
      params: {
        game: Parameters<typeof recordGameResult>[0];
        anonymous: Parameters<typeof recordGameResult>[1];
      };
    }) => await recordGameResult(params.game, params.anonymous),
  });
  const [game, setGame] = useImmer<LocalGame>({
    iotd_id: iotdId,
    invention_id: inventionId,
    guesses: [],
    win: false,
  });

  const syncLocalStorage = useCallback(
    () => localStorage.setItem(localStorageKey, JSON.stringify(game)),
    [localStorageKey, game],
  );

  async function recordGuess(guess: number) {
    setGame((game) => {
      game.guesses.push(guess);
    });
  }

  const submitResult = useCallback(() => {
    if (isPending) return;

    if (isLoggedIn) {
      mutateResult({
        params: {
          game: { ...game, num_guesses: game.guesses.length },
          anonymous: false,
        },
      });
    } else {
      syncLocalStorage();
      mutateResult({
        params: {
          game: { ...game, num_guesses: game.guesses.length },
          anonymous: true,
        },
      });
    }
  }, [isPending, isLoggedIn, mutateResult, syncLocalStorage]);

  const recordResult = useCallback(
    async function (gameWon: boolean) {
      setGame((game) => {
        game.win = gameWon;
      });
      submitResult();
    },
    [setGame, submitResult],
  );

  return { isLoggedIn, game, setGame, recordGuess, recordResult };
}

export async function recordGameResult(
  game: ResultCreateWithoutUserInput,
  anonymous = false,
) {
  return await (
    await fetch(
      anonymous
        ? "/api/game/record-anonymous-result"
        : "/api/game/record-result",
      {
        method: "PUT",
        body: JSON.stringify(game),
      },
    )
  ).json();
}

export function getCurrentGameFromLocalStorage(iotdId: number) {
  if (typeof window === "undefined") return null;
  const game = localStorage.getItem(`${localStorageKeyBase}-${iotdId}`);
  return game ? JSON.parse(game) : null;
}
