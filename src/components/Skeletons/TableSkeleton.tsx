import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="w-full h-full p-2 pb-20 md:pb-2">
      <Skeleton className="w-full h-[20px] mb-1 rounded-sm bg-skeleton" />
      <Skeleton className="w-full h-[75vh] mb-1 rounded-sm bg-skeleton" />
      <div className="mt-2 flex justify-between">
        <Skeleton className="w-[160px] h-[40px] rounded-sm bg-skeleton" />
        <div className="flex gap-1">
          <Skeleton className="w-[30px] h-[30px] rounded-sm bg-skeleton" />
          <Skeleton className="w-[30px] h-[30px] rounded-sm bg-skeleton" />
        </div>
      </div>
    </div>
  );
}
