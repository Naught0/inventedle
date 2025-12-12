import { getIOTDStats } from "@/db/actions";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/game/[id]/stats">,
) {
  const params = await ctx.params;
  const stats = await getIOTDStats(parseInt(params.id));
  return new Response(JSON.stringify(stats));
}
