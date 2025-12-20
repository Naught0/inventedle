import { buttonVariants } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { makeFriendRequest } from "@/db/server-actions";
import { getFriendStatus } from "@/db/server-only";
import { getServerSession } from "@/lib/auth";
import { headers as nextHeaders } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const headers = await nextHeaders();
  const session = await getServerSession({ headers });
  if (!session) {
    return redirect("/sign-in");
  }

  try {
    await makeFriendRequest({ recipientId: userId, headers });
    return (
      <h2 className="text-status-error-foreground text-3xl">
        Friend request sent
      </h2>
    );
  } catch (e) {
    let message = "";
    const status = await getFriendStatus(session.user.id, userId);
    if (status) {
      switch (status.status) {
        case "PENDING":
          message = "Friend request already sent";
          break;
        case "ACCEPTED":
          message = "You're already friends!";
          break;
        case "REJECTED":
          message = "Friend request already sent";
          break;
      }
    }
    return (
      <Stack className="items-center justify-center gap-6">
        <p className="text-status-error-foreground text-3xl">
          {message && message}
          {!message && e instanceof Error && e.message}
        </p>
        <Link
          href={"/profile"}
          className={buttonVariants({ className: "w-fit" })}
        >
          Back to profile
        </Link>
      </Stack>
    );
  }
}
