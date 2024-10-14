import Image, { ImageProps } from "next/image";
import React, { ReactNode } from "react";

export function ImageWithCaption({
  children,
  ...props
}: ImageProps & { children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Image {...props} />

      {children && (
        <p className="text-muted-foreground text-xs lg:text-sm">{children}</p>
      )}
    </div>
  );
}
