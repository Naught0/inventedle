import type { Metadata } from "next";
import { GoHomeButton } from "@/components/go-home-button";
import { ImportLocalGames } from "@/components/import-local-games";
import { Stack } from "@/components/ui/stack";
import { getServerSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Inventedle",
  description:
    "Import games played before you signed up or while you were signed out",
};

export default async function Page() {
  const session = await getServerSession();
  if (!session) {
    return (
      <Stack itemsCenter gap="gap-12">
        <h2 className="text-3xl font-extrabold">
          You must be signed in to import games
        </h2>
        <GoHomeButton />
      </Stack>
    );
  }

  return <ImportLocalGames userId={session.user.id} />;
}
