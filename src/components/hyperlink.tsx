import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { HTMLProps, PropsWithChildren } from "react";
import { PiArrowUpRight } from "react-icons/pi";

export function Hyperlink({
  children,
  className,
  rel,
  target,
  ...props
}: PropsWithChildren<HTMLProps<HTMLAnchorElement>> & LinkProps) {
  return (
    <Link
      className={cn(
        "hover:text-primary text-muted-foreground inline-flex items-center truncate text-wrap break-all underline-offset-4 transition-colors hover:underline",
        className,
      )}
      rel={rel ?? "noopener noreferrer"}
      target={target ?? "_blank"}
      {...props}
    >
      <span className={className}>
        {children}
        <PiArrowUpRight className="inline" />
      </span>
    </Link>
  );
}
