import { Invention } from "@prisma/client";
import type { HotnessRules } from "./types";
import { Hotness } from "./enum";
import { defaultRules } from "./rules";

export const CORRECT_IF_WITHIN_YEARS = 10;
export const CLOSE_IF_WITHIN_YEARS = 100;

const COLD = Hotness.COLD;

export function getRulesByYear(year: number) {
  const r = defaultRules.find(
    (rule) =>
      (rule?.yearStarting ?? NaN) <= year || year <= (rule?.yearEnding ?? NaN),
  );
  if (!r) {
    throw new Error(`No rules found for year ${year}`);
  }

  return r.scale;
}

export function getGuessDistance(guess: number, invention: Invention) {
  return guess - invention.start_year;
}

export function getHotness(distance: number, rules: HotnessRules) {
  const abs = Math.abs(distance);
  return (
    rules
      .sort((a, b) => a.maxDistance - b.maxDistance)
      .find((r) => abs <= r.maxDistance)?.hotness ?? COLD
  );
}

export function guessIsCorrect(distance: number, rules: HotnessRules) {
  return (
    Math.abs(distance) <=
    rules.sort((a, b) => a.maxDistance - b.maxDistance)[0].maxDistance
  );
}
