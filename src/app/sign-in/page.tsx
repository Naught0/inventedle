import { Stack } from "@/components/ui/stack";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <Stack className="justify-center">
      <h2 className="text-center text-5xl">Sign In</h2>
    </Stack>
  );
}
