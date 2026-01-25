"use client";
import { signOut } from "@/lib/auth-client";
import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  PiChartBarHorizontalFill,
  PiSignInFill,
  PiSignOutBold,
  PiUserGearFill,
} from "react-icons/pi";
import { CgSpinnerAlt } from "react-icons/cg";
import Link from "next/link";
import { Stack } from "./ui/stack";
import { useRouter } from "next/navigation";
import { DiscordButton } from "./ui/discord-button";
import { GoogleButton } from "./ui/google-button";
import { useFriendship } from "./hooks/use-friendship";
import { cn } from "@/lib/utils";
import { useMissingResultsToImport } from "./hooks/use-backfill-results";
import { ImportLocalGamesLink } from "./import-local-games-btn";
import { useDefaultSession } from "./hooks/useDefaultSession";

function MenuItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "border-muted-foreground menu-item border-white py-2",
        className,
      )}
    >
      {children}
    </li>
  );
}

function Menu({
  signedIn,
  userId,
  friendRequests,
  gamesToImport,
}: {
  signedIn: boolean;
  gamesToImport?: number;
  userId?: string;
  friendRequests?: number;
}) {
  const children = [];
  const router = useRouter();

  if (signedIn) {
    children.push(
      <MenuItem key="stats">
        <Link
          className={buttonVariants({
            variant: "ghost",
            className: "inline-flex w-full items-center gap-2",
          })}
          href={`/stats/${userId}`}
          prefetch={false}
        >
          <PiChartBarHorizontalFill className="text-2xl" />
          Stats
        </Link>
      </MenuItem>,
      <MenuItem key="profile" className="relative">
        {!!friendRequests && (
          <Stack
            className="bg-primary absolute right-1 top-3 size-5 rounded-full"
            center
          >
            <span className="text-primary-foreground text-sm font-extrabold">
              {friendRequests}
            </span>
          </Stack>
        )}
        <Link
          className={buttonVariants({
            variant: "ghost",
            className: "inline-flex w-full items-center gap-2",
          })}
          href={"/profile"}
          prefetch={false}
        >
          <PiUserGearFill className="text-2xl" />
          Profile
        </Link>
      </MenuItem>,
      <MenuItem key="sign-out">
        <Button
          variant="ghost"
          className="inline-flex w-full items-center gap-2"
          onClick={() => {
            void signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.refresh();
                },
              },
            });
          }}
        >
          <PiSignOutBold className="text-2xl" />
          Sign out
        </Button>
      </MenuItem>,
    );

    if (gamesToImport) {
      children.splice(
        2,
        0,
        <MenuItem key="import-local-stats">
          <ImportLocalGamesLink gamesToImport={gamesToImport} />
        </MenuItem>,
      );
    }
  } else {
    children.push(
      <MenuItem key="discord-sign-in">
        <DiscordButton />
      </MenuItem>,
      <MenuItem key="google-sign-in">
        <GoogleButton />
      </MenuItem>,
    );
  }

  return <ul className="h-full w-full px-6 py-3">{children}</ul>;
}

export function SigninButton({
  className,
  loading = false,
}: {
  className?: string;
  loading?: boolean;
}) {
  const { session, isPending } = useDefaultSession();
  const isLoading = isPending || loading;
  const signedIn = !!session;
  const userId = session?.user?.id;
  const { incoming } = useFriendship({ userId });
  const { data: localGamesToImport } = useMissingResultsToImport({
    userId: session?.user.id,
  });

  return (
    <Popover>
      <PopoverAnchor>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "hover:bg-accent inline-flex items-center gap-3 px-3 py-2",
              className,
            )}
            variant="ghost"
          >
            <div className="relative">
              {!isPending && session?.user?.image && (
                <Image
                  alt="profile picture"
                  src={session?.user.image}
                  className="border-muted-foreground rounded-full border"
                  width={48}
                  height={48}
                />
              )}
              {!!incoming.length && (
                <Stack
                  className="bg-primary absolute right-0 top-0 -mr-2 -mt-1 size-5 rounded-full"
                  center
                >
                  <span className="text-primary-foreground text-sm font-extrabold">
                    {incoming.length}
                  </span>
                </Stack>
              )}
            </div>
            {!signedIn && isLoading && (
              <CgSpinnerAlt className="text-primary mx-9 my-0.5 h-12 w-12 animate-spin text-4xl" />
            )}
            {!isLoading && !session && (
              <span className="inline-flex items-center gap-2 py-3">
                <PiSignInFill className="text-2xl" strokeWidth={15} /> Sign in
              </span>
            )}
            {signedIn && (
              <Stack className="flex gap-0">
                <span className="text-muted-foreground/20 text-xs">
                  signed in as
                </span>
                <span className="text-muted-foreground max-w-36 overflow-hidden text-ellipsis text-sm lg:max-w-20">
                  {session.user.name}
                </span>
              </Stack>
            )}
          </Button>
        </PopoverTrigger>
      </PopoverAnchor>
      <PopoverContent className="bg-accent m-3 border-0 p-0 shadow shadow-black">
        <Menu
          userId={userId}
          signedIn={signedIn}
          friendRequests={incoming.length}
          gamesToImport={localGamesToImport?.length}
        />
      </PopoverContent>
    </Popover>
  );
}
