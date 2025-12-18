import { getFriendship } from "@/db/server-only";
import { getServerSession } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession();
  if (!session) return new Response(null, { status: 401 });

  return new Response(JSON.stringify(await getFriendship(session.user.id)));
}
