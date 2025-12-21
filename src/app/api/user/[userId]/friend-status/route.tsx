import { getFriendStatus } from "@/actions/server-only";
import { getServerSession } from "@/lib/auth";
import { NextRequest } from "next/server";
import { stringify } from "superjson";

export async function GET(
  _: NextRequest,
  ctx: RouteContext<"/api/user/[userId]/friend-status">,
) {
  const { userId } = await ctx.params;
  const session = await getServerSession();
  if (!session) return new Response(JSON.stringify(null), { status: 401 });

  const friendStatus = await getFriendStatus(userId, session.user.id);
  return new Response(stringify(friendStatus), { status: 200 });
}
