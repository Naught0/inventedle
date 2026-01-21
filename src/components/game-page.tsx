"use client";
import {
  InventionModel,
  InventionOfTheDayModel,
  ResultModel,
} from "@/db/prisma/generated/models";
import { tz, TZDate } from "@date-fns/tz";
import { formatDate, isSameDay } from "date-fns";
import Link from "next/link";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { LocalGame } from "./hooks/use-game-recorder";
import { Hyperlink } from "./hyperlink";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";

const Game = dynamic(() => import("./game/index"), { ssr: false });

export function GamePage({
  iotd,
  gameResult,
}: {
  iotd: InventionOfTheDayModel & { invention: InventionModel };
  gameResult?: ResultModel | null;
}) {
  const { invention } = iotd;
  if (!invention) {
    throw new Error("Something has gone horribly wrong");
  }
  const localGame: LocalGame = {
    iotd_id: iotd.id,
    invention_id: invention.id,
    win: !!gameResult?.win,
    guesses: (gameResult?.guesses ?? []) as number[],
  };
  const [nextId, prevId] = [iotd.id + 1, iotd.id - 1];
  const isTodaysPuzzle = isSameDay(new Date(), iotd.created_at, {
    in: tz("America/New_York"),
  });

  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="inline-flex items-center justify-center">
        <Button
          aria-label="previous puzzle"
          className={cn("rounded-full py-1.5", prevId === 0 ? "invisible" : "")}
          variant="link"
          asChild
        >
          <Link href={`/${prevId}`} aria-label="previous puzzle" prefetch>
            <PiCaretLeftBold className="text-3xl" strokeWidth={30} />
            <span className="sr-only">previous puzzle</span>
            <span className="hidden md:inline">prev</span>
          </Link>
        </Button>
        <p className="text-center text-3xl font-bold">Inventedle #{iotd.id}</p>
        <Button
          className={cn(
            "rounded-full py-1.5",
            isTodaysPuzzle ? "invisible" : "",
          )}
          variant="link"
          asChild
        >
          <Link href={`/${nextId}`} prefetch>
            <span className="hidden md:inline">next</span>
            <PiCaretRightBold className="text-3xl" strokeWidth={30} />
            <span className="sr-only">next puzzle</span>
          </Link>
        </Button>
      </div>
      <div className="text-center">
        <p className="text-xl">
          {formatDate(new TZDate(iotd.created_at, "America/New_York"), "P")}
        </p>
        <p>
          {!isTodaysPuzzle && (
            <Hyperlink tabIndex={0} href="/" target="" className="italic">
              Click here for today&apos;s puzzle
            </Hyperlink>
          )}
        </p>
      </div>
      <h2 className="mb-3 text-center text-3xl font-normal lg:text-4xl">
        <span className="text-far-red !font-extrabold">{invention.name}</span>
      </h2>
      <Game
        iotdId={iotd.id}
        invention={invention}
        gameResult={!!gameResult ? localGame : null}
      />
    </div>
  );
}
GamePage.displayName = "GamePage";
