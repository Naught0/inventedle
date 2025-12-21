import { getServerSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { FriendRequestForm } from "./friend-request-form";
import { getFriendStatus } from "@/actions/server-only";
import { Stack } from "@/components/ui/stack";
import { db } from "@/db";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const session = await getServerSession();
  if (!session) return redirect("/sign-in");

  const status = await getFriendStatus(session.user.id, userId);
  const friendUser = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, isPublic: true, image: true },
  });
  if (!friendUser) notFound();
  if (!friendUser.isPublic) {
    friendUser.image = null;
  }

  return (
    <Stack className="my-6 items-center text-center">
      <FriendRequestForm friendStatus={status} user={friendUser} />
    </Stack>
  );
}
