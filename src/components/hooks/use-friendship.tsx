"use client";
import { FriendStatus } from "@/db/prisma/generated/enums";
import { getFriendStatus, type getFriendship } from "@/db/server-only";
import { useQuery } from "@tanstack/react-query";
import { parse } from "superjson";

export function useFriendship({ userId }: { userId?: string | null }) {
  const { data, isLoading, refetch } = useQuery({
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
  const incoming = processFriends(
    data?.filter((f) => f.recipient.id === userId && f.status === "PENDING"),
    userId,
  );
  const outgoing = processFriends(
    data?.filter(
      (f) =>
        f.requester.id === userId && ["PENDING", "REJECTED"].includes(f.status),
    ),
    userId,
  );

  return {
    friends,
    incoming,
    outgoing,
    isLoading,
    refetch,
    deleteFriend,
    acceptFriend,
    rejectFriend,
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
        friendshipId: f.id,
        createdAt: f.createdAt,
        status: f.status,
      };
    }

    return {
      ...f.requester,
      friendshipId: f.id,
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

export async function deleteFriend(friendshipId: string) {
  return await fetch(`/api/user/friendship?id=${friendshipId}`, {
    method: "DELETE",
  });
}

export async function rejectFriend(friendshipId: string) {
  return await updateFriend(friendshipId, "REJECTED");
}

export async function acceptFriend(friendshipId: string) {
  return await updateFriend(friendshipId, "ACCEPTED");
}

export async function updateFriend(friendshipId: string, status: FriendStatus) {
  return await fetch(
    `/api/user/friendship?id=${friendshipId}&status=${status}`,
    {
      method: "PUT",
    },
  );
}

export type Friendships = Awaited<ReturnType<typeof getFriendship>>;
export type Friend = Friendships[number]["recipient"] & {
  friendshipId: string;
  createdAt: Date;
  status: Friendships[number]["status"];
};
