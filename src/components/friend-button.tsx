"use client";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { makeFriendRequest } from "@/db/server-actions";
import { PiUserMinusFill, PiUserPlusFill } from "react-icons/pi";
import { deleteFriend, useFriend } from "./hooks/use-friendship";
import { Stack } from "./ui/stack";

export function FriendButton({ recipientId }: { recipientId: string }) {
  const { friend, refetch } = useFriend({ friendId: recipientId });
  const [, submit, submitting] = useActionState(async () => {
    await makeFriendRequest({ recipientId });
    await refetch();
  }, undefined);
  const [, remove, removing] = useActionState(async () => {
    if (!friend) return;
    await deleteFriend(friend.id);
    await refetch();
  }, null);
  const loading = submitting || removing;
  return (
    <form action={submit}>
      {friend?.status !== "ACCEPTED" && (
        <Button variant="link" isLoading={loading} disabled={!!friend}>
          <PiUserPlusFill className="text-2xl" />
          {!friend ? "Add Friend" : "Pending"}
        </Button>
      )}
      {friend?.status === "ACCEPTED" && (
        <Stack className="gap-0">
          <Button
            type="button"
            variant="link"
            isLoading={submitting}
            onClick={remove}
          >
            <PiUserMinusFill className="text-2xl" />
            remove friend
          </Button>
        </Stack>
      )}
    </form>
  );
}
