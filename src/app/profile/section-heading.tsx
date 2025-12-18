import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="my-3 flex flex-grow flex-col items-start gap-3">
      <h3 className={cn("text-2xl font-extralight", className)}>{children}</h3>
      <Separator className="bg-status-error-foreground/40" />
    </div>
  );
}
