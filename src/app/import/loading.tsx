import { Skeleton } from "@/components/ui/skeleton";
import { Stack } from "@/components/ui/stack";

export default function Loading() {
  return (
    <Stack itemsCenter>
      <Skeleton className="h-10 w-72 sm:w-96" />
      <Skeleton className="h-36 w-80 sm:w-[420px]" />
      <Skeleton className="mt-6 h-16 w-48" />
    </Stack>
  );
}
