import { UserStats } from "@/components/user-stats";
import { getUserGameStats } from "@/db/server-only";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  const stats = session?.user.id
    ? await getUserGameStats(session.user.id)
    : undefined;

  return <UserStats session={session} serverStats={stats} />;
}
