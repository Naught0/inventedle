import { createIOTD } from "@/db/server-only";
import { scheduleJob, RecurrenceRule } from "node-schedule";

(async () => {
  try {
    await createIOTD();
  } catch {}

  const rule = new RecurrenceRule();
  rule.tz = "America/New_York";
  rule.hour = 0;
  rule.minute = 0;
  rule.second = 30;
  console.log(
    `Scheduling rotateInvention for ${rule.nextInvocationDate(new Date())}`,
  );
  scheduleJob(rule, createIOTD);
})();
