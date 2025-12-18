import { type getFriendship } from "@/db/server-only";
import { useQuery } from "@tanstack/react-query";

export function useFriendship({ userId }: { userId?: string | null }) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["friendship", userId],
    queryFn: fetchFriendship,
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!userId,
  });
  const friends = data?.filter((f) => f.status === "ACCEPTED");
  const pending = data?.filter(
    (f) => f.recipient.id === userId && f.status === "PENDING",
  );
  const outgoing = data?.filter(
    (f) => f.requester.id === userId && f.status === "PENDING",
  );
  return {
    friends,
    pending,
    outgoing,
    isLoading,
    refetch,
  };
}

export async function fetchFriendship() {
  return (await (
    await fetch(`/api/user/friendship`, { method: "GET" })
  ).json()) as ReturnType<typeof getFriendship>;
}
