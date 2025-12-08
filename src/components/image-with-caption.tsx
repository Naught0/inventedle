import Image, { ImageProps } from "next/image";
import { ReactNode } from "react";

export function ImageWithCaption({
  children,
  alt,
  ...props
}: ImageProps & { children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-fit rounded bg-white p-1 drop-shadow-lg">
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
