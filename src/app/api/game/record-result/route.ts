import { LocalGame } from "@/components/hooks/use-game-recorder";
import { db } from "@/db";
import { ResultCreateWithoutUserInput } from "@/db/prisma/generated/models";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface RecordResultRequest extends NextRequest {
  json(): Promise<LocalGame>;
}

export async function upsertGameResult(
  user: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>["user"],
  data: ResultCreateWithoutUserInput,
) {
  return db.result.upsert({
    where: {
      user_id_iotd_id: {
        user_id: user.id,
        iotd_id: data.iotd_id,
      },
    },
    create: { ...data, user_id: user.id },
    update: data,
  });
}

export async function PUT(req: RecordResultRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const data = await req.json();
  const resp = await upsertGameResult(session.user, {
    ...data,
    num_guesses: data.guesses.length,
  });

  return new NextResponse(JSON.stringify(resp), { status: 201 });
}
