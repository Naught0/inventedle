"use client";
import {
  GameResultCreateInput,
  GameResultModel,
  InventionModel,
} from "@/db/prisma/generated/models";
import { createRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Era } from "./enum";
import { EraSelect } from "./era-select";
import { Guesses } from "./guesses";
import { getGuessDistance, getRulesByYear, guessIsCorrect } from "./logic";
import { ShareScore } from "./share-score";
import { formatYear } from "./utils";
import { Summary } from "./summary";
import { LocalRecorder } from "../game-recorder";

// TODO: Sync the game state to localstorage better
// Validate inputs so ppl can't cheat or end up in shitty states

export function Game({
  invention,
  iotdId,
  gameResult,
}: {
  invention: InventionModel;
  iotdId: number;
  gameResult?: GameResultModel | null;
}) {
  const [gameRecorder, setGameRecorder] = useState<LocalRecorder>();
  useEffect(
    function setRecorder() {
      setGameRecorder(new LocalRecorder(iotdId, invention.id));
    },
    [iotdId, invention],
  );

  if (gameResult && gameRecorder) {
    console.log("GOT GAME RESULT", gameResult);
    setGameRecorder((recorder) => {
      recorder ??= new LocalRecorder(iotdId, invention.id);
      recorder.game = {
        guesses: gameResult.guesses as number[],
        win: gameResult.win,
        invention_id: invention.id,
        iotd_id: iotdId,
      };
      recorder.syncStorage();

      return recorder;
    });
  }
  const mutate = async (game: GameResultCreateInput) =>
    await (
      await fetch("/api/game/record-result", {
        method: "POST",
        body: JSON.stringify(game),
      })
    ).json();
  const [era, setEra] = useState<Era>(Era.CE);
  const [guesses, setGuesses] = useState<number[]>(
    gameRecorder?.game?.guesses ?? (gameResult?.guesses as number[]) ?? [],
  );
  const [gameWon, setGameWon] = useState(
    gameRecorder?.game.win ?? gameResult?.win ?? false,
  );
  const [gameOver, setGameOver] = useState(
    (gameRecorder && gameRecorder.game.guesses.length >= 5) || gameWon,
  );
  const gameLost = !gameWon && gameOver;
  const rules = getRulesByYear(invention.year);
  const formRef = createRef<HTMLFormElement>();

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
          <ShareScore
            iotdId={iotdId}
            guessDistances={guesses.map((g) => getGuessDistance(g, invention))}
            rules={rules}
          />
          <Summary invention={invention} />
        </div>
      ) : null}
      <Guesses invention={invention} guesses={guesses} />
      {!gameOver && (
        <form
          ref={formRef}
          action={(data) => {
            if (!gameRecorder) return;

            const factor = era === Era.CE ? 1 : -1;
            const guess =
              parseInt((data.get("guess") as string) ?? "") * factor;

            if (!isNaN(guess)) {
              gameRecorder.recordGuess(guess);
              setGuesses(gameRecorder.game.guesses);
            }

            const gameWon = guessIsCorrect(
              getGuessDistance(
                gameRecorder.game.guesses.slice(-1)[0],
                invention,
              ),
              rules,
            );

            let gameOver = false;
            if (gameWon) {
              setGameWon(true);
              setGameOver(true);
              gameOver = true;
            } else {
              gameOver = gameRecorder.game.guesses.length >= 5;
              setGameOver(gameOver);
            }

            if (gameOver) {
              gameRecorder.record(gameWon);
              mutate({
                ...gameRecorder.game,
                win: gameWon,
                num_guesses: guesses.length,
              });
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
                disabled={gameOver}
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
    </div>
  );
}
