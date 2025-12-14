import { ResultCreateWithoutUserInput } from "@/db/prisma/generated/models";

export type LocalGame = Omit<
  ResultCreateWithoutUserInput,
  "user_id" | "created_at" | "num_guesses" | "guesses" | "user"
> & { guesses: number[] };

const localStorageKeyBase = "inventedle-game-result";

export function recordGameToLocalStorage(game: LocalGame) {
  localStorage.setItem(
    `${localStorageKeyBase}-${game.iotd_id}`,
    JSON.stringify(game),
  );
}

export async function recordGame(
  game: LocalGame,
  anonymous = false,
): Promise<void> {
  await fetch(
    anonymous ? "/api/game/record-anonymous-result" : "/api/game/record-result",
    {
      method: "PUT",
      body: JSON.stringify(game),
    },
  );
}

export function getCurrentGameFromLocalStorage(iotdId: number) {
  if (typeof window === "undefined") return null;
  const game = localStorage.getItem(`${localStorageKeyBase}-${iotdId}`);
  return game ? (JSON.parse(game) as LocalGame) : null;
}
