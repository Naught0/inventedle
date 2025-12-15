import { UserStats } from "@/components/user-stats";
import { db } from "@/db";
import { getUserGameStats } from "@/db/server-only";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user?.isPublic) notFound();

  const stats = await getUserGameStats(userId);
  if (!stats) notFound();

  return <UserStats user={user} stats={stats} />;
}
