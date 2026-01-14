"use client";
import type { Stats } from "@/actions/server-only";
import { useMemo } from "react";
import { LocalGame, localStorageKeyBase } from "./hooks/use-game-recorder";
import { UserStatsSection } from "./user-stats-page";

export function LocalStatsPage() {
  const allGames = useMemo(() => {
    const games = [];
    for (const [key, value] of Object.entries(localStorage)) {
      if (key.startsWith(localStorageKeyBase)) {
        const game = JSON.parse(value) as LocalGame;
        games.push(game);
      }
    }
    return games;
  }, []);

  const totalGames = allGames.length;
  const totalWins = allGames.filter((game) => game.win).length;
  const totalLosses = allGames.filter(
    (game) => !game.win && game.guesses.length >= 5,
  ).length;
  const gameStats: Stats = allGames.reduce((acc, game) => {
    if (game.win) {
      const key = game.guesses.length.toString() as keyof Stats;
      acc[key] = (acc[key] || 0) + 1;
    } else {
      if (game.guesses.length >= 5) {
        acc["X"] = (acc["X"] || 0) + 1;
      }
    }
    return acc;
  }, {} as Stats);

  return totalGames > 0 ? (
    <UserStatsSection
      totalWins={totalWins}
      totalLosses={totalLosses}
      totalGames={totalGames}
      gameStats={gameStats}
    />
  ) : (
    <h3 className="text-muted-foreground text-2xl">
      You haven&apos;t played any games yet. Play some games to see your stats.
    </h3>
  );
}
