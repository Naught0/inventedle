import { cn } from "@/lib/utils";
import Link from "next/link";
import { PiHouseFill } from "react-icons/pi";
import { buttonVariants } from "./ui/button";

export function GoHomeButton() {
  return (
    <Link
      className={cn(buttonVariants(), "gap-3 text-2xl")}
      href="/"
      prefetch={false}
    >
      <PiHouseFill />
      Go Home
    </Link>
  );
}
