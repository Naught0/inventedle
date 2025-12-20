"use client";
import { type Friend, useFriendship } from "@/components/hooks/use-friendship";
import { SessionWithUser } from "@/lib/auth";
import { SectionHeading } from "./section-heading";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Stack } from "@/components/ui/stack";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { PiXBold } from "react-icons/pi";
import { Hyperlink } from "@/components/hyperlink";

export function FriendsSection({ session }: { session: SessionWithUser }) {
  const {
    outgoing,
    incoming,
    friends,
    isLoading,
    refetch,
    deleteFriend,
    acceptFriend,
    rejectFriend,
  } = useFriendship({
    userId: session?.user.id,
  });

  return (
    <>
      <SectionHeading>
        Friends
        <Button
          title={"Refresh friends"}
          aria-label={"Refresh friends"}
          variant={"link"}
          size={"icon"}
          type="button"
          onClick={() => refetch()}
        >
          <RefreshCw
            size={18}
            className={isLoading ? "animate-spin" : "hover:animate-spin"}
          />
        </Button>
      </SectionHeading>
      <div className="relative flex w-full flex-col items-start gap-6 py-3">
        {isLoading && <LoadingOverlay />}
        <Section>
          <h3 className="mb-2 text-xl font-bold">Sent</h3>
          {outgoing.map((f) => (
            <Friend key={f.id} data={f}>
              <Button
                size={"sm"}
                onClick={() => {
                  deleteFriend(f.friendshipId);
                  refetch();
                }}
              >
                Cancel
              </Button>
            </Friend>
          ))}
        </Section>
        <Section>
          <h3 className="mb-2 text-xl font-bold">Incoming</h3>
          {incoming.map((f) => (
            <Friend key={f.id} data={f}>
              <Stack className="gap-1" horizontal>
                <Button
                  size={"sm"}
                  onClick={() => {
                    acceptFriend(f.friendshipId).then(() => refetch());
                  }}
                >
                  Accept
                </Button>
                <Button
                  size={"sm"}
                  onClick={() => {
                    rejectFriend(f.friendshipId).then(() => refetch());
                  }}
                >
                  Decline
                </Button>
              </Stack>
            </Friend>
          ))}
        </Section>
        <Section>
          <h3 className="mb-2 text-xl font-bold">
            Friends {friends?.length ? `(${friends.length})` : ""}
          </h3>
          {friends.map((f) => (
            <Friend key={f.id} data={f}>
              <Button
                size={"sm"}
                className="aspect-square rounded-md"
                onClick={() => {
                  deleteFriend(f.friendshipId);
                  refetch();
                }}
              >
                <PiXBold strokeWidth={20} />
              </Button>
            </Friend>
          ))}
        </Section>
      </div>
    </>
  );
}

function Section({ children }: PropsWithChildren) {
  return <div className="flex w-full flex-grow flex-col gap-2">{children}</div>;
}

export function Friend({
  data,
  children,
}: {
  data: Friend;
  children?: React.ReactNode;
}) {
  return (
    <Stack
      className="bg-accent w-fit flex-wrap items-center gap-3 rounded-md px-4 py-2 text-sm"
      horizontal
    >
      {data.image && (
        <Image
          src={data.image}
          width={32}
          height={32}
          alt={`${data.name} profile picture`}
          className="rounded-full"
        />
      )}
      <div className="flex flex-col">
        <Hyperlink href={`/stats/${data.id}`}>
          <span>{data.name}</span>
        </Hyperlink>
        <time className="text-muted-foreground text-xs italic">
          <span>{data.status === "ACCEPTED" ? "since " : "on "}</span>
          {format(data.createdAt, "yyyy-MM-dd")}
        </time>
      </div>
      {children}
    </Stack>
  );
}
