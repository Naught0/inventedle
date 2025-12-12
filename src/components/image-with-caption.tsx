import Image, { ImageProps } from "next/image";
import { ReactNode } from "react";

export function ImageWithCaption({
  children,
  alt,
  ...props
}: ImageProps & { children?: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="w-fit drop-shadow-lg">
        <Image alt={alt} {...props} />
      </div>

      {children && (
        <div className="text-muted-foreground contents text-xs lg:text-sm">
          {children}
        </div>
      )}
    </div>
  );
}
