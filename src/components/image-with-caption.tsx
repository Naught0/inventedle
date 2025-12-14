import { cn } from "@/lib/utils";
import { HTMLProps, ReactNode } from "react";

export function ImageWithCaption({
  children,
  alt,
  className,
  ...props
}: HTMLProps<HTMLImageElement> & { children?: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <img className={cn("rounded-lg", className)} alt={alt} {...props} />

      {children && (
        <div className="text-muted-foreground contents text-xs lg:text-sm">
          {children}
        </div>
      )}
    </div>
  );
}
