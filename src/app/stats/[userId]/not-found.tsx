import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { PiHouseFill } from "react-icons/pi";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-12">
      <h2 className="font-regular text-muted-foreground inline-flex flex-col flex-wrap items-center justify-center gap-6 text-center text-4xl font-bold sm:flex-row">
        <span className="text-primary text-8xl font-light">404</span>
        <span className="bg-muted-foreground hidden h-32 w-1 sm:block"></span>{" "}
        <span className="">User not found</span>
      </h2>
      <Link
        prefetch={false}
        href="/"
        className={buttonVariants({ size: "xl", className: "gap-2" })}
      >
        <PiHouseFill /> Home
      </Link>
    </div>
  );
}
