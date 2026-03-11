import { getIOTD } from "@/db/actions";
import { createRateLimiter } from "@/lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";

const rateLimiter = createRateLimiter({ limit: 1, window: 10 });

const handler = rateLimiter.wrapHandler(async () => {
  const currentIotd = await getIOTD();
  if (!currentIotd) {
    return NextResponse.json({ message: "No IOTD found" }, { status: 404 });
  }

  return NextResponse.json({
    id: currentIotd.id,
    created_at: currentIotd?.created_at,
    invention: currentIotd.invention.name,
  });
});

export async function GET(req: NextRequest) {
  const handle = await handler;
  return await handle(req);
}
