import { type LocalGame } from "@/components/hooks/use-game-recorder";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { upsertGameResult } from "../record-result/route";

interface RecordResultRequest extends NextRequest {
  json(): Promise<LocalGame>;
}

export async function PUT(req: RecordResultRequest) {
  const nextHeaders = await headers();
  const ip = nextHeaders.get("x-forwarded-for") || nextHeaders.get("x-real-ip");
  if (!ip) return new NextResponse("Unauthorized", { status: 401 });

  const data = await req.json();

  const resp = await upsertGameResult(null, {
    ...data,
    num_guesses: data.guesses.length,
    ip_address: ip,
  });

  return new NextResponse(JSON.stringify(resp), { status: 201 });
}
