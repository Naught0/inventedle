import {
  PiArrowFatUpFill,
  PiArrowFatDownFill,
  PiCheckFatFill,
} from "react-icons/pi";
import {
  getGuessDistance,
  getGuessDistanceColor,
  guessIsCorrect,
} from "./logic";
import { InventionSelect } from "@/db/schema";

export function Guess(props: { guess: number; guessDistance: number }) {
  const getBgClassName = () => {
    const color = getGuessDistanceColor(props.guessDistance);
    switch (color) {
      case "green":
        return "bg-green-600";
      case "yellow":
        return "bg-yellow-600";
      case "red":
        return "bg-red-600";
    }
  };
  const getIcon = () => {
    if (guessIsCorrect(props.guessDistance)) {
      return <PiCheckFatFill />;
    } else if (props.guessDistance > 0) {
      return <PiArrowFatDownFill />;
    } else {
      return <PiArrowFatUpFill />;
    }
  };
  return (
    <li
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-lg font-bold lg:text-xl ${getBgClassName()}`}
    >
      {getIcon()}
      {props.guess}
    </li>
  );
}
export function Guesses(props: {
  invention: InventionSelect;
  guesses: number[];
}) {
  return (
    <ul className="flex flex-col gap-2">
      {props.guesses.map((guess) => (
        <Guess
          key={`${guess}`}
          guessDistance={getGuessDistance(guess, props.invention)}
          guess={guess}
        />
      ))}
    </ul>
  );
}
