import { GamePage } from "@/components/game-page";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const iotd = await db.inventionOfTheDay.findUnique({
    where: { id: parseInt(id) },
    include: { invention: true },
  });
  if (!iotd) {
    return redirect(`/`, RedirectType.replace);
  }

  const session = await auth.api.getSession({ headers: await headers() });
  async function fetchGameResult() {
    if (!session || !iotd) return;

    return await db.result.findFirst({
      where: {
        user_id: session?.user.id,
        iotd_id: iotd.id,
      },
    });
  }
  const result = await fetchGameResult();

  return <GamePage iotd={iotd} gameResult={result} />;
}
