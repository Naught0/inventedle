"server-only";
import { SessionWithUser } from "@/lib/auth";
import { db } from "..";
import { getLongestStreak, getCurrentStreak } from "../prisma/generated/sql";
import { getUserWithFriends } from "@/actions/server-only/friendship";

async function getUserStreaks(userId: string) {
  const [[longest], [current]] = await Promise.all([
    db.$queryRawTyped(getLongestStreak(userId)),
    db.$queryRawTyped(getCurrentStreak(userId)),
  ]);
  return {
    longestStreak: Number(longest?.streak ?? 0),
    currentStreak: Number(current?.streak ?? 0),
  };
}

export type UserStreaks = Awaited<ReturnType<typeof getUserStreaks>>;

export async function getAuthedUserStreaks(
  userId: string,
  session?: SessionWithUser | null,
) {
  const user = await getUserWithFriends(userId);
  if (!user) throw new Error("User not found");

  if (!user.isPublic) {
    if (
      !user.friendIds.includes(session?.user.id ?? "") &&
      session?.user?.id !== userId
    ) {
      throw new Error("Users not friends and user is not public");
    }
  }

  return await getUserStreaks(user.id);
}
