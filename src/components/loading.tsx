import { Skeleton } from "@/components/ui/skeleton";

export function LoadingGame() {
  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 lg:max-w-screen-lg lg:gap-6">
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="h-14 w-96" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-52" />
      </div>
      <Skeleton className="h-16 w-[512px]" />
      <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6">
        <div className="flex w-full flex-col justify-start">
          <div className="flex flex-1 basis-1/2 flex-col justify-start gap-3 rounded-lg lg:gap-6">
            <Skeleton className="h-96 w-full max-w-[512px] rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="max-w-512px h-12 w-full" />
          <Skeleton className="h-12 w-36" />
        </div>
      </div>
      <Skeleton className="h-96 w-[512px]" />
    </div>
  );
}
