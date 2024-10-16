import { cn } from "@/lib/utils";
import { HTMLProps, PropsWithChildren } from "react";
import { PiArrowUpRight } from "react-icons/pi";

export function Hyperlink({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLProps<HTMLAnchorElement>>) {
  return (
    <a
      className={cn(
        "hover:text-primary inline-flex items-center gap-1 underline-offset-4 transition-colors hover:underline",
        className,
      )}
      {...props}
    >
      {children} <PiArrowUpRight className="text-lg" />
    </a>
  );
}
