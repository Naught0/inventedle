import { PropsWithChildren } from "react";

export function ChartContainer({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="bg-accent flex min-h-72 w-[512px] max-w-full flex-grow flex-col items-center justify-start rounded-lg p-3 lg:p-5">
      <h4 className="h-fit text-center text-xl font-extralight uppercase">
        {title}
      </h4>
      {children}
    </div>
  );
}
