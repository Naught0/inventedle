import { PropsWithChildren } from "react";

export function ChartContainer({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="bg-accent flex min-h-96 w-full max-w-[512px] flex-col items-center justify-start rounded-lg p-4 lg:p-6">
      <h4 className="h-fit text-center text-xl font-extralight uppercase">
        {title}
      </h4>
      {children}
    </div>
  );
}
