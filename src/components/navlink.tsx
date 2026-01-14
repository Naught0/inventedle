import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export function NavLink({
  children,
  className,
  ...props
}: PropsWithChildren<LinkProps & { className?: string }>) {
  const pathName = usePathname();
  const isActive = pathName.startsWith(props.href.toString());
  return (
    <Link
      className={cn(
        `hover:text-primary hover:border-primary inline-flex w-full items-center gap-2 rounded-lg border-b-4 px-3 py-1.5 font-bold transition-colors ${isActive ? "border-primary bg-white/5" : "border-transparent"}`,
        className,
      )}
      prefetch={false}
      {...props}
    >
      {children}
    </Link>
  );
}
