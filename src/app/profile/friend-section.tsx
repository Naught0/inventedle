import { useFriendship } from "@/components/hooks/use-friendship";
import { SessionWithUser } from "@/lib/auth";

export function FriendsSection({ session }: { session: SessionWithUser }) {
  useFriendship({
    userId: session?.user.id,
  });

  return null;
}
