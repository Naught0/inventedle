"use client";
import { InventionModel } from "@/db/prisma/generated/models";
import { createRef, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Era } from "./enum";
import { EraSelect } from "./era-select";
import { Guesses } from "./guesses";
import { getGuessDistance, getRulesByYear, guessIsCorrect } from "./logic";
import { ShareScore } from "./share-score";
import { formatYear } from "./utils";
import { Summary } from "./summary";
import {
  getCurrentGameFromLocalStorage,
  LocalGame,
  useGameRecorder,
} from "../hooks/use-game-recorder";
import { useSession } from "@/lib/auth-client";
import { GuessStatsChart } from "../charts/guess-stats-chart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function getInitialGame({
  isLoggedIn,
  ...game
}: LocalGame & { isLoggedIn: boolean }): LocalGame {
  if (isLoggedIn) return game;

  const localGame = getCurrentGameFromLocalStorage(game.iotd_id);
  if (localGame) return localGame;
  return {
    iotd_id: game.iotd_id,
    invention_id: game.invention_id,
    win: false,
    guesses: [],
  };
}

export function Game(params: Parameters<typeof Wrapped>[0]) {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapped {...params} />
    </QueryClientProvider>
  );
}

function Wrapped({
  invention,
  iotdId,
  gameResult,
}: {
  invention: InventionModel;
  iotdId: number;
  gameResult?: LocalGame | null;
}) {
  const { data, isPending } = useSession();
  const isLoggedIn = !!data;
  const [era, setEra] = useState<Era>(Era.CE);
  const rules = getRulesByYear(invention.year);
  const formRef = createRef<HTMLFormElement>();
  const initGame: LocalGame = useMemo(() => {
    return getInitialGame({
      iotd_id: iotdId,
      invention_id: invention.id,
      win: !!gameResult?.win,
      guesses: (gameResult?.guesses ?? []) as number[],
      isLoggedIn,
    });
  }, [gameResult, iotdId, invention.id, isLoggedIn]);
  const { game, setGame, recordGuess, recordResult } = useGameRecorder({
    isLoggedIn,
    iotdId,
    inventionId: invention.id,
  });
  useEffect(
    function setInitGame() {
      if (isPending) return;

      setGame(initGame);
    },
    [isPending, data],
  );

  const gameWon = game.win;
  const gameLost = !game.win && game.guesses.length >= 5;
  const gameOver = gameWon || gameLost;
  const guesses = game.guesses;
  useEffect(
    function syncResult() {
      if (gameWon || gameLost) {
        recordResult(gameWon);
      }
    },
    [gameWon, gameLost],
  );

  return (
    <div className="flex flex-col gap-3">
      {gameWon && (
        <div className="text-2xl font-bold">
          You won! The year was{" "}
          <span className="text-primary underline underline-offset-8">
            {formatYear(invention.year, true)}
          </span>
        </div>
      )}
      {gameLost && (
        <div className="text-2xl font-bold">
          You lost! The year was{" "}
          <span className="text-primary underline underline-offset-8">
            {formatYear(invention.year, true)}
          </span>
        </div>
      )}
      {gameOver ? (
        <div className="flex flex-col gap-6">
          {guesses && (
            <ShareScore
              iotdId={iotdId}
              guessDistances={guesses.map((g) =>
                getGuessDistance(g, invention),
              )}
              rules={rules}
            />
          )}
          <Summary invention={invention} />
        </div>
      ) : null}
      <Guesses invention={invention} guesses={guesses} />
      {!gameOver && (
        <form
          ref={formRef}
          action={(data) => {
            const factor = era === Era.CE ? 1 : -1;
            const guess =
              parseInt((data.get("guess") as string) ?? "") * factor;

            if (!isNaN(guess)) {
              recordGuess(guess);
            }

            const gameWon = guessIsCorrect(
              getGuessDistance(guess, invention),
              rules,
            );

            if (gameWon) {
              recordResult(gameWon);
            } else {
              recordResult(gameWon);
            }

            formRef.current?.reset();
          }}
        >
          <div className="flex flex-grow flex-col gap-3">
            <div className="flex flex-row items-center gap-0">
              <Input
                className="text-foreground placeholder:text-muted-foreground bg-background rounded-r-none"
                name="guess"
                type="number"
                inputMode="numeric"
                max={era === Era.CE ? new Date().getFullYear() + 1 : undefined}
                disabled={isPending || gameOver}
                placeholder={
                  !gameOver
                    ? `Guess a year | (Guess ${guesses.length + 1} / 5)`
                    : undefined
                }
                autoFocus
              />
              <EraSelect value={era} onChange={setEra} disabled={gameOver} />
            </div>
            <div>
              <Button size="xl" type="submit" disabled={gameOver}>
                Guess
              </Button>
            </div>
          </div>
        </form>
      )}
      <GuessStatsChart numGuesses={[4, 5, 10, 3, 3, 8]} />
    </div>
  );
}
