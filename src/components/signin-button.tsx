"use client";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  PiChartBarFill,
  PiSignInFill,
  PiSignOutBold,
  PiUserGearFill,
} from "react-icons/pi";
import { CgSpinnerAlt } from "react-icons/cg";
import { BiLogoDiscordAlt, BiLogoGoogle } from "react-icons/bi";
import Link from "next/link";
import { Stack } from "./ui/stack";

function MenuItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="border-muted-foreground menu-item w-full border-white py-2">
      {children}
    </li>
  );
}

function Menu({ signedIn, userId }: { signedIn: boolean; userId?: string }) {
  const children = [];

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
          <PiChartBarFill className="text-2xl" />
          Stats
        </Link>
      </MenuItem>,
      <MenuItem key="profile">
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
          onClick={() => void signOut()}
        >
          <PiSignOutBold className="text-2xl" />
          Sign out
        </Button>
      </MenuItem>,
    );
  } else {
    children.push(
      <MenuItem key="discord-sign-in">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() =>
            signIn.social({
              provider: "discord",
            })
          }
        >
          <span className="inline-flex items-center gap-3 font-normal">
            <BiLogoDiscordAlt className="text-3xl" />
            Discord
          </span>
        </Button>
      </MenuItem>,
      <MenuItem key="google-sign-in">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() =>
            signIn.social({
              provider: "google",
            })
          }
        >
          <span className="inline-flex items-center gap-3 font-normal">
            <BiLogoGoogle className="text-3xl" /> Google
          </span>
        </Button>
      </MenuItem>,
    );
  }
  return <ul className="h-full w-full px-6 py-3">{children}</ul>;
}

export function SigninButton({ loading = false }: { loading?: boolean }) {
  const { data, isPending } = useSession();
  const isLoading = isPending || loading;
  const signedIn = !!data;
  const userId = data?.user?.id;

  return (
    <Popover>
      <PopoverAnchor>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="inline-flex items-center gap-2"
          >
            {!isPending && data?.user?.image && (
              <Image
                alt="profile picture"
                src={data?.user.image}
                className="rounded-full py-0.5"
                width={48}
                height={48}
              />
            )}
            {!signedIn && isLoading && (
              <CgSpinnerAlt className="text-primary mx-9 my-0.5 h-12 w-12 animate-spin text-4xl" />
            )}
            {!isLoading && !data && (
              <span className="inline-flex items-center gap-2 py-3">
                <PiSignInFill className="text-2xl" strokeWidth={15} /> Sign in
              </span>
            )}
            {signedIn && (
              <Stack className="gap-0">
                <span className="text-muted-foreground/20 text-xs">
                  signed in as
                </span>
                <span className="text-muted-foreground max-w-36 overflow-hidden text-ellipsis text-sm lg:max-w-20">
                  {data.user.name}
                </span>
              </Stack>
            )}
          </Button>
        </PopoverTrigger>
      </PopoverAnchor>
      <PopoverContent className="bg-accent m-3 border-0 p-0 shadow shadow-black">
        <Menu userId={userId} signedIn={signedIn} />
      </PopoverContent>
    </Popover>
  );
}
