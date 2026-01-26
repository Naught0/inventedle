import { Hyperlink } from "@/components/hyperlink";
import { LocalStatsPage } from "@/components/local-stats-page";
import { getServerSession } from "@/lib/auth";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (session?.user)
    redirect(`/stats/${session.user.id}`, RedirectType.replace);

  return (
    <div className="my-3 flex flex-col gap-6 text-center">
      <h2 className="text-center text-4xl font-extrabold">Local Stats</h2>
      <LocalStatsPage />
      <aside className="text-muted-foreground flex flex-col gap-2 text-center text-sm italic">
        <p>
          Your stats are only saved locally, which means you can&apos;t share
          them with others or yourself across devices
        </p>
        <p>
          <Hyperlink href="/sign-in" prefetch={false} target="_self">
            Sign in
          </Hyperlink>{" "}
          to save your stats &amp; compete with friends&mdash;you can import the
          games you&apos;ve already played
        </p>
      </aside>
    </div>
  );
}
