import { LocalGame } from "@/components/game-recorder";
import { db } from "@/db";
import { GameResultCreateInput } from "@/db/prisma/generated/models";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface RecordResultRequest extends NextRequest {
  json(): Promise<LocalGame>;
}

export async function createGameResult(data: GameResultCreateInput) {
  return db.gameResult.create({ data });
}

export async function POST(req: RecordResultRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Not authenticated");

  const data = await req.json();
  const resp = await createGameResult({
    ...data,
    user_id: session.user.id,
    num_guesses: data.guesses.length,
  });

  return new NextResponse(JSON.stringify(resp), { status: 201 });
}
