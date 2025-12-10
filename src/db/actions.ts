"use server";
import { InventionModel } from "@/db/prisma/generated/models";
import { db } from ".";
import { isSameDay, startOfDay, subMonths } from "date-fns";
import { TZDate } from "@date-fns/tz";

export async function updateInvention(invention: Partial<InventionModel>) {
  return await db.invention.update({
    where: { id: invention.id },
    data: invention,
  });
}

export async function getRandomInvention(excludeIds: number[] = []) {
  const ids = await db.invention.findMany({
    select: { id: true },
    where: { image_url: { not: null }, id: { notIn: excludeIds } },
  });
  const { id } = ids[Math.floor(Math.random() * ids.length)];
  return (await db.invention.findUnique({ where: { id } }))!;
}

export async function getIOTD() {
  const invention = await db.inventionOfTheDay.findFirst({
    where: {
      created_at: {
        gte: startOfDay(new TZDate(new Date(), "America/New_York")),
      },
    },
    orderBy: { id: "desc" },
  });
  return invention;
}

export async function createIOTD() {
  /// Creates an Invention of the Day unless one has already been created for today (EST)
  const now = new TZDate(new Date(), "America/New_York");
  const iotd = await getIOTD();

  if (iotd && isSameDay(new TZDate(iotd.created_at, "America/New_York"), now)) {
    throw new Error("IOTD already exists for today");
  }

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
