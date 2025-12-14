import { InventionModel } from "@/db/prisma/generated/models";
import { ReactNode } from "react";
import {
  PiArrowFatDownFill,
  PiArrowFatUpFill,
  PiCheckFatFill,
} from "react-icons/pi";
import { IoMdArrowUp, IoMdArrowDown } from "react-icons/io";
import {
  getGuessDistance,
  getHotness,
  getRulesByYear,
  guessIsCorrect,
} from "./logic";
import { HotnessRules } from "./types";
import { Hotness } from "./enum";
import { formatYear } from "./utils";

export function Guess(props: {
  guess: ReactNode;
  guessDistance: number;
  rules: HotnessRules;
}) {
  const getBgClassName = () => {
    const color = getHotness(props.guessDistance, props.rules);
    switch (color) {
      case Hotness.CORRECT:
        return "bg-status-success text-status-success-foreground";
      case Hotness.HOT:
        return "bg-status-warning text-status-warning-foreground";
      case Hotness.WARM:
        return "bg-status-orange text-status-orange-foreground";
      case Hotness.COLD:
        return "bg-status-error text-status-error-foreground";
    }
  };
  const getIcon = () => {
    if (guessIsCorrect(props.guessDistance, props.rules)) {
      return <PiCheckFatFill />;
    }
    const hotnessFactor: Map<Hotness, number> = new Map([
      [Hotness.HOT, 1],
      [Hotness.WARM, 2],
      [Hotness.COLD, 3],
    ]);
    const hotness = getHotness(props.guessDistance, props.rules);
    const factor = hotnessFactor.get(hotness);
    if (!factor) {
      console.error("Unknown hotness factor", hotness);
    }
    const arrows = Array.from({ length: factor! }).map((_, idx) =>
      props.guessDistance > 0 ? (
        <IoMdArrowDown
          key={`${idx}-${hotness}`}
          className="-ml-1"
          strokeWidth={20}
        />
      ) : (
        <IoMdArrowUp
          key={`${idx}-${hotness}`}
          className="-ml-1"
          strokeWidth={20}
        />
      ),
    );

    return <div className="flex">{arrows}</div>;
  };

  return (
    <li
      className={`flex items-center gap-2 rounded px-6 py-3 text-xl font-bold lg:py-2 lg:text-2xl ${getBgClassName()}`}
    >
      {props.guess}
      <span className="text-xl lg:text-3xl">{getIcon()}</span>
    </li>
  );
}
export function Guesses({
  ...props
}: {
  invention: InventionModel;
  guesses: number[];
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
    </ul>
  );
}
