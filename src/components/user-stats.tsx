"use client";
import type { auth } from "@/lib/auth";
import { GuessStatsChart } from "./charts/guess-stats-chart";
import { StatCard } from "./ui/stat-card";
import type { Stats } from "@/db/server-only";

export function UserStats({
  session,
  serverStats,
}: {
  session?: Awaited<ReturnType<typeof auth.api.getSession>>;
  serverStats?: Stats;
}) {
  const stats: Stats = serverStats ?? {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    X: 0,
  };
  const totalGames = Object.values(stats).reduce((a, b) => a + b, 0);
  const totalWins = getTotalWins(stats);
  const totalLosses = stats["X"];
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <h2 className="text-accent-foreground mb-6 w-full text-center text-3xl font-bold lg:mb-8">
        {!session ? "Local" : `${session.user.name}'s`} Stats
      </h2>
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
        <GuessStatsChart title={"Game Results"} numGuesses={serverStats} />
      </div>
    </main>
  );
}

function getTotalWins(stats: Stats) {
  return Object.entries(stats)
    .filter(([k]) => k !== "X")
    .reduce((a, b) => a + b[1], 0);
}

function calculateTotalGuesses(stats: Stats, winOnly = false) {
  let totalGuesses = 0;
  for (const key in stats) {
    if (key === "X") {
      if (winOnly) continue;
      totalGuesses += 5;
    } else {
      totalGuesses += Number(key) * stats[key as keyof typeof stats];
    }
  }
  return totalGuesses;
}

function calculateAverageGuesses(stats: Stats): number {
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
    return 0;
  }

  const average = totalGuessProduct / totalGamesPlayed;

  return average;
}
