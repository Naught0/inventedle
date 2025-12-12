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
