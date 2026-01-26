"use client";
import type { SessionWithUser } from "@/lib/auth";
import { GuessStatsChart } from "./charts/guess-stats-chart";
import { StatCard } from "./ui/stat-card";
import type { Stats } from "@/actions/server-only";
import { Stack } from "./ui/stack";
import Image from "next/image";
import { Hyperlink } from "./hyperlink";
import { PiShareFatFill } from "react-icons/pi";
import { CopyButton } from "./ui/copy-button";
import { FriendshipModel } from "@/db/prisma/generated/models";
import { FriendButton } from "./friend-button";
import {
  calculateAverageGuesses,
  calculateTotalGuesses,
  getTotalWins,
} from "@/lib/stats";
import { useDefaultSession } from "./hooks/useDefaultSession";
import { UserStreaks } from "@/db/accolades/streak";

export function UserStatsPage({
  user,
  stats,
  showPrivateUserBanner,
  streaks,
}: {
  user: SessionWithUser["user"];
  stats: Stats;
  streaks?: UserStreaks | null;
  showPrivateUserBanner?: boolean;
  friendRequest?: FriendshipModel | null;
}) {
  const { session: loginSession } = useDefaultSession();
  const totalGames = Object.values(stats).reduce((a, b) => a + b, 0);
  const totalWins = getTotalWins(stats);
  const totalLosses = stats["X"];
  return (
    <article className="flex w-full flex-col items-center justify-center">
      <Stack className="mb-6 flex-col items-center gap-1">
        {user?.image && (
          <Image
            alt="profile picture"
            src={user.image}
            className="rounded-full"
            height={128}
            width={128}
          />
        )}
        <Stack className="items-center gap-3">
          <h2 className="text-accent-foreground text-center text-3xl font-bold">
            {user.name}&apos;s Stats
          </h2>
          {showPrivateUserBanner ? (
            <Stack className="text-muted-foreground text-center text-sm">
              <p className="text-muted-foreground text-sm">
                Only you &amp; your friends can see this page
              </p>
              <p>
                <Hyperlink href="/profile">
                  If you want to share your stats with anyone, change your
                  privacy settings here
                </Hyperlink>
              </p>
            </Stack>
          ) : (
            <Stack className="flex-col-reverse flex-wrap items-center justify-center gap-3 md:flex-row">
              <CopyButton
                value={
                  typeof window !== "undefined" ? window.location.href : ""
                }
                className="bg-accent hover:bg-accent/80 inline-flex w-fit items-center gap-2"
                icon={<PiShareFatFill />}
                variant={"outline"}
              >
                Share
              </CopyButton>
              {!!loginSession &&
                user?.id !== loginSession.user.id &&
                user?.id && <FriendButton recipientId={user.id} />}
            </Stack>
          )}
        </Stack>
      </Stack>
      <UserStatsSection
        totalWins={totalWins}
        totalLosses={totalLosses}
        totalGames={totalGames}
        gameStats={stats}
        streaks={streaks}
      />
    </article>
  );
}

export function UserStatsSection({
  totalWins,
  totalLosses,
  totalGames,
  gameStats: stats,
  streaks,
}: {
  totalWins: number;
  totalLosses: number;
  totalGames: number;
  gameStats: Stats;
  streaks?: UserStreaks | null;
}) {
  return (
    <div className="my-3 flex flex-col items-center gap-3">
      {streaks && <Streaks streaks={streaks} />}
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-grow flex-wrap justify-center gap-3">
          <StatCard title={"Games"}>
            <span>{totalWins}W</span>/<span>{totalLosses}L</span>
          </StatCard>
          <StatCard title={"Win %"}>
            {Intl.NumberFormat().format(
              Math.round((totalWins / totalGames) * 100),
            )}
            %
          </StatCard>
          <StatCard title={"Total Guesses"}>
            {calculateTotalGuesses(stats)}
          </StatCard>
          <StatCard title={"Avg. Guesses to Win"}>
            {calculateAverageGuesses(stats)}
          </StatCard>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <GuessStatsChart title={"Game Results"} numGuesses={stats} />
      </div>
    </div>
  );
}

function Streaks({ streaks }: { streaks: UserStreaks }) {
  return (
    <Stack horizontal className="flex-wrap">
      <StatCard title="Current Streak">{streaks.currentStreak}</StatCard>
      <StatCard title="Longest Streak">{streaks.longestStreak}</StatCard>
    </Stack>
  );
}
