import { InventionModel } from "@/db/prisma/generated/models";
import { ReactNode } from "react";
import {
  PiArrowFatDownFill,
  PiArrowFatUpFill,
  PiCheckFatFill,
} from "react-icons/pi";
import {
  getGuessDistance,
  getHotness,
  getRulesByYear,
  guessIsCorrect,
} from "./logic";
import { HotnessRules } from "./types";
import { Hotness } from "./enum";
import { formatYear } from "./utils";

export function GuessPlaceholder() {
  return (
    <li className="bg-secondary flex items-center gap-2 px-3 py-1 text-base font-bold lg:py-2 lg:text-xl">
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
        return "bg-closeYellow";
      case Hotness.WARM:
        return "bg-orange-500";
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
      className={`flex items-center gap-2 px-3 py-1 text-base font-bold lg:py-2 lg:text-xl ${getBgClassName()}`}
    >
      <span className="text-base lg:text-2xl">{getIcon()}</span>
      {props.guess}
    </li>
  );
}
export function Guesses({
  totalAllowedGuesses,
  showBlanks,
  ...props
}: {
  invention: InventionModel;
  guesses: number[];
  showBlanks?: boolean;
  totalAllowedGuesses: number;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {props.guesses.toReversed().map((guess, idx) => (
        <Guess
          key={`${idx}${guess}`}
          guess={formatYear(guess)}
          rules={getRulesByYear(props.invention.year)}
          guessDistance={getGuessDistance(guess, props.invention)}
        />
      ))}
      {showBlanks && (
        <div className="hidden lg:contents">
          {props.guesses.length < totalAllowedGuesses &&
            [...Array(totalAllowedGuesses - props.guesses.length).keys()].map(
              (idx) => <GuessPlaceholder key={idx} />,
            )}
        </div>
      )}
    </ul>
  );
}
