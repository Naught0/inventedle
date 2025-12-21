"use client";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { PiUserPlusFill } from "react-icons/pi";
import { useFriend } from "./hooks/use-friendship";
import { makeFriendRequest } from "@/actions/server-actions";

export function FriendButton({ recipientId }: { recipientId: string }) {
  const { friend: friendship, refetch } = useFriend({ friendId: recipientId });
  const [, submit, submitting] = useActionState(async () => {
    const resp = await makeFriendRequest({ recipientId });
    await refetch();
    return resp;
  }, null);
  const isError = !!friendship && "error" in friendship;
  const isRecipient = friendship?.requesterId === recipientId;
  const isPendingAccept = friendship?.status === "PENDING" && !isRecipient;
  return (
    <form action={submit}>
      {!isError && friendship?.status !== "ACCEPTED" && (
        <Button
          variant="link"
          isLoading={submitting}
          disabled={isError || isPendingAccept}
        >
          <PiUserPlusFill className="text-2xl" />
          {isPendingAccept ? "Pending" : "Add Friend"}
        </Button>
      )}
    </form>
  );
}
