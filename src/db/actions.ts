"use server";
import { eq, sql } from "drizzle-orm";
import { db } from ".";
import { InventionInsert, inventions } from "./schema";

export async function updateInvention(
  invention: Partial<InventionInsert> & { id: number },
) {
  return await db
    .update(inventions)
    .set(invention)
    .where(eq(inventions.id, invention.id));
}

export async function getRandomInvention() {
  const result = await db
    .select()
    .from(inventions)
    .orderBy(sql`random()`)
    .limit(1);
  return result[0];
}

export async function getInventionOfTheDay() {
  return (await db.select().from(inventions).where(eq(inventions.id, 328)))[0];
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
