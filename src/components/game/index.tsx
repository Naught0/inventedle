"use client";
import { Activity } from "react";
import { InventionModel } from "@/db/prisma/generated/models";
import { createRef, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Era } from "./enum";
import { EraSelect } from "./era-select";
import { Guesses } from "./guesses";
import { getGuessDistance, getRulesByYear, guessIsCorrect } from "./logic";
import { ShareScore } from "./share-score";
import { formatYear } from "./utils";
import { Summary } from "./summary";
import {
  getCurrentGameFromLocalStorage,
  recordGame,
  LocalGame,
  recordGameToLocalStorage,
} from "../hooks/use-game-recorder";
import { useSession } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { useImmer } from "use-immer";
import { GuessStatsChart } from "../charts/guess-stats-chart";
import { Separator } from "@radix-ui/react-separator";
import { Hyperlink } from "../hyperlink";
import { ImageWithCaption } from "../image-with-caption";
import { FriendsGuessChart } from "../charts/friends-guess-chart";
import type { FriendGuessChartResults } from "@/actions/server-only";
import { Stack } from "../ui/stack";

export default function Game({
  invention,
  iotdId,
  gameResult,
}: {
  invention: InventionModel;
  iotdId: number;
  gameResult?: LocalGame | null;
}) {
  const { data, isPending } = useSession();
  const isLoggedIn = !!data;
  const [era, setEra] = useState<Era>(Era.CE);
  const rules = getRulesByYear(invention.year);
  const formRef = createRef<HTMLFormElement>();
  const localGameCached = useMemo(
    () => getCurrentGameFromLocalStorage(iotdId),
    [iotdId],
  );
  const [guesses, setGuesses] = useImmer<number[]>([]);
  useEffect(
    function initGuesses() {
      const g =
        (isLoggedIn ? gameResult?.guesses : localGameCached?.guesses) ?? [];
      setGuesses(() => [...g]);
    },
    [gameResult, localGameCached, isLoggedIn, setGuesses],
  );

  const [syncEnabled, setSyncEnabled] = useState(false);
  const game = useMemo<LocalGame>(() => {
    const g = {
      ...gameResult,
      guesses,
      win: guessIsCorrect(
        getGuessDistance(guesses.slice(-1)[0], invention),
        getRulesByYear(invention.year),
      ),
      iotd_id: iotdId,
      invention_id: invention.id,
    };
    return g;
  }, [gameResult, guesses, invention, iotdId]);
  const gameWon = game.win;
  const gameLost = !game.win && game.guesses.length >= 5;
  const gameOver = gameWon || gameLost;

  const { data: iotdStatsData, refetch: refetchIotdStats } = useQuery<
    Record<string, number>
  >({
    queryKey: ["iotdStats", iotdId],
    queryFn: () => makeIotdStatsRequest(iotdId),
  });

  const { data: friendIOTDStats } = useQuery({
    queryKey: ["friendIOTDStats", iotdId],
    queryFn: () => makeIotdFriendStatsRequest(iotdId),
    enabled: gameOver && isLoggedIn,
  });

  useEffect(
    function syncGameState() {
      if (!syncEnabled) return;
      if (gameOver) {
        recordGame(game, !isLoggedIn).then(() => {
          setSyncEnabled(false);
          if (!isLoggedIn) recordGameToLocalStorage(game);
          refetchIotdStats();
        });
        return;
      }
      if (isLoggedIn) recordGame(game);
      else recordGameToLocalStorage(game);
    },
    [game, gameOver, isLoggedIn, syncEnabled, refetchIotdStats],
  );
  const [answerYear, answerEra] = formatYear(invention.year, true).split(" ");

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 md:max-w-lg lg:max-w-screen-lg lg:gap-12">
        <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6">
          <div className="flex w-full flex-col justify-start">
            {invention.image_url && (
              <div className="flex flex-1 basis-1/2 flex-col justify-start gap-3 rounded-lg lg:gap-6">
                <ImageWithCaption
                  className="max-h-[512px] max-w-full rounded-lg"
                  src={invention.image_url}
                  alt={`${invention.name}`}
                >
                  {invention.image_url && (
                    <Stack className="gap-0" center>
                      <div className="inline-flex h-4 items-center gap-1">
                        <span>
                          image from{" "}
                          {new URL(invention.image_url).hostname.split(".")[1]}
                        </span>
                        <Separator
                          orientation="vertical"
                          className="bg-muted-foreground h-3 w-[1px]"
                        />
                        <Hyperlink
                          href={invention.invention_link ?? invention.image_url}
                          className="inline-flex items-center gap-1"
                        >
                          source
                        </Hyperlink>
                      </div>
                      <p className="text-muted-foreground text-xs italic">
                        images are not a hint and can be misleading
                      </p>
                    </Stack>
                  )}
                </ImageWithCaption>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            {gameOver && (
              <Stack className="text-3xl font-bold">
                <p>
                  {gameWon
                    ? "You won!"
                    : gameLost
                      ? "You lost!"
                      : "Something strange happened..."}{" "}
                  The year was:
                </p>
                <p className="text-primary w-fit rounded-lg border-transparent font-mono text-4xl">
                  {answerYear}
                  <span className="text-primary font-sans text-3xl">
                    {" "}
                    {answerEra}
                  </span>
                </p>
              </Stack>
            )}
            {gameOver ? (
              <div className="my-3 flex flex-col gap-3">
                {guesses && (
                  <ShareScore
                    iotdId={iotdId}
                    guessDistances={guesses.map((g) =>
                      getGuessDistance(g, invention),
                    )}
                    rules={rules}
                  />
                )}
                <Summary invention={invention} />
              </div>
            ) : null}
            <Guesses invention={invention} guesses={guesses} />
            {!gameOver && (
              <form
                ref={formRef}
                action={(data) => {
                  const factor = era === Era.CE ? 1 : -1;
                  const guess =
                    parseInt((data.get("guess") as string) ?? "") * factor;

                  if (!isNaN(guess)) {
                    setGuesses((g) => {
                      g.push(guess);
                    });
                  } else return;

                  setSyncEnabled(true);
                  formRef.current?.reset();
                }}
              >
                <div className="flex flex-grow flex-col gap-3">
                  <div className="flex flex-row items-center gap-0">
                    <Input
                      className="text-foreground placeholder:text-muted-foreground bg-background rounded-r-none"
                      name="guess"
                      type="number"
                      inputMode="numeric"
                      max={
                        era === Era.CE
                          ? new Date().getFullYear() + 1
                          : undefined
                      }
                      disabled={isPending || gameOver}
                      placeholder={
                        !gameOver
                          ? `Guess a year | (Guess ${guesses.length + 1} / 5)`
                          : undefined
                      }
                      autoFocus
                    />
                    <EraSelect
                      value={era}
                      onChange={setEra}
                      disabled={gameOver}
                    />
                  </div>
                  <div>
                    <Button size="xl" type="submit" disabled={gameOver}>
                      Guess
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Activity mode={gameOver && !!iotdStatsData ? "visible" : "hidden"}>
        <div className="flex w-full flex-col items-center gap-3">
          <p className="text-3xl font-bold lg:text-4xl">Stats</p>
          <div className="flex w-full flex-wrap justify-center gap-3 lg:max-w-full lg:flex-nowrap">
            {Object.values(friendIOTDStats ?? {}).some((f) => f.length) && (
              <FriendsGuessChart data={friendIOTDStats} />
            )}
            <GuessStatsChart numGuesses={iotdStatsData} />
          </div>
        </div>
      </Activity>
    </div>
  );
}

async function makeIotdStatsRequest(iotdId: number) {
  return (await (
    await fetch(`/api/game/${iotdId}/stats`, { method: "GET" })
  ).json()) as Record<string, number>;
}

async function makeIotdFriendStatsRequest(iotdId: number) {
  return (await (
    await fetch(`/api/game/${iotdId}/stats/friends`, { method: "GET" })
  ).json()) as FriendGuessChartResults;
}

export { Game };
