"use client";
import { type Friend, useFriendship } from "@/components/hooks/use-friendship";
import { SessionWithUser } from "@/lib/auth";
import { SectionHeading } from "./section-heading";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Stack } from "@/components/ui/stack";
import Image from "next/image";
import { PropsWithChildren } from "react";

export function FriendsSection({ session }: { session: SessionWithUser }) {
  const { outgoing, pending, friends, isLoading } = useFriendship({
    userId: session?.user.id,
  });

  return (
    <>
      <SectionHeading>Friends</SectionHeading>
      <div className="relative flex w-full flex-col items-start gap-6 px-1 py-3">
        {isLoading && <LoadingOverlay />}
        <Section>
          <h3 className="text-xl font-bold">Sent</h3>
          {outgoing.map((f) => (
            <Friend key={f.id} data={f}></Friend>
          ))}
        </Section>
        <Section>
          <h3 className="text-xl font-bold">Incoming</h3>
          {pending.map((f) => (
            <Friend key={f.id} data={f}></Friend>
          ))}
        </Section>
        <Section>
          <h3 className="text-xl font-bold">
            Friends {friends?.length ? `(${friends.length})` : ""}
            {friends.map((f) => (
              <Friend key={f.id} data={f}></Friend>
            ))}
          </h3>
        </Section>
      </div>
    </>
  );
}

function Section({ children }: PropsWithChildren) {
  return <div className="flex w-full flex-grow flex-col gap-2">{children}</div>;
}

export function Friend({ data }: { data: Friend; children?: React.ReactNode }) {
  return (
    <Stack className="items-center" horizontal>
      {data.image && (
        <Image
          src={data.image}
          width={32}
          height={32}
          alt={`${data.name} profile picture`}
          className="rounded-full"
        />
      )}
      <span>{data.name}</span>
      <span>{data.status === "ACCEPTED" ? "since" : "at"}</span>
      <time>{typeof data.createdAt}</time>
    </Stack>
  );
}
