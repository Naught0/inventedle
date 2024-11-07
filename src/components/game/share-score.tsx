"use client";
import { PiShare } from "react-icons/pi";
import { getHotness, guessIsCorrect } from "./logic";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { buttonVariants } from "../ui/button";
import { HotnessRules } from "./types";
import { Hotness } from "./enum";

export function ShareScore(props: {
  guessDistances: number[];
  rules: HotnessRules;
}) {
  const [showCopied, setShowCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState<string>();
  const getEmoji = (distance: number) => {
    const proximity = getHotness(distance, props.rules);
    switch (proximity) {
      case Hotness.CORRECT:
        return "🟩";
      case Hotness.HOT:
        return "🟨";
      case Hotness.WARM:
        return "🟧";
      case Hotness.COLD:
        return "🟥";
    }
  };
  const onClick = () => {
    const guesses = props.guessDistances.map(getEmoji);
    const pad = 5 - guesses.length;
    const emojis = [...guesses, "◼️".repeat(pad)];
    const winner =
      props.guessDistances.findIndex((d) => guessIsCorrect(d, props.rules)) + 1;
    const text = `Inventedle ${winner ? `${winner}/5` : "X/5"}\n\n${emojis.join(" ")}`;
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

      <PopoverContent className="inline-flex w-fit items-center justify-center gap-2 bg-slate-100 px-4 text-center font-bold text-slate-900">
        {copiedMessage}
      </PopoverContent>
    </Popover>
  );
}
