import type { Hotness } from "./enum";

export type HotnessRule = { hotness: Hotness; maxDistance: number };
export type HotnessRules = EnforceHotnessPresent<HotnessRule[]>;
export type GuessDistanceColor = "green" | "yellow" | "red";
export type GameRule = RequireAtLeastOne<
  {
    yearStarting?: number;
    yearEnding?: number;
    scale: HotnessRules;
  },
  "yearStarting" | "yearEnding"
>;
type ContainsAllEnumValues<T extends typeof Hotness, U> = U extends infer V
  ? V extends T
    ? true
    : never
  : never;
type RequireAtLeastOne<T, Keys extends keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  (Pick<T, Keys> extends Record<Keys, undefined> ? never : Pick<T, Keys>);
type EnforceHotnessPresent<T extends HotnessRule[]> =
  ContainsAllEnumValues<typeof Hotness, T[number]["hotness"]> extends true
    ? T
    : never;
