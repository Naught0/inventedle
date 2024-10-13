import { InventionSelect } from "@/db/schema";
import type { GuessDistanceColor } from "./types";

export const CORRECT_IF_WITHIN_YEARS = 10;
export const CLOSE_IF_WITHIN_YEARS = 100;

export function getGuessDistance(guess: number, invention: InventionSelect) {
  return guess - invention.year;
}

export function guessIsCorrect(distance: number) {
  return Math.abs(distance) <= CORRECT_IF_WITHIN_YEARS;
}

export function getGuessDistanceColor(
  distance: number,
  opts?: { guessDistance?: { green?: number; yellow?: number } },
): GuessDistanceColor {
  const abs = Math.abs(distance);
  if (abs <= (opts?.guessDistance?.green ?? CORRECT_IF_WITHIN_YEARS)) {
    return "green";
  } else if (abs <= (opts?.guessDistance?.yellow ?? CLOSE_IF_WITHIN_YEARS)) {
    return "yellow";
  } else {
    return "red";
  }
}
