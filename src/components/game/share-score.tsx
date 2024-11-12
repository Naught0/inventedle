"use client";
import { PiCopyFill } from "react-icons/pi";
import { getHotness, guessIsCorrect } from "./logic";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode, useState } from "react";
import { buttonVariants } from "../ui/button";
import { HotnessRules } from "./types";
import { Hotness } from "./enum";
import { BiSolidSquareRounded } from "react-icons/bi";

function getClassName(hotness: Hotness, bgOrText: "bg" | "text" = "bg") {
  // These must be explicitcly in the code for tailwind to include them
  const classnames = {
    bg: ["bg-emerald-600", "bg-closeYellow", "bg-orange-500", "bg-destructive"],
    text: [
      "text-emerald-600",
      "text-closeYellow",
      "text-orange-500",
      "text-destructive",
    ],
  };
  switch (hotness) {
    case Hotness.CORRECT:
      return classnames[bgOrText][0];
    case Hotness.HOT:
      return classnames[bgOrText][1];
    case Hotness.WARM:
      return classnames[bgOrText][2];
    case Hotness.COLD:
      return classnames[bgOrText][3];
  }
}

function HotnessSquare({ hotness }: { hotness: Hotness }) {
  return (
    <BiSolidSquareRounded
      className={`text-2xl md:text-4xl ${getClassName(hotness, "text")}`}
    />
  );
}

export function ShareScore(props: {
  guessDistances: number[];
  rules: HotnessRules;
}) {
  const [showCopied, setShowCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState<ReactNode>();
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
    setCopiedMessage(
      props.guessDistances.map((d, idx) => (
        <HotnessSquare
          key={`${d}${idx}`}
          hotness={getHotness(d, props.rules)}
        />
      )),
    );
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
          Share <PiCopyFill />
        </PopoverTrigger>
      </PopoverAnchor>

      <PopoverContent className="inline-flex w-fit items-center justify-center gap-2 bg-slate-200 px-4 text-center font-bold text-slate-900">
        {copiedMessage}
      </PopoverContent>
    </Popover>
  );
}
