"server-only";
import { db } from "..";
import { getLongestStreak } from "../prisma/generated/sql";
import { getUserWithFriends } from "@/actions/server-only/friendship";

async function getUserStreaks(userId: string) {
  const [[longest], current] = await Promise.all([
    db.$queryRawTyped(getLongestStreak(userId)),
    db.result.findMany({
      where: { user_id: userId },
      select: { win: true, iotd_id: true },
      orderBy: {
        created_at: "desc",
      },
    }),
  ]);

  let count = 0;
  let lastIotdId = 0;
  for (const result of current) {
    lastIotdId = result.iotd_id + 1;
    if (result.win) {
      if (result.iotd_id !== lastIotdId - 1) {
        break;
      }
      count++;
    } else break;
  }
  return {
    longestStreak: longest?.streak ?? 0,
    currentStreak: count,
  };
}

export type UserStreaks = Awaited<ReturnType<typeof getUserStreaks>>;

export async function getAuthedUserStreaks(
  userId: string,
  sessionUserId?: string,
) {
  const user = await getUserWithFriends(userId);
  if (!user) throw new Error("User not found");

  if (!user.isPublic) {
    if (
      !user.friendIds.includes(sessionUserId ?? "") &&
      sessionUserId !== userId
    ) {
      throw new Error("Users not friends and user is not public");
    }
  }

  return await getUserStreaks(user.id);
}
