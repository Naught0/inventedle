"server-only";
import { TZDate } from "@date-fns/tz";
import { isSameDay, subMonths } from "date-fns";
import { db } from ".";
import { getIOTD, getRandomInvention } from "./actions";

export async function createIOTD() {
  /// Creates an Invention of the Day unless one has already been created for today (EST)
  const now = new TZDate(new Date(), "America/New_York");
  const iotd = await getIOTD();

  if (iotd && isSameDay(new TZDate(iotd.created_at, "America/New_York"), now)) {
    throw new Error("IOTD already exists for today");
  }

  console.log(`Creating IOTD for ${now.toDateString()} at`, now);
  const avoidInventions = await db.inventionOfTheDay.findMany({
    select: { invention_id: true },
    distinct: ["invention_id"],
    where: {
      created_at: {
        gt: subMonths(now, 2),
      },
    },
  });
  const invention = await getRandomInvention(
    avoidInventions.map((i) => i.invention_id),
  );
  const newIotd = await db.inventionOfTheDay.create({
    data: {
      invention_id: invention.id,
    },
  });
  return newIotd;
}
