import { createIOTD, getIOTD } from "@/db/actions";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  let iotd = await getIOTD();
  if (!iotd) {
    iotd = await createIOTD();
  }
  redirect(`/${iotd.id}`, RedirectType.push);
}
