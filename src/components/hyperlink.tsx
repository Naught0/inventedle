import { cn } from "@/lib/utils";
import { HTMLProps, PropsWithChildren } from "react";
import { PiArrowUpRight } from "react-icons/pi";

export function Hyperlink({
  children,
  className,
  rel,
  target,
  ...props
}: PropsWithChildren<HTMLProps<HTMLAnchorElement>>) {
  return (
    <a
      className={cn(
        "hover:text-primary text-muted-foreground inline-flex items-center truncate text-wrap break-all underline-offset-4 transition-colors hover:underline",
        className,
      )}
      rel={rel ?? "noopener noreferrer"}
      target={target ?? "_blank"}
      {...props}
    >
      <span>
        {children}
        <PiArrowUpRight className="inline text-lg" />
      </span>
    </a>
  );
}
