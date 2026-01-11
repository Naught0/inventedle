import type { Stats } from "@/actions/server-only";

export function getTotalWins(stats: Stats) {
  return Object.entries(stats)
    .filter(([k]) => k !== "X")
    .reduce((a, b) => a + b[1], 0);
}

export function calculateTotalGuesses(stats: Stats) {
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

export function calculateAverageGuesses(stats: Stats): string {
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
