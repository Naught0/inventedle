import { createIOTD, getIOTD } from "@/db/actions";
import { GamePage } from "./[id]/page";

export const dynamic = "force-dynamic";

export default async function Page() {
  let iotd = await getIOTD();
  if (!iotd) {
    iotd = await createIOTD();
  }
  return <GamePage iotd={iotd} />;
}
