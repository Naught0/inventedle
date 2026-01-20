import { cn } from "@/lib/utils";

function getAlignmentClassName({
  itemsCenter,
  justifyCenter,
  center,
  horizontal,
}: {
  itemsCenter?: boolean;
  justifyCenter?: boolean;
  center?: boolean;
  horizontal?: boolean;
}) {
  let className = `${horizontal ? "flex-row" : "flex-col"}`;
  if (center) return `${className} justify-center items-center`;
  if (justifyCenter) className = `${className} justify-center`;
  if (itemsCenter) return `${className} items-center`;

  return className;
}

type Gap = "gap-1" | "gap-1.5" | "gap-3" | "gap-6" | "gap-12";

export function Stack({
  children,
  className,
  horizontal = false,
  center = false,
  justifyCenter,
  itemsCenter,
  gap = true,
}: {
  children: React.ReactNode;
  className?: string;
  horizontal?: boolean;
  center?: boolean;
  justifyCenter?: boolean;
  itemsCenter?: boolean;
  gap?: boolean | Gap;
}) {
  const gapClassName =
    gap && typeof gap === "string" ? gap : !gap ? "gap-none" : "gap-3";
  return (
    <div
      className={cn(
        `flex ${gapClassName} ${getAlignmentClassName({ center, horizontal, itemsCenter, justifyCenter })}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
