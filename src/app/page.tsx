import { getIOTD } from "@/db/actions";
import { GamePage } from "./[id]/page";

export const dynamic = "force-dynamic";

export default async function Page() {
  const iotd = await getIOTD();
  return <GamePage iotd={iotd} />;
}
