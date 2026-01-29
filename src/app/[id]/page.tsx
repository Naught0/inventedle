import { GamePage } from "@/components/game-page";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { generateIOTDMeta } from "@/actions/server-only";
import { InventionOfTheDayGetPayload } from "@/db/prisma/generated/models";

export const dynamic = "force-dynamic";

async function meta({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return await generateIOTDMeta(parseInt(id));
}

export const generateMetadata = meta;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    console.error("Go no ID on app/[id]/page");
    return redirect(`/`, RedirectType.replace);
  }
  let iotd: InventionOfTheDayGetPayload<{
    include: { invention: true };
  }> | null;
  try {
    iotd = await db.inventionOfTheDay.findUnique({
      where: { id: parseInt(id) },
      include: { invention: true },
    });
  } catch {
    console.error("Prisma Error: No IOTD found for ID", id);
    return redirect(`/`, RedirectType.replace);
  }

  if (!iotd) {
    console.error("No IOTD found for ID", id);
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
