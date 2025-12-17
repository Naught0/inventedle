"use server";
import { auth, getServerSession, SessionWithUser } from "@/lib/auth";
import { headers as nextHeaders } from "next/headers";
import { db } from ".";

export async function updateUser(
  user: Pick<
    NonNullable<SessionWithUser>["user"],
    "id" | "image" | "name" | "isPublic"
  >,
) {
  const headers = await nextHeaders();
  const session = await getServerSession({ headers });
  if (!session) return null;
  if (session.user.id !== user.id) return null;

  await auth.api.updateUser({ body: user, headers });
}

export async function makeFriendRequest({
  recipientId,
}: {
  recipientId: string;
}) {
  const session = await getServerSession();
  if (!session) throw new Error("User not authenticated");
  if (session.user.id === recipientId)
    throw new Error("You can't friend yourself.");

  return await db.friendship.create({
    data: {
      recipientId,
      requesterId: session.user.id,
      status: "PENDING",
    },
  });
}

export async function acceptFriendRequest({
  requesterId,
}: {
  requesterId: string;
}) {
  const session = await getServerSession();
  if (!session) throw new Error("User not authenticated");

  return await db.friendship.update({
    where: {
      requesterId_recipientId: {
        recipientId: session.user.id,
        requesterId,
      },
    },
    data: {
      status: "ACCEPTED",
    },
  });
}
