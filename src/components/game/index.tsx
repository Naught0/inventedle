"use client";
import { InventionModel } from "@/db/prisma/generated/models";
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

export function Game({ invention }: { invention: InventionModel }) {
  const [era, setEra] = useState<Era>(Era.CE);
  const [guesses, setGuesses] = useState<number[]>([]);
  const rules = getRulesByYear(invention.year);
  const gameWon = guessIsCorrect(
    getGuessDistance(guesses.slice(-1)[0], invention),
    rules,
  );
  const [gameLost, setGameLost] = useState(false);
  const gameOver = gameWon || gameLost;
  const formRef = createRef<HTMLFormElement>();

  useEffect(
    function handleLoss() {
      if (gameWon) return;
      if (guesses.length < 5) return;

      setGameLost(true);
    },
    [guesses, gameWon],
  );

  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      {gameWon && (
        <div className="text-lg font-bold lg:text-2xl">
          You won! The year was{" "}
          <span className="text-primary underline underline-offset-8">
            {formatYear(invention.year, true)}
          </span>
        </div>
      )}
      {gameLost && (
        <div className="text-lg font-bold lg:text-2xl">
          You lost! The year was{" "}
          <span className="text-primary underline underline-offset-8">
            {formatYear(invention.year, true)}
          </span>
        </div>
      )}
      {gameOver ? (
        <div className="flex flex-col gap-3">
          <ShareScore
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
            const factor = era === Era.CE ? 1 : -1;
            const guess =
              parseInt((data.get("guess") as string) ?? "") * factor;
            if (!isNaN(guess)) {
              setGuesses([...guesses, guess]);
            }

            formRef.current?.reset();
          }}
        >
          <div className="flex flex-grow flex-col gap-3">
            <div className="flex flex-row items-center gap-0">
              <Input
                className="text-foreground placeholder:text-text bg-background rounded-r-none"
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
