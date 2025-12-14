import { getIOTD } from "@/db/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { Suspense } from "react";
import { LoadingGame } from "@/components/loading";
import { GamePage } from "@/components/game-page";

export const dynamic = "force-dynamic";

export default async function Page() {
  const iotd = await getIOTD();
  const session = await auth.api.getSession({ headers: await headers() });
  let result = null;
  if (iotd && session) {
    result = await db.result.findFirst({
      where: {
        user_id: session?.user.id,
        iotd_id: iotd.id,
      },
    });
  }

  return (
    <Suspense fallback={<LoadingGame />}>
      {iotd && <GamePage iotd={iotd} gameResult={result} />}
    </Suspense>
  );
}
