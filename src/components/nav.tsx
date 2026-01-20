"use client";
import { useSession } from "@/lib/auth-client";
import Logo from "./logo";
import { SigninButton } from "./signin-button";
import { Help } from "./help";
import { NavLink } from "./navlink";
import { Stack } from "./ui/stack";
import { cn } from "@/lib/utils";
import {
  PiChartBarHorizontalFill,
  PiHouseFill,
  PiUserGearFill,
} from "react-icons/pi";

export function Nav() {
  const { data: session } = useSession();
  return (
    <nav className="relative mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-3 p-6 pb-3 lg:mb-10 lg:flex-row">
      <div className="absolute left-6 top-3 hidden lg:block">
        <Logo />
      </div>
      <div className="block lg:hidden">
        <Logo />
      </div>
      <div className="lg:hidden">
        <SigninButton />
      </div>
      <Links className="" userId={session?.user?.id} />
      <div className="absolute right-3 top-3 hidden lg:block">
        <SigninButton />
      </div>
    </nav>
  );
}

function Links({ userId, className }: { userId?: string; className?: string }) {
  return (
    <Stack
      className={cn(
        "bg-accent xs:flex-nowrap flex-row flex-wrap gap-1 rounded-lg shadow md:gap-3 lg:text-lg",
        className,
      )}
    >
      <NavLink href="/" className="hidden justify-center sm:flex">
        <PiHouseFill />
      </NavLink>
      <span className="inline-flex w-full items-center justify-center text-center">
        <Help />
      </span>
      <NavLink
        href={`/stats${userId ? `/${userId}` : ""}`}
        prefetch={false}
        className="justify-center"
      >
        <PiChartBarHorizontalFill className="text-2xl" />
        Stats
      </NavLink>
      {userId && (
        <NavLink href={"/profile"} prefetch={false} className="justify-center">
          <PiUserGearFill className="text-2xl" />
          Profile
        </NavLink>
      )}
    </Stack>
  );
}
