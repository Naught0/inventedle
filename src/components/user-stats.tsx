"use client";
import type { SessionWithUser } from "@/lib/auth";
import { GuessStatsChart } from "./charts/guess-stats-chart";
import { StatCard } from "./ui/stat-card";
import type { Stats } from "@/db/server-only";
import { Stack } from "./ui/stack";
import Image from "next/image";
import { Hyperlink } from "./hyperlink";
import { PiShareFatFill } from "react-icons/pi";
import { CopyButton } from "./ui/copy-button";
import { FriendshipModel } from "@/db/prisma/generated/models";
import { FriendButton } from "./friend-button";

export function UserStats({
  user,
  stats,
  showPrivateUserBanner,
  loginSession,
}: {
  user?: SessionWithUser["user"];
  stats?: Stats;
  showPrivateUserBanner?: boolean;
  loginSession?: SessionWithUser | null;
  friendRequest?: FriendshipModel | null;
}) {
  if (!stats) return null;

  const totalGames = Object.values(stats).reduce((a, b) => a + b, 0);
  const totalWins = getTotalWins(stats);
  const totalLosses = stats["X"];
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <Stack className="mb-6 flex-col items-center gap-1">
        {user?.image && (
          <Image
            alt="profile picture"
            src={user.image}
            className="rounded-full"
            height={128}
            width={128}
          />
        )}
        <Stack className="items-center gap-3">
          <h2 className="text-accent-foreground w-full text-center text-3xl font-bold">
            {!user ? "Local" : `${user.name}'s`} Stats
          </h2>
          {showPrivateUserBanner ? (
            <Stack className="text-muted-foreground text-center text-sm">
              <p className="text-muted-foreground text-sm">
                Only you can see this page
              </p>
              <p>
                <Hyperlink href="/profile">
                  If you want to share your stats, change your privacy settings{" "}
                  here
                </Hyperlink>
              </p>
            </Stack>
          ) : (
            <Stack className="flex-col-reverse flex-wrap items-center justify-center gap-3 md:flex-row">
              <CopyButton
                value={
                  typeof window !== "undefined" ? window.location.href : ""
                }
                className="inline-flex w-fit items-center gap-2"
                icon={<PiShareFatFill />}
                variant={"link"}
              >
                Share
              </CopyButton>
              {!!loginSession &&
                user?.id !== loginSession.user.id &&
                user?.id && <FriendButton recipientId={user.id} />}
            </Stack>
          )}
        </Stack>
      </Stack>
      <div className="my-3 flex flex-col items-center gap-3">
        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-grow flex-wrap justify-center gap-3">
            <StatCard title={"Games"}>
              <span>{totalWins}W</span>/<span>{totalLosses}L</span>
            </StatCard>
            <StatCard title={"Win %"}>
              {Intl.NumberFormat().format(
                Math.round((totalWins / totalGames) * 100),
              )}
              %
            </StatCard>
            <StatCard title={"Total Guesses"}>
              {calculateTotalGuesses(stats)}
            </StatCard>
            <StatCard title={"Avg. Guesses to Win"}>
              {calculateAverageGuesses(stats)}
            </StatCard>
          </div>
        </div>
        <GuessStatsChart title={"Game Results"} numGuesses={stats} />
      </div>
    </main>
  );
}

function getTotalWins(stats: Stats) {
  return Object.entries(stats)
    .filter(([k]) => k !== "X")
    .reduce((a, b) => a + b[1], 0);
}

function calculateTotalGuesses(stats: Stats) {
  let totalGuesses = 0;
  for (const key in stats) {
    if (key === "X") {
      totalGuesses += 5 * stats[key];
    } else {
      const by = Number(key) * stats[key as keyof typeof stats];
      totalGuesses += by;
    }
  }
  return totalGuesses;
}

function calculateAverageGuesses(stats: Stats): string {
  const data = Object.fromEntries(
    Object.entries(stats).filter(([k, v]) => k !== "X" && v > 0),
  );
  const keys = Object.keys(data);

  const totalGuessProduct = keys.reduce((sum, key) => {
    const guesses = parseInt(key);
    const totalGames = data[key as keyof typeof data];

    const ret = sum + guesses * totalGames;
    return ret;
  }, 0);

  const totalGamesPlayed = keys.reduce((sum, key) => {
    const totalGames = data[key as keyof typeof data];
    return sum + totalGames;
  }, 0);

  if (totalGamesPlayed === 0) {
    return "0";
  }

  const average = totalGuessProduct / totalGamesPlayed;

  return Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(
    average,
  );
}
