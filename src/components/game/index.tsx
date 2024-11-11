"use client";
import { Invention } from "@prisma/client";
import { createRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Era } from "./enum";
import { EraSelect } from "./era-select";
import { Guesses } from "./guesses";
import { getGuessDistance, getRulesByYear, guessIsCorrect } from "./logic";
import { ShareScore } from "./share-score";
import { formatYear } from "./utils";
import { WikiSummary } from "./wiki-summary";

export function Game({ invention }: { invention: Invention }) {
  const isYearRange = invention.start_year !== invention.end_year;
  const [era, setEra] = useState<Era>(Era.CE);
  const [guesses, setGuesses] = useState<number[]>([]);
  const rules = getRulesByYear(invention.start_year);
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
    <div className="flex flex-col gap-6">
      {gameWon && (
        <div className="text-xl font-bold lg:text-3xl">
          You won! The year was{" "}
          <span className="text-primary underline underline-offset-8">
            {formatYear(invention.start_year, true)}
          </span>
        </div>
      )}
      {gameLost && (
        <div className="text-xl font-bold lg:text-3xl">
          You lost! The year was{" "}
          <span className="text-primary underline underline-offset-8">
            {formatYear(invention.start_year, true)}
          </span>
        </div>
      )}
      {gameOver ? (
        <div className="flex flex-col gap-3">
          <ShareScore
            guessDistances={guesses.map((g) => getGuessDistance(g, invention))}
            rules={rules}
          />
          <article>
            <strong>
              {isYearRange ? "From" : "In"} {formatYear(invention.start_year)}
              {isYearRange ? `to ${formatYear(invention.end_year!)}` : ""}
              {": "}
            </strong>
            {invention.description}
          </article>

          <WikiSummary invention={invention} />
        </div>
      ) : null}
      <Guesses
        totalAllowedGuesses={5}
        invention={invention}
        guesses={guesses}
        showBlanks={!gameOver}
      />
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
                className="text-foreground placeholder:text-text rounded-r-none"
                name="guess"
                type="number"
                disabled={gameOver}
                placeholder={
                  !gameOver ? `Guess (${guesses.length + 1} / 5)` : undefined
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
