"use client";
import { signIn } from "@/lib/auth-client";
import { BiLogoGoogle } from "react-icons/bi";
import { Button, ButtonProps } from "./button";

export function GoogleButton(props: ButtonProps) {
  return (
    <Button
      variant="ghost"
      className="w-full"
      onClick={() =>
        signIn.social({
          provider: "google",
        })
      }
      {...props}
    >
      <span className="inline-flex items-center gap-3">
        <BiLogoGoogle className="text-3xl" /> Google
      </span>
    </Button>
  );
}
