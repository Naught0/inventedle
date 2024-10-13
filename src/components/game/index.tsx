"use client";
import { InventionSelect } from "@/db/schema";
import { useSetAtom } from "jotai";
import { createRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { inventionAtom } from "./atom";
import { EraSelect } from "./era-select";
import { Guesses } from "./guesses";
import { getGuessDistance, guessIsCorrect } from "./logic";
import { Era } from "./types";

export function Game({
  invention: inventionData,
}: {
  invention: InventionSelect;
}) {
  const setInvention = useSetAtom(inventionAtom);
  useEffect(() => {
    setInvention(inventionData);
  }, [inventionData, setInvention]);
  const [era, setEra] = useState<Era>(Era.CE);
  const [guesses, setGuesses] = useState<number[]>([]);
  const gameWon = guesses.some((g) =>
    guessIsCorrect(getGuessDistance(g, inventionData)),
  );
  const formRef = createRef<HTMLFormElement>();

  return (
    <div className="flex w-full flex-col gap-6">
      {gameWon && (
        <div className="text-3xl font-bold">
          You won! The year was{" "}
          <span className="text-cyan-200">{inventionData.year}</span>
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
          <div className="flex flex-row items-center gap-0">
            <Input
              className="rounded-r-none"
              min={0}
              max={new Date().getFullYear()}
              name="guess"
              type="number"
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
