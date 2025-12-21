"use client";
import { PropsWithChildren, useRef, useState } from "react";
import { Stack } from "./stack";
import { Input } from "./input";
import { CopyButton } from "./copy-button";
import { useOnClickOutside } from "../hooks/use-on-click-outside";

export function CopyInput(
  props: PropsWithChildren & {
    className?: string;
    value: string;
  },
) {
  const [selectedOnce, setSelectedOnce] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useOnClickOutside(ref, () => setSelectedOnce(false));

  return (
    <Stack className="select-text gap-1" horizontal>
      <Input
        className="px-2.5 py-2 text-xs lg:text-sm"
        value={props.value}
        onClick={(e) => {
          if (selectedOnce) return;

          setSelectedOnce(true);
          (e.target as HTMLInputElement).select();
        }}
        ref={ref}
        readOnly
      />
      <CopyButton variant="ghost" className="p-0" value={props.value} />
    </Stack>
  );
}
