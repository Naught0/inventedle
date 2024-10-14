"use client";
import { createRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { EraSelect } from "./era-select";
import { Guesses } from "./guesses";
import { getGuessDistance, guessIsCorrect } from "./logic";
import { Era } from "./types";
import { Invention } from "@prisma/client";

export function formatYear(year: number) {
  return Math.abs(year).toString() + (year < 0 ? " BCE" : "");
}

export function Game({ invention }: { invention: Invention }) {
  const [era, setEra] = useState<Era>(Era.CE);
  const [guesses, setGuesses] = useState<number[]>([]);
  const gameWon = guessIsCorrect(
    getGuessDistance(guesses.slice(-1)[0], invention),
  );
  const [gameLost, setGameLost] = useState(false);
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
    <div className="flex w-full flex-col gap-6">
      {gameWon && (
        <div className="text-3xl font-bold">
          You won! The year was{" "}
          <span className="text-primary">
            {formatYear(invention.start_year)}
          </span>
        </div>
      )}
      {gameLost && (
        <div className="text-3xl font-bold">
          You lost! The year was{" "}
          <span className="text-primary">
            {formatYear(invention.start_year)}
          </span>
        </div>
      )}
      <Guesses
        totalAllowedGuesses={5}
        invention={invention}
        guesses={guesses}
      />
      <form
        ref={formRef}
        action={(data) => {
          const factor = era === Era.CE ? 1 : -1;
          const guess = parseInt((data.get("guess") as string) ?? "") * factor;
          if (!isNaN(guess)) {
            setGuesses([...guesses, guess]);
          }

          formRef.current?.reset();
        }}
      >
        <div className="flex flex-col gap-3">
          <Label>Guess the year of this invention</Label>
          <div className="flex flex-row items-center gap-0">
            <Input
              className="rounded-r-none"
              name="guess"
              type="number"
              disabled={gameWon || gameLost}
              placeholder={
                !(gameWon || gameLost)
                  ? `Guess (${guesses.length + 1} / 5)`
                  : undefined
              }
              autoFocus
            />
            <EraSelect value={era} onChange={setEra} />
          </div>
          <div>
            <Button type="submit">Guess</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
