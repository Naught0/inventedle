import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { PiCopy } from "react-icons/pi";
import { Button } from "./button";

export function CopyButton({
  children,
  value,
}: {
  children?: React.ReactNode;
  value: string;
}) {
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
          className="text-muted-foreground hover:text-foreground size-10 p-0"
          onClick={copyToClipboard}
          variant="ghost"
        >
          <PiCopy />
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent>Copied!</PopoverContent>
    </Popover>
  );
}
