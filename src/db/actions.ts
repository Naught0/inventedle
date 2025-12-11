"use server";
import { db } from ".";
import { startOfDay } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { createIOTD } from "./server-only";

export async function getIOTD() {
  const iotd = await db.inventionOfTheDay.findFirst({
    where: {
      created_at: {
        gte: startOfDay(new TZDate(new Date(), "America/New_York")),
      },
    },
    orderBy: { id: "desc" },
  });
  if (!iotd) {
    return await createIOTD();
  }
  return iotd;
}
