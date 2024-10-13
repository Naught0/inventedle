"use client";
import { InventionSelect } from "@/db/schema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Guesses } from "./guesses";
import { createRef, useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { inventionAtom } from "./atom";
import { Button } from "../ui/button";
import { getGuessDistance, guessIsCorrect } from "./logic";

export function Game({
  invention: inventionData,
}: {
  invention: InventionSelect;
}) {
  const setInvention = useSetAtom(inventionAtom);
  useEffect(() => {
    setInvention(inventionData);
  }, [inventionData, setInvention]);
  const [guesses, setGuesses] = useState<number[]>([]);
  const gameWon = guesses.some((g) =>
    guessIsCorrect(getGuessDistance(g, inventionData)),
  );
  const formRef = createRef<HTMLFormElement>();

  return (
    <div className="flex w-full flex-col gap-6">
      {gameWon && (
        <div className="text-3xl font-bold">
          You won! The year was {inventionData.year}
        </div>
      )}
      <Guesses invention={inventionData} guesses={guesses} />
      <form
        ref={formRef}
        action={(data) => {
          const guess = parseInt((data.get("guess") as string) ?? "");
          if (!isNaN(guess)) {
            setGuesses([...guesses, guess]);
          }

          formRef.current?.reset();
        }}
      >
        <div className="flex flex-col gap-3">
          <Label>Guess the year of this invention</Label>
          <Input
            min={0}
            max={new Date().getFullYear()}
            name="guess"
            type="number"
          />
          <div>
            <Button type="submit">Guess</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
