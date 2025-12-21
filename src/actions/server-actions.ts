"use server";
import { auth, getServerSession, SessionWithUser } from "@/lib/auth";
import { headers as nextHeaders } from "next/headers";
import { db } from "@/db";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { getFriendStatus } from "@/actions/server-only";
import { updateFriendStatus } from "@/actions/server-only/friendship";

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
  headers,
}: {
  recipientId: string;
  headers?: ReadonlyHeaders;
}) {
  const session = await getServerSession({ headers });
  if (!session) return { error: true, message: "You must be signed in." };
  if (session.user.id === recipientId)
    return { error: true, message: "You can't friend yourself." };

  const friendStatus = await getFriendStatus(session.user.id, recipientId);

  if (friendStatus) {
    switch (friendStatus.status) {
      case "PENDING":
        if (friendStatus.recipientId === session.user.id) {
          return await updateFriendStatus(friendStatus.id, "ACCEPTED");
        }
        break;
      case "ACCEPTED":
        return { error: true, message: "You're already friends (:" };
      default:
        break;
    }
  }

  try {
    return await db.friendship.create({
      data: {
        recipientId,
        requesterId: session.user.id,
        status: "PENDING",
      },
    });
  } catch (e) {
    console.error(e);
    return { error: true, message: "Friend request failed" };
  }
}
