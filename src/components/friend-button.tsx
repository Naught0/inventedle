"use client";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { makeFriendRequest } from "@/db/server-actions";
import { PiUserPlusFill } from "react-icons/pi";
import { FriendshipModel } from "@/db/prisma/generated/models";

// TODO: Persist disabled button if already requested
// TODO: Remove button if already friends
export function FriendButton({
  recipientId,
  request,
}: {
  recipientId: string;
  request?: FriendshipModel | null;
}) {
  const [, submit, submitting] = useActionState(async () => {
    if (request) return;

    try {
      await makeFriendRequest({ recipientId });
      alert("Friend request sent!");
    } catch {
      console.error("Unable to send friend request");
    }
  }, undefined);

  return (
    <form action={submit}>
      <Button variant="link" isLoading={submitting} disabled={!!request}>
        <PiUserPlusFill className="text-2xl" />
        {["PENDING", "REJECTED"].includes(request?.status ?? "")
          ? "Requested"
          : "Add friend"}
      </Button>
    </form>
  );
}
