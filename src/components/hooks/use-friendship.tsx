"use client";
import { getFriendStatus, type getFriendship } from "@/db/server-only";
import { useQuery } from "@tanstack/react-query";
import { parse } from "superjson";

export function useFriendship({ userId }: { userId?: string | null }) {
  const { data, isLoading } = useQuery({
    queryKey: ["friendship", userId],
    queryFn: async () => {
      const data = await fetchAllFriendships();
      return data;
    },
    enabled: !!userId,
  });
  const friends: Friend[] = processFriends(
    data?.filter((f) => f.status === "ACCEPTED"),
    userId,
  );
  const pending = processFriends(
    data?.filter((f) => f.recipient.id === userId && f.status === "PENDING"),
    userId,
  );
  const outgoing = processFriends(
    data?.filter((f) => f.requester.id === userId && f.status === "PENDING"),
    userId,
  );

  return {
    friends,
    pending,
    outgoing,
    isLoading,
  };
}

export function useFriend({
  friendId,
  enabled,
}: {
  friendId: string;
  enabled?: boolean;
}) {
  const { data, isPending, refetch } = useQuery({
    enabled,
    queryKey: ["useFriend", friendId],
    queryFn: async () => {
      const data = await fetchFriendshipStatus(friendId);
      return data;
    },
    throwOnError(error, query) {
      console.error(error);
      return false;
    },
  });

  return { friend: data, isPending, refetch };
}

function processFriends(
  friendships: Friendships | undefined,
  userId: string | null | undefined,
): Friend[] {
  if (!friendships || !userId) return [];

  return friendships.map((f) => {
    if (f.recipient.id !== userId) {
      return {
        ...f.recipient,
        createdAt: f.createdAt,
        status: f.status,
      };
    }

    return {
      ...f.requester,
      createdAt: f.createdAt,
      status: f.status,
    };
  });
}

export async function fetchAllFriendships() {
  const resp = await (
    await fetch(`/api/user/friendship`, { method: "GET" })
  ).text();

  const parsed = parse(resp);
  return parsed as Friendships;
}

export async function fetchFriendshipStatus(recipientId: string) {
  const resp = await (
    await fetch(`/api/user/${recipientId}/friend-status`, { method: "GET" })
  ).text();
  const parsed = parse<ReturnType<typeof getFriendStatus>>(resp);
  return parsed;
}

export type Friendships = Awaited<ReturnType<typeof getFriendship>>;
export type Friend = Friendships[number]["recipient"] & {
  createdAt: Date;
  status: Friendships[number]["status"];
};
