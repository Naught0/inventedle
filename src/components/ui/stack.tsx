import { cn } from "@/lib/utils";

export function Stack({
  children,
  className,
  horizontal = false,
  center = false,
}: {
  children: React.ReactNode;
  className?: string;
  horizontal?: boolean;
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        `flex gap-3 ${center ? "items-center justify-center" : ""} ${horizontal ? "flex-row" : "flex-col"}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
