import { Skeleton } from "@/components/ui/skeleton";

export function WorkspaceSkeleton() {
  return (
    <div className="space-y-6 p-8">

      <Skeleton className="h-40 rounded-2xl" />

      <div className="grid gap-6 md:grid-cols-3">

        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />

      </div>

    </div>
  );
}