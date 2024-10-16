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
        "hover:text-primary text-muted-foreground inline-flex items-center underline-offset-4 transition-colors hover:underline",
        className,
      )}
      {...props}
    >
      {children} <PiArrowUpRight className="text-lg" />
    </a>
  );
}
