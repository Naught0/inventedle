"use client";

import { PiCopy, PiCopyFill, PiShare } from "react-icons/pi";
import { getGuessDistanceColor, guessIsCorrect } from "./logic";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { buttonVariants } from "../ui/button";
import { PopoverArrow } from "@radix-ui/react-popover";

export function ShareScore(props: { guessDistances: number[] }) {
  const [showCopied, setShowCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState<string>();
  const getEmoji = (distance: number) => {
    const color = getGuessDistanceColor(distance);
    switch (color) {
      case "green":
        return "🟩";
      case "yellow":
        return "🟨";
      case "red":
        return "🟥";
    }
  };
  const onClick = () => {
    const guesses = props.guessDistances.map(getEmoji);
    const pad = 5 - guesses.length;
    const emojis = [...guesses, "◼️".repeat(pad)];
    const winner = props.guessDistances.findIndex(guessIsCorrect) + 1;
    const text = `Inventle ${winner ? `${winner}/5` : "X/5"}\n\n${emojis.join(" ")}`;
    navigator.clipboard.writeText(text);
    setCopiedMessage(emojis.join(" "));
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
      setCopiedMessage("copied!");
    }, 2000);
  };

  return (
    <Popover open={showCopied}>
      <PopoverAnchor>
        <PopoverTrigger
          className={buttonVariants({
            className: "w-full gap-1",
          })}
          type="button"
          onClick={onClick}
        >
          Share <PiShare />
        </PopoverTrigger>
      </PopoverAnchor>

      <PopoverContent className="inline-flex w-fit items-center justify-center gap-2 bg-white px-4 text-center font-bold text-slate-900">
        <span>copied</span>
        {copiedMessage}
      </PopoverContent>
    </Popover>
  );
}
