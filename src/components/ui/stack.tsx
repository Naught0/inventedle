import { cn } from "@/lib/utils";

export function Stack({
  children,
  className,
  horizontal = false,
}: {
  children: React.ReactNode;
  className?: string;
  horizontal?: boolean;
}) {
  return (
    <div
      className={cn(
        `flex gap-3 ${horizontal ? "flex-row" : "flex-col"}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
