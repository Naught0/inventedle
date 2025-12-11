import { db } from "@/db";
import { createIOTD } from "@/db/server-only";
import { scheduleJob, RecurrenceRule } from "node-schedule";

export async function getRandomInvention(excludeIds: number[] = []) {
  const ids = await db.invention.findMany({
    select: { id: true },
    where: { image_url: { not: null }, id: { notIn: excludeIds } },
  });
  const { id } = ids[Math.floor(Math.random() * ids.length)];
  return (await db.invention.findUnique({ where: { id } }))!;
}

async function rotateInvention() {
  const iotd = await createIOTD();
  console.log(new Date(), "Rotated invention, new iotd:", iotd);
}

(async () => {
  const rule = new RecurrenceRule();
  rule.tz = "America/New_York";
  rule.hour = 0;
  rule.minute = 0;
  rule.second = 30;
  console.log(
    `Scheduling rotateInvention for ${rule.nextInvocationDate(new Date())}`,
  );
  scheduleJob(rule, rotateInvention);
})();
