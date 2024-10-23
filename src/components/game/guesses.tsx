import { Invention } from "@prisma/client";
import { ReactNode } from "react";
import {
  PiArrowFatDownFill,
  PiArrowFatUpFill,
  PiCheckFatFill,
} from "react-icons/pi";
import { formatYear } from ".";
import {
  getGuessDistance,
  getHotness,
  getRulesByYear,
  guessIsCorrect,
} from "./logic";
import { HotnessRules } from "./types";
import { Hotness } from "./enum";

export function GuessPlaceholder() {
  return (
    <li className="bg-secondary flex items-center gap-2 rounded-md px-3 py-1 text-base font-bold lg:py-2 lg:text-xl">
      <span className="invisible">Text</span>
    </li>
  );
}

export function Guess(props: {
  guess: ReactNode;
  guessDistance: number;
  rules: HotnessRules;
}) {
  const getBgClassName = () => {
    const color = getHotness(props.guessDistance, props.rules);
    switch (color) {
      case Hotness.CORRECT:
        return "bg-emerald-600";
      case Hotness.HOT:
        return "bg-yellow-600";
      case Hotness.WARM:
        return "bg-orange-600";
      case Hotness.COLD:
        return "bg-destructive";
    }
  };
  const getIcon = () => {
    if (guessIsCorrect(props.guessDistance, props.rules)) {
      return <PiCheckFatFill />;
    } else if (props.guessDistance > 0) {
      return <PiArrowFatDownFill />;
    } else {
      return <PiArrowFatUpFill />;
    }
  };
  return (
    <li
      className={`flex items-center gap-2 rounded-md px-3 py-1 text-base font-bold lg:py-2 lg:text-xl ${getBgClassName()}`}
    >
      <span className="text-base lg:text-2xl">{getIcon()}</span>
      {props.guess}
    </li>
  );
}
export function Guesses({
  totalAllowedGuesses,
  ...props
}: {
  invention: Invention;
  guesses: number[];
  totalAllowedGuesses: number;
}) {
  return (
    <ul className="flex flex-col gap-2">
      <div className="hidden lg:contents">
        {props.guesses.length < totalAllowedGuesses &&
          [...Array(totalAllowedGuesses - props.guesses.length).keys()].map(
            (idx) => <GuessPlaceholder key={idx} />,
          )}
      </div>
      {props.guesses.map((guess, idx) => (
        <Guess
          rules={getRulesByYear(props.invention.start_year)}
          key={`${idx}${guess}`}
          guessDistance={getGuessDistance(guess, props.invention)}
          guess={formatYear(guess)}
        />
      ))}
    </ul>
  );
}
