import { getIOTD } from "@/db/actions";
import { GamePage } from "./[id]/page";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";

export const dynamic = "force-dynamic";

export default async function Page() {
  const iotd = await getIOTD();
  const session = await auth.api.getSession({ headers: await headers() });
  let result = null;
  if (iotd && session) {
    result = await db.gameResult.findFirst({
      where: {
        user_id: session?.user.id,
        iotd_id: iotd.id,
      },
    });
  }

  return iotd && <GamePage iotd={iotd} gameResult={result} />;
}
