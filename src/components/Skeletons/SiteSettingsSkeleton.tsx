import { Skeleton } from "../ui/skeleton";

export default function SiteSettingsSkeleton() {
  return (
    <>
      <div className="max-w-[420px] px-4 py-1 mt-2">
        <h1 className="text-sm font-bold italic">Site Settings</h1>
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-1">
            <div>
              <Skeleton className="w-full h-[40px] mb-1 rounded-sm bg-skeleton" />
            </div>

            <Skeleton className="w-full h-[40px] mb-1 rounded-sm bg-skeleton" />
          </div>
          <div className="w-full flex justify-end mt-4">
            <Skeleton className="w-full h-[40px] mt-2 rounded-sm bg-skeleton" />
          </div>
        </div>
      </div>
    </>
  );
}
