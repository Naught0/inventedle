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

export function GuessPlaceholder() {
  return (
    <li className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-lg font-bold lg:text-xl">
      <span className="invisible">Text</span>
    </li>
  );
}
export function Guess(props: { guess: number; guessDistance: number }) {
  const getBgClassName = () => {
    const color = getGuessDistanceColor(props.guessDistance);
    switch (color) {
      case "green":
        return "bg-green-700";
      case "yellow":
        return "bg-yellow-600";
      case "red":
        return "bg-destructive";
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
      <span className="text-2xl">{getIcon()}</span>
      {props.guess}
    </li>
  );
}
export function Guesses({
  totalAllowedGuesses,
  ...props
}: {
  invention: InventionSelect;
  guesses: number[];
  totalAllowedGuesses: number;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {props.guesses.length < totalAllowedGuesses &&
        [...Array(totalAllowedGuesses - props.guesses.length).keys()].map(
          (idx) => <GuessPlaceholder key={idx} />,
        )}
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
