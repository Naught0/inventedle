"use client";
import { PiShareFatFill } from "react-icons/pi";
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
import { cn } from "@/lib/utils";

function getClassName(hotness: Hotness, bgOrText: "bg" | "text" = "bg") {
  // These must be explicitcly in the code for tailwind to include them
  const classnames = {
    bg: [
      "bg-emerald-600",
      "bg-status-warning",
      "bg-status-orange",
      "bg-destructive",
    ],
    text: [
      "text-status-success",
      "text-status-warning",
      "text-status-orange",
      "text-status-error",
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
  iotdId: number;
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
    const emojis = [...guesses, "⬛ ".repeat(pad)];
    const winner =
      props.guessDistances.findIndex((d) => guessIsCorrect(d, props.rules)) + 1;
    const text = `Inventedle #${props.iotdId} ${winner ? `${winner}/5` : "X/5"}\n\n${emojis.join(" ")}`;
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
          className={cn(
            buttonVariants({
              className: "gap-2 font-bold",
              size: "xl",
              variant: "outline",
            }),
            "bg-accent text-accent-foreground",
          )}
          type="button"
          onClick={onClick}
        >
          <PiShareFatFill strokeWidth={15} />
          Share
        </PopoverTrigger>
      </PopoverAnchor>

      <PopoverContent className="bg-secondary grid justify-center gap-2 px-4 text-center font-bold">
        <div>Copied your results!</div>
        <div className="inline-flex gap-1.5">{copiedMessage}</div>
      </PopoverContent>
    </Popover>
  );
}
