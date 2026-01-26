import { Skeleton } from "@/components/ui/skeleton";
import { Stack } from "@/components/ui/stack";

export default function Loading() {
  return (
    <main className="flex w-full max-w-screen-md flex-col items-center justify-start gap-3">
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-32 w-32 rounded-full" />
        <Skeleton className="h-12 w-72 max-w-full sm:w-96" />
        <Skeleton className="h-12 w-48 max-w-full" />
      </div>
      <Stack className="h-32" horizontal>
        <Skeleton className="flex h-32 min-w-24 flex-grow basis-1/5 rounded-lg lg:min-w-40" />
        <Skeleton className="flex h-32 min-w-24 flex-grow basis-1/5 rounded-lg lg:min-w-40" />
      </Stack>
      <div className="flex w-full flex-col items-center gap-3">
        <div className="flex w-full flex-wrap justify-center gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="flex h-32 min-w-24 flex-grow basis-1/5 rounded-lg"
            />
          ))}
        </div>
        <Skeleton className="h-[360px] w-full max-w-[512px]" />
      </div>
    </main>
  );
}
