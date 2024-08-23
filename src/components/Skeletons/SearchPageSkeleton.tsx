import { Skeleton } from "../ui/skeleton";

export default function SearchPageSkeleton() {
  return (
    <div className="w-full p-2 pb-20 md:pb-2">
      <div className="flex flex-col gap-y-4">
        <div>
          <h2>Purchases</h2>
          <Skeleton className="w-full h-[40px] mb-1 rounded-sm bg-skeleton" />
        </div>

        <div>
          <h2>Listings</h2>
          <Skeleton className="w-full h-[40px] mb-1 rounded-sm bg-skeleton" />
        </div>
        <div>
          <h2>Items</h2>
          <Skeleton className="w-full h-[40px] mb-1 rounded-sm bg-skeleton" />
        </div>
      </div>
    </div>
  );
}
