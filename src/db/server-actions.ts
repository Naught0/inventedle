"use server";
import { auth, getServerSession, SessionWithUser } from "@/lib/auth";
import { headers as nextHeaders } from "next/headers";

export async function updateUser(
  user: Pick<NonNullable<SessionWithUser>["user"], "id" | "image" | "name">,
) {
  const headers = await nextHeaders();
  const session = await getServerSession({ headers });
  if (!session) return null;
  if (session.user.id !== user.id) return null;

  return await auth.api.updateUser({ body: user, headers });
}
