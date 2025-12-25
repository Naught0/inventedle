import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex w-full flex-grow flex-col items-start gap-3">
      <h3 className={cn("text-2xl font-extrabold", className)}>{children}</h3>
      <Separator className="bg-status-error-foreground/40" />
    </div>
  );
}
