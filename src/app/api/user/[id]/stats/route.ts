import { getUserStats } from "@/db/server-only";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  ctx: RouteContext<"/api/user/[id]/stats">,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return new Response(null, { status: 401 });

  const { id } = await ctx.params;
  if (id) return new Response(null, { status: 400 });

  // TODO: OR if session.user.hasPublicProfile, return the response or something
  if (session.user.id !== id) return new Response(null, { status: 404 });

  return new Response(JSON.stringify(await getUserStats(id)));
}
