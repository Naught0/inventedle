"use client";
import {
  InventionModel,
  InventionOfTheDayModel,
  ResultModel,
} from "@/db/prisma/generated/models";
import { TZDate } from "@date-fns/tz";
import { isSameDay, isToday } from "date-fns";
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
  const isTodaysPuzzle = isSameDay(
    new TZDate(iotd.created_at, "America/New_York"),
    new TZDate(new Date(), "America/New_York"),
  );

  return (
    <div className="flex w-full flex-col items-center gap-4 lg:gap-6">
      <div className="grid gap-2 text-center lg:gap-3">
        <div className="inline-flex items-center justify-center gap-3">
          <Button
            aria-label="previous puzzle"
            className={cn("rounded-full", prevId === 0 ? "invisible" : "")}
            variant="link"
            asChild
          >
            <Link href={`/${prevId}`} prefetch>
              <PiCaretLeftBold className="text-2xl" strokeWidth={30} />
              <span className="sr-only">previous puzzle</span>
            </Link>
          </Button>
          <h2 className="text-center text-2xl font-bold">
            Inventedle #{iotd.id}
          </h2>
          <Button
            className={cn("rounded-full", isTodaysPuzzle ? "invisible" : "")}
            variant="link"
            asChild
          >
            <Link href={`/${nextId}`} prefetch>
              <PiCaretRightBold className="text-2xl" strokeWidth={30} />
              <span className="sr-only">next puzzle</span>
            </Link>
          </Button>
        </div>
        <p className="text-xl">{iotd.created_at.toLocaleDateString()}</p>
        <p>
          {!isToday(iotd.created_at) && (
            <Hyperlink href="/" target="" className="italic">
              Click here for today&apos;s puzzle
            </Hyperlink>
          )}
        </p>
      </div>
      <h2 className="text-center text-3xl font-normal lg:text-4xl">
        <span className="text-far-red font-extrabold">{invention.name}</span>
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
