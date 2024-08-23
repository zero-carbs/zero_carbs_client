import { Suspense, lazy } from "react";
import NumberOfRowsSelect from "@/components/NumberOfRowsSelect";
import TablePagination from "@/components/TablePagination";
import { useSearchParams } from "react-router-dom";
import { paramsToObject } from "@/util/paramsToObject";
import TableSkeleton from "@/components/Skeletons/TableSkeleton";
import { useTanFetch } from "@/hooks/useTanFetch";

const ListingsTable = lazy(() => import("@/components/ListingTable"));

export default function ListingsPage() {
  const [searchParams] = useSearchParams();
  const { data: dbRes, isLoading } = useTanFetch([
    "listings",
    searchParams.toString(),
  ]);

  type Params = { [key: string]: any };
  const paramObj: Params = paramsToObject(searchParams.entries());

  const numberOfRows = Number(paramObj.rows) || 20;

  if (isLoading || !dbRes?.paginatedListingData) return <TableSkeleton />;

  return (
    <div className="w-full p-2 pb-20 md:pb-2">
      <Suspense>
        <ListingsTable dbListingsData={dbRes.paginatedListingData} />
      </Suspense>
      {dbRes.paginatedListingData > 0 && (
        <div className="mt-2 flex justify-end">
          <NumberOfRowsSelect numberOfRows={numberOfRows} />
          <TablePagination
            page={paramObj.p || 1}
            isLastPage={dbRes.isLastPage}
          />
        </div>
      )}
    </div>
  );
}
