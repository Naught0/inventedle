"use client";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { makeFriendRequest } from "@/db/server-actions";
import { PiUserPlusFill } from "react-icons/pi";
import { useFriend } from "./hooks/use-friendship";

export function FriendButton({ recipientId }: { recipientId: string }) {
  const { friend, refetch } = useFriend({ friendId: recipientId });
  const [, submit, submitting] = useActionState(async () => {
    await makeFriendRequest({ recipientId });
    await refetch();
  }, undefined);
  return (
    <form action={submit}>
      {friend?.status !== "ACCEPTED" && (
        <Button variant="link" isLoading={submitting} disabled={!!friend}>
          <PiUserPlusFill className="text-2xl" />
          {!friend ? "Add Friend" : "Pending"}
        </Button>
      )}
    </form>
  );
}
