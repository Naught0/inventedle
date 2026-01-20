import { LocalGame } from "@/components/hooks/use-game-recorder";
import { db } from "@/db";
import { ResultCreateWithoutUserInput } from "@/db/prisma/generated/models";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { upsertGameResultUnlessComplete } from "../record-result/route";

interface RecordResultsRequest extends NextRequest {
  json(): Promise<LocalGame[]>;
}

export async function recordGame(
  user: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>["user"],
  data: ResultCreateWithoutUserInput[],
) {
  for (const result of data) {
    await upsertGameResultUnlessComplete(user, result);
  }
}

export async function POST(req: RecordResultsRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return new NextResponse("Unauthorized", { status: 401 });
  const data = await req.json();
  const toCreate = data.map((r) => ({
    ...r,
    num_guesses: r.guesses.length,
    user_id: session.user.id,
  }));
  const created = await db.result.createManyAndReturn({
    data: toCreate,
  });

  return new NextResponse(
    JSON.stringify({ data: created.map((r) => r.iotd_id) }),
    { status: 201 },
  );
}
