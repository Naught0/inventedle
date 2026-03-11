import { getIOTDStats } from "@/actions/server-only";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  ctx: RouteContext<"/api/game/[id]/stats">,
) {
  const params = await ctx.params;
  if (!params?.id) return new Response(null, { status: 400 });

  const stats = await getIOTDStats(parseInt(params.id));
  return new Response(JSON.stringify(stats));
}
