"server-only";
import { db } from "@/db";
import { FriendStatus } from "@/db/prisma/generated/enums";

export async function updateFriendStatus(id: string, status: FriendStatus) {
  return await db.friendship.update({
    where: { id },
    data: { status },
  });
}

export async function getUserWithFriends(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      friendRequestsSent: {
        select: {
          recipientId: true,
        },
        where: {
          status: "ACCEPTED",
        },
      },
      friendRequestsReceived: {
        select: { requesterId: true },
        where: {
          status: "ACCEPTED",
        },
      },
    },
  });
  if (!user) return user;

  const { friendRequestsSent, friendRequestsReceived, ...userSansRequests } =
    user;

  return {
    ...userSansRequests,
    friendIds: [
      ...friendRequestsSent.map((f) => f.recipientId),
      ...friendRequestsReceived.map((f) => f.requesterId),
    ],
  };
}
