import { Skeleton } from "@/components/ui/skeleton";
import { Stack } from "./ui/stack";

export function LoadingGame() {
  return (
    <Stack className="w-full gap-6 sm:max-w-md lg:max-w-screen-lg" center>
      <Stack center>
        <h2 className="text-3xl font-extrabold">Loading game...</h2>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-52" />
      </Stack>
      <Skeleton className="h-16 w-full max-w-[512px]" />
      <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6">
        <div className="flex w-full flex-col justify-start">
          <div className="flex flex-1 basis-1/2 flex-col justify-start gap-3 rounded-lg lg:gap-6">
            <Skeleton className="m-auto h-96 w-full max-w-[512px] rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="max-w-512px h-12 w-full" />
          <Skeleton className="h-12 w-36" />
        </div>
      </div>
      <Skeleton className="h-96 w-full max-w-[512px]" />
    </Stack>
  );
}
