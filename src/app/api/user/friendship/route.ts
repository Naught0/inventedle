import { getFriendship } from "@/db/server-only";
import { getServerSession } from "@/lib/auth";
import { stringify } from "superjson";

export async function GET() {
  const session = await getServerSession();
  if (!session) return new Response(null, { status: 401 });

  const ret = stringify(await getFriendship(session.user.id));
  return new Response(ret, { status: 200 });
}
