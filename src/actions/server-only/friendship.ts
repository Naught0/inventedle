import { db } from "@/db";
import { FriendStatus } from "@/db/prisma/generated/enums";

export async function updateFriendStatus(id: string, status: FriendStatus) {
  return await db.friendship.update({
    where: { id },
    data: { status },
  });
}
