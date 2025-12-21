import { getIOTDFriendStats } from "@/actions/server-only";
import { getServerSession } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/game/[id]/stats/friends">,
) {
  const params = await ctx.params;
  if (!params?.id) return new Response(null, { status: 400 });
  const session = await getServerSession();
  if (!session) return new Response(null, { status: 401 });

  const stats = await getIOTDFriendStats(parseInt(params.id), session.user.id);
  return new Response(JSON.stringify(stats));
}
