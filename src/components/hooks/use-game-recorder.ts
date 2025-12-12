import { ResultCreateWithoutUserInput } from "@/db/prisma/generated/models";
import { useCallback, useEffect, useState } from "react";
import { useImmer } from "use-immer";

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
  const [game, setGame] = useImmer<LocalGame>({
    iotd_id: iotdId,
    invention_id: inventionId,
    guesses: [],
    win: false,
  });
  const [syncEnabled, setSyncEnabled] = useState(false);

  const syncLocalStorage = useCallback(
    () => localStorage.setItem(localStorageKey, JSON.stringify(game)),
    [localStorageKey, game],
  );

  async function recordGuess(guess: number) {
    setGame((game) => {
      game.guesses.push(guess);
    });
    setSyncEnabled(true);
  }
  useEffect(
    function syncGameResults() {
      if (!syncEnabled) return;
      (async () => {
        if (isLoggedIn) {
          await recordGameResult({ ...game, num_guesses: game.guesses.length });
        } else {
          syncLocalStorage();
          await recordGameResult(
            { ...game, num_guesses: game.guesses.length },
            true,
          );
        }
      })();
    },
    [isLoggedIn, game, syncEnabled, syncLocalStorage],
  );

  async function recordResult(gameWon: boolean) {
    setGame((game) => {
      game.win = gameWon;
    });
    setSyncEnabled(true);
  }

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
