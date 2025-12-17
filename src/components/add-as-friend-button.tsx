"use client";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { makeFriendRequest } from "@/db/server-actions";
import { PiUserPlusFill } from "react-icons/pi";

// TODO: Persist disabled button if already requested
// TODO: Remove button if already friends
export function AddAsFriendButton({ recipientId }: { recipientId: string }) {
  const [submitted, submit, submitting] = useActionState(async () => {
    const resp = await makeFriendRequest({ recipientId });
    if (resp) {
      alert("Friend request sent!");
      return true;
    } else {
      return false;
    }
  }, false);
  return (
    <form action={submit}>
      <Button variant="link" isLoading={submitting} disabled={submitted}>
        <PiUserPlusFill className="text-2xl" />
        {submitted ? "Requested" : "Add friend"}
      </Button>
    </form>
  );
}
