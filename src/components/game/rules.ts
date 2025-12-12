import { Hotness } from "./enum";
import { GameRule } from "./types";

const CORRECT = Hotness.CORRECT;
const HOT = Hotness.HOT;
const WARM = Hotness.WARM;

export const defaultRules: GameRule[] = [
  {
    yearStarting: 2000,
    scale: [
      { maxDistance: 0, hotness: CORRECT },
      { maxDistance: 3, hotness: HOT },
      { maxDistance: 5, hotness: WARM },
    ],
  },
  {
    yearStarting: 1900,
    scale: [
      { maxDistance: 1, hotness: CORRECT },
      { maxDistance: 10, hotness: HOT },
      { maxDistance: 15, hotness: WARM },
    ],
  },
  {
    yearStarting: 1800,
    scale: [
      { maxDistance: 2, hotness: CORRECT },
      { maxDistance: 12, hotness: HOT },
      { maxDistance: 20, hotness: WARM },
    ],
  },
  {
    yearStarting: 1500,
    scale: [
      { maxDistance: 10, hotness: CORRECT },
      { maxDistance: 15, hotness: HOT },
      { maxDistance: 30, hotness: WARM },
    ],
  },
  {
    yearStarting: 0,
    scale: [
      { maxDistance: 50, hotness: CORRECT },
      { maxDistance: 100, hotness: HOT },
      { maxDistance: 200, hotness: WARM },
    ],
  },
  {
    yearEnding: -1,
    scale: [
      { maxDistance: 100, hotness: CORRECT },
      { maxDistance: 200, hotness: HOT },
      { maxDistance: 300, hotness: WARM },
    ],
  },
];
