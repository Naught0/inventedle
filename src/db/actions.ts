"use server";
import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { InventionInsert, inventions, usedInventions } from "./schema";

export async function updateInvention(
  invention: Partial<InventionInsert> & { id: number },
) {
  return await db
    .update(inventions)
    .set(invention)
    .where(eq(inventions.id, invention.id));
}

export async function getInventionOfTheDay() {
  const inventionId = await db
    .select()
    .from(usedInventions)
    .where(eq(usedInventions.is_current, 1))
    .orderBy(desc(usedInventions.used_at))
    .limit(1);

  const results = await db
    .select()
    .from(inventions)
    .where(eq(inventions.id, inventionId[0].invention_id));

  return results[0];
}
