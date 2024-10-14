"use server";
import { Invention } from "@prisma/client";
import { db } from ".";

export async function updateInvention(invention: Invention) {
  return await db.invention.update({
    where: { id: invention.id },
    data: invention,
  });
}

export async function getRandomInvention() {
  const ids = await db.invention.findMany({ select: { id: true } });
  const inventionId = ids[Math.floor(Math.random() * ids.length)];
  return await db.invention.findUnique({ where: { id: inventionId.id } });
}

export async function getInventionOfTheDay(): Promise<Invention> {
  return (await db.invention.findUnique({ where: { id: 328 } }))!;
  // return await getRandomInvention();
  // const inventionId = await db
  //   .select()
  //   .from(usedInventions)
  //   .where(eq(usedInventions.is_current, 1))
  //   .orderBy(desc(usedInventions.used_at))
  //   .limit(1);
  //
  // const results = await db
  //   .select()
  //   .from(inventions)
  //   .where(eq(inventions.id, inventionId[0].invention_id));
  //
  // return results[0];
}
