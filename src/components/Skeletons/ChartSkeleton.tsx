import { Skeleton } from "../ui/skeleton";

export default function ChartSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 px-2 py-2 pb-20 md:grid-cols-6">
      <div className="col-span-3 md:col-span-2">
        <div className="flex gap-4 md:flex-col">
          <Skeleton className="w-full h-[100px] bg-skeleton" />
          <Skeleton className="w-full h-[100px] bg-skeleton" />
        </div>
      </div>

      <div className="col-span-3 flex md:col-span-4">
        <div className="flex grow gap-4">
          <Skeleton className="w-full h-full bg-skeleton" />
          <Skeleton className="w-full h-full bg-skeleton" />
        </div>
      </div>

      <div className="col-span-3 h-full w-full">
        <Skeleton className="w-full h-[300px] bg-skeleton" />
      </div>
      <div className="col-span-3 h-full w-full">
        <Skeleton className="w-full h-[300px] bg-skeleton" />
      </div>

      <div className="col-span-1">
        <Skeleton className="w-full h-[200px] bg-skeleton" />
      </div>
      <div className="col-span-1">
        <Skeleton className="w-full h-[200px] bg-skeleton" />
      </div>
    </div>
  );
}
