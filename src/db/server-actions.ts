"use server";
import { auth, getServerSession, SessionWithUser } from "@/lib/auth";
import { headers as nextHeaders } from "next/headers";
import { db } from ".";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

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
  if (!session) throw new Error("User not authenticated");
  if (session.user.id === recipientId)
    throw new Error("You can't friend yourself.");

  try {
    return await db.friendship.create({
      data: {
        recipientId,
        requesterId: session.user.id,
        status: "PENDING",
      },
    });
  } catch {
    throw new Error("Error adding friend :(");
  }
}
