"use client";
import { InventionSelect } from "@/db/schema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Guesses } from "./guesses";
import { createRef, useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { inventionAtom } from "./atom";

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
  const formRef = createRef<HTMLFormElement>();

  return (
    <div className="flex flex-col gap-6">
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(inventionData, null, 2)}
      </pre>

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
          <Label>Guess the year</Label>
          <Input name="guess" type="number" />
        </div>
      </form>
    </div>
  );
}
