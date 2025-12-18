import { getServerSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { UserSettingsForm } from "./user-settings-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getServerSession();
  if (!session) notFound();

  return (
    <div className="flex w-full max-w-screen-sm flex-col">
      <UserSettingsForm />
    </div>
  );
}
