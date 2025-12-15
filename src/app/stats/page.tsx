import { UserStats } from "@/components/user-stats";
import { getUserGameStats } from "@/db/server-only";
import { getServerSession } from "@/lib/auth";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getServerSession();
  const user = session?.user;
  const stats = session?.user.id
    ? await getUserGameStats(session.user.id)
    : undefined;
  if (!stats) notFound();

  return <UserStats user={user} stats={stats} />;
}
