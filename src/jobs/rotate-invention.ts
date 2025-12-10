import { createIOTD } from "@/db/actions";
import { scheduleJob, RecurrenceRule } from "node-schedule";

async function rotateInvention() {
  const iotd = await createIOTD();
  console.log(new Date(), "Rotated invention, new iotd:", iotd);
}

(async () => {
  const rule = new RecurrenceRule();
  rule.hour = 0;
  rule.minute = 0;
  rule.second = 30;
  console.log(
    `Scheduling rotateInvention for ${rule.nextInvocationDate(new Date())}`,
  );
  scheduleJob(rule, rotateInvention);
})();
