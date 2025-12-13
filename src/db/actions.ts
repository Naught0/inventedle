import { db } from ".";
import { startOfDay } from "date-fns";
import { TZDate } from "@date-fns/tz";

export async function getIOTD() {
  const iotd = await db.inventionOfTheDay.findFirst({
    where: {
      created_at: {
        gte: startOfDay(new TZDate(new Date(), "America/New_York")),
      },
    },
    orderBy: { id: "desc" },
  });
  return iotd;
}

export async function getRandomInvention(excludeIds: number[] = []) {
  const ids = await db.invention.findMany({
    select: { id: true },
    where: { image_url: { not: null }, id: { notIn: excludeIds } },
  });
  const { id } = ids[Math.floor(Math.random() * ids.length)];
  return (await db.invention.findUnique({ where: { id } }))!;
}

export async function getIOTDStats(iotdId: number) {
  const wins = await db.result.groupBy({
    by: ["num_guesses"],
    _count: { _all: true },
    where: {
      iotd_id: iotdId,
      win: true,
    },
  });
  const losses = await db.result.count({
    where: { win: false, iotd_id: iotdId },
  });

  // low to high
  wins.sort((a, b) => a.num_guesses - b.num_guesses);
  const stats = Object.fromEntries(
    wins.map((r) => [r.num_guesses, r._count._all]),
  );
  stats["X"] = losses;
  return stats;
}
