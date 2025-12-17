import { UserStats } from "@/components/user-stats";
import { db } from "@/db";
import { getUserGameStats } from "@/db/server-only";
import { getServerSession } from "@/lib/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> => {
  const { userId } = await params;
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user?.isPublic)
    return {
      title: "Inventedle",
      description: "User not found",
      openGraph: {
        url: "/",
      },
    };

  const totalWins = await db.result.count({
    where: {
      user_id: userId,
      win: true,
    },
  });

  const images = [{ url: user.image ?? "" }];

  return {
    title: "Inventedle",
    description: `${user.name}'s Stats - ${totalWins} win${totalWins === 1 ? "" : "s"}`,
    twitter: {
      card: "summary",
    },
    openGraph: {
      url: `https://inventedle.jamese.dev/stats/${user.id}`,
      images,
    },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) notFound();

  const session = await getServerSession();
  if (session?.user.id !== userId) {
    if (!user.isPublic) notFound();
  }
  const friendRequest = session?.user.id
    ? await db.friendship.findUnique({
        where: {
          requesterId_recipientId: {
            requesterId: session?.user.id,
            recipientId: user.id,
          },
        },
      })
    : null;

  const stats = await getUserGameStats(userId);
  if (!stats) notFound();

  return (
    <UserStats
      loginSession={session}
      friendRequest={friendRequest}
      user={user}
      stats={stats}
      showPrivateUserBanner={session?.user.id === user.id && !user.isPublic}
      showAddFriendButton={session?.user.id !== user.id}
    />
  );
}
