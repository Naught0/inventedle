import { getServerSession } from "@/lib/auth";
import { notFound, redirect, RedirectType } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (!session?.user) notFound();

  redirect(`/stats/${session.user.id}`, RedirectType.replace);
}
