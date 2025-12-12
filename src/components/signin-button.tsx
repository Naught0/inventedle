"use client";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { PiChartBarFill, PiSignInFill, PiSignOutBold } from "react-icons/pi";
import { CgSpinnerAlt } from "react-icons/cg";
import { BiLogoDiscordAlt, BiLogoGoogle } from "react-icons/bi";

function MenuItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="border-muted-foreground w-full border-white py-2 odd:border-b">
      {children}
    </li>
  );
}

function Menu({ signedIn }: { signedIn: boolean }) {
  const children = [];
  if (signedIn) {
    children.push(
      <MenuItem key="sign-out">
        <Button
          variant="ghost"
          className="inline-flex w-full items-center gap-2"
          onClick={() => void signOut()}
        >
          <PiSignOutBold strokeWidth={20} className="text-xl" />
          Sign out
        </Button>
      </MenuItem>,
      <MenuItem key="sign in">
        <Button
          variant="ghost"
          className="inline-flex w-full items-center gap-2"
        >
          <PiChartBarFill className="text-xl" />
          Stats
        </Button>
      </MenuItem>,
    );
  } else {
    children.push(
      <MenuItem key="discord-sign-in">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => signIn.social({ provider: "discord" })}
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
          onClick={() => signIn.social({ provider: "google" })}
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

  return (
    <Popover>
      <PopoverAnchor className="mx-3">
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
              <span className="text-muted-foreground text-sm">
                @{data.user.name}
              </span>
            )}
          </Button>
        </PopoverTrigger>
      </PopoverAnchor>
      <PopoverContent className="bg-accent m-3 border-0 p-0 shadow shadow-black">
        <Menu signedIn={signedIn} />
      </PopoverContent>
    </Popover>
  );
}
