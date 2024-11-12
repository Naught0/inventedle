import { db } from "@/db";
import { redirect } from "next/navigation";

async function getInvention() {
  const ids = await db.invention.findMany({
    select: { id: true },
    where: { name_updated: false },
  });
  const randIdx = Math.floor(Math.random() * ids.length);
  return ids[randIdx].id;
}

export default async function Page() {
  redirect(`/data-wrangler/tinder/${await getInvention()}`);
}
