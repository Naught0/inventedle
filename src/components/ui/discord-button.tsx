"use client";
import { signIn } from "@/lib/auth-client";
import { BiLogoDiscordAlt } from "react-icons/bi";
import { Button, ButtonProps } from "./button";

export function DiscordButton(props: ButtonProps) {
  return (
    <Button
      variant="ghost"
      className="w-full"
      onClick={() =>
        signIn.social({
          provider: "discord",
        })
      }
      {...props}
    >
      <span className="inline-flex items-center gap-3 font-normal">
        <BiLogoDiscordAlt className="text-3xl" />
        Discord
      </span>
    </Button>
  );
}
