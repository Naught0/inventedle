"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { PiCopy } from "react-icons/pi";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

export function CopyButton({
  children,
  value,
  className,
  icon,
  ...buttonProps
}: {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  value: string;
  className?: string;
} & ButtonProps) {
  const [copied, setCopied] = useState(false);
  function copyToClipboard() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }
  return (
    <Popover open={copied} onOpenChange={setCopied}>
      <PopoverTrigger asChild>
        <Button
          className={cn(className)}
          onClick={copyToClipboard}
          {...buttonProps}
        >
          {icon ?? <PiCopy />}
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent>Copied!</PopoverContent>
    </Popover>
  );
}
