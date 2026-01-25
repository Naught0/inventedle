import { getIOTD } from "@/db/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { Suspense } from "react";
import { LoadingGame } from "@/components/loading";
import { GamePage } from "@/components/game-page";
import { generateIOTDMeta } from "@/actions/server-only";
import { RefreshAfter } from "@/components/useRefreshAfter";
import { Providers } from "@/components/providers";

export const dynamic = "force-dynamic";

export const generateMetadata = async () => {
  const meta = await generateIOTDMeta();
  meta.title = "Inventedle";
  return meta;
};

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
    <Providers session={session}>
      <Suspense fallback={<LoadingGame />}>
        {!iotd && (
          <>
            <RefreshAfter afterSeconds={5} />
            <LoadingGame />
          </>
        )}
        {iotd && <GamePage iotd={iotd} gameResult={result} />}
      </Suspense>
    </Providers>
  );
}
