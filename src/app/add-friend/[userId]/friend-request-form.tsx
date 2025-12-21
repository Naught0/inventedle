"use client";
import { Button } from "@/components/ui/button";
import { makeFriendRequest } from "@/actions/server-actions";
import type { getFriendStatus } from "@/actions/server-only";
import { useActionState } from "react";
import { Stack } from "@/components/ui/stack";
import { Hyperlink } from "@/components/hyperlink";
import { UserModel } from "@/db/prisma/generated/models";
import Image from "next/image";

export function FriendRequestForm({
  user,
  friendStatus,
}: {
  user: Pick<UserModel, "id" | "isPublic" | "name" | "image">;
  friendStatus: Awaited<ReturnType<typeof getFriendStatus>> | null;
}) {
  const [state, formAction, isPending] = useActionState<Awaited<
    ReturnType<typeof makeFriendRequest>
  > | null>(async () => {
    return await makeFriendRequest({ recipientId: user.id });
  }, friendStatus);
  const isError = !!state && "error" in state;
  const error = isError ? state.message : null;
  const requestSent =
    !isError && state?.status === "PENDING" && user.id === state.recipientId;
  const disabled =
    isError || (!isError && state?.status === "ACCEPTED") || requestSent;
  const isAccepted = state && "status" in state && state.status === "ACCEPTED";
  const userHyperlink = (
    <Hyperlink href={`/stats/${user.id}`}>{user.name}</Hyperlink>
  );
  const title = isAccepted ? (
    <span>You&apos;re friends with {userHyperlink}</span>
  ) : (
    <span>
      Add{" "}
      {user.isPublic ? (
        userHyperlink
      ) : (
        <span className="text-muted-foreground">{user.name}</span>
      )}{" "}
      as a friend
    </span>
  );

  return (
    <form action={formAction}>
      <Stack className="gap-6" center>
        {user.image && (
          <Image
            src={user.image}
            width={128}
            height={128}
            alt={`${user.name} profile picture`}
            className="border-muted-foreground rounded-full border-2"
          />
        )}
        <h2 className="text-center text-3xl">{title}</h2>
        <Button
          type="submit"
          isLoading={isPending}
          disabled={disabled}
          className="w-fit"
        >
          {requestSent ? "Request Sent" : "Send Request"}
        </Button>
        {error && (
          <p className="text-muted-foreground my-6 text-3xl">{error}</p>
        )}
      </Stack>
    </form>
  );
}
