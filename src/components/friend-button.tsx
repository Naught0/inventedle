"use client";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { makeFriendRequest } from "@/db/server-actions";
import { PiUserPlusFill } from "react-icons/pi";
import { useFriend } from "./hooks/use-friendship";
import { format } from "date-fns";
import { Stack } from "./ui/stack";

export function FriendButton({ recipientId }: { recipientId: string }) {
  const { friend, refetch } = useFriend({ friendId: recipientId });
  const [, submit, submitting] = useActionState(async () => {
    await makeFriendRequest({ recipientId });
    await refetch();
  }, undefined);
  const [_, remove, removing] = useActionState(async () => {
    await fetch(`/api/user/${recipientId}/friend`, { method: "DELETE" });
    await refetch();
  });
  return (
    <form action={submit}>
      {friend?.status !== "ACCEPTED" && (
        <Button variant="link" isLoading={submitting} disabled={!!friend}>
          <PiUserPlusFill className="text-2xl" />
          {friend?.status === "PENDING" ? "Pending" : "Add Friend"}
        </Button>
      )}
      {friend?.status === "ACCEPTED" && (
        <Stack>
          Friends since {format(friend.createdAt, "yyyy-MM-dd")}
          <Button type="button" variant="link" isLoading={submitting}>
            remove friend
          </Button>
        </Stack>
      )}
    </form>
  );
}
