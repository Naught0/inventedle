"server-only";
import { TZDate } from "@date-fns/tz";
import { isSameDay, subMonths } from "date-fns";
import { db } from ".";
import { getIOTD, getRandomInvention } from "./actions";

/**
 * Creates an Invention of the Day unless one has already been created for today (EST)
 *
 */
export async function createIOTD() {
  const now = new TZDate(new Date(), "America/New_York");
  const iotd = await getIOTD();

  if (iotd && isSameDay(new TZDate(iotd.created_at, "America/New_York"), now)) {
    throw new Error("IOTD already exists for today");
  }

  console.log(`Creating IOTD for ${now.toDateString()} at`, now);
  const avoidIOTDs = (
    await db.inventionOfTheDay.findMany({
      select: { invention_id: true },
      distinct: ["invention_id"],
      where: {
        created_at: {
          gt: subMonths(now, 3),
        },
      },
    })
  ).map((i) => i.invention_id);
  const avoidBadInventions = (
    await db.invention.findMany({
      select: { id: true },
      distinct: ["id"],
      where: {
        OR: [
          { id: { in: avoidIOTDs } },
          { image_url: { equals: null } },
          { description: { equals: "" } },
          { invention_link: { equals: null } },
        ],
      },
    })
  ).map((i) => i.id);
  console.log(
    `Avoiding ${avoidIOTDs.length} IOTDs and ${avoidBadInventions.length} bad inventions`,
  );

  const invention = await getRandomInvention([
    ...avoidIOTDs,
    ...avoidBadInventions,
  ]);
  const newIotd = await db.inventionOfTheDay.create({
    data: {
      invention_id: invention.id,
    },
  });
  return newIotd;
}

export async function getUserStats(userId: string) {
  return await getStats({ userId });
}

export async function getIOTDStats(iotdId: number) {
  return await getStats({ iotdId });
}

async function getStats({
  iotdId,
  userId,
}: {
  iotdId?: number;
  userId?: string;
}) {
  const wins = await db.result.groupBy({
    by: ["num_guesses"],
    _count: { _all: true },
    where: {
      user_id: userId,
      iotd_id: iotdId,
      win: true,
    },
  });
  const losses = await db.result.count({
    where: { win: false, iotd_id: iotdId, user_id: userId },
  });

  // low to high
  wins.sort((a, b) => a.num_guesses - b.num_guesses);
  const stats = Object.fromEntries(
    wins.map((r) => [r.num_guesses, r._count._all]),
  );
  stats["X"] = losses;
  return stats;
}
