"use server";
import { eq } from "drizzle-orm";
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
