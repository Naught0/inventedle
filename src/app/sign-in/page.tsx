import { DiscordButton } from "@/components/ui/discord-button";
import { GoogleButton } from "@/components/ui/google-button";
import { Stack } from "@/components/ui/stack";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <Stack className="xs:px-12 xs:py-6 bg-accent h-fit justify-start rounded-lg px-3 shadow">
      <h2 className="xs:text-5xl mb-6 text-center text-4xl font-extrabold">
        Sign in with
      </h2>
      <Stack className="gap-6">
        <DiscordButton className="text-2xl" variant="outline" />
        <GoogleButton className="text-2xl" variant="outline" />
      </Stack>
    </Stack>
  );
}
