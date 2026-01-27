"use client";
import { useState } from "react";
import { LocalGame } from "./hooks/use-game-recorder";
import { Stack } from "./ui/stack";
import { Button } from "./ui/button";
import { FaX } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { PiArrowUpRight } from "react-icons/pi";

function getLocalState() {
  if (typeof window === "undefined") return {};
  const lastDismissed = localStorage.getItem("numberLocalGamesAtLastDismiss");
  const lastDismissedNumber = parseInt(lastDismissed ?? "");
  const dismissed = localStorage.getItem("localGamesBannerDismissed");

  return {
    numGames: lastDismissedNumber || null,
    dismissed: dismissed === "true",
  };
}

export function LocalGamesBanner({ games }: { games: LocalGame[] }) {
  const router = useRouter();
  const { dismissed: localDismissed, numGames } = getLocalState();
  const [dismissed, setDismissed] = useState(localDismissed ?? false);
  function show() {
    localStorage.removeItem("localGamesBannerDismissed");
    localStorage.removeItem("numberLocalGamesAtLastDismiss");
    setDismissed(false);
  }
  function dismiss() {
    localStorage.setItem("localGamesBannerDismissed", "true");
    localStorage.setItem(
      "numberLocalGamesAtLastDismiss",
      games.length.toString(),
    );
    setDismissed(true);
  }
  if (dismissed && games.length > (numGames ?? 0)) show();
  if (dismissed || 0 === games.length) return null;
  return (
    <Stack>
      <h2 className="text-muted-foreground text-center">
        You can import{" "}
        <span className="text-foreground font-mono font-extrabold">
          {games.length} game{games.length === 1 ? "" : "s"}
        </span>{" "}
        played while signed out
      </h2>
      <Stack
        className="flex-col flex-wrap items-center justify-center sm:flex-row"
        gap="gap-6"
      >
        <Button
          size="sm"
          className="text-sm"
          onClick={() => router.push("/import")}
        >
          Import <PiArrowUpRight strokeWidth={20} className="text-base" />
        </Button>
        <Button
          className="w-fit p-0 text-sm font-normal"
          variant={"link"}
          type="button"
          onClick={dismiss}
        >
          <FaX className="text-xs" strokeWidth={40} />
          dismiss message
        </Button>
      </Stack>
    </Stack>
  );
}
