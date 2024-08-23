import NumberOfRowsSelect from "@/components/NumberOfRowsSelect";
import TablePagination from "@/components/TablePagination";
import { useSearchParams } from "react-router-dom";
import { paramsToObject } from "@/util/paramsToObject";
import TableSkeleton from "@/components/Skeletons/TableSkeleton";
import { Suspense, lazy } from "react";
import { useTanFetch } from "@/hooks/useTanFetch";

const ItemsTable = lazy(() => import("@/components/ItemTable"));

export default function ListingsPage() {
  const [searchParams] = useSearchParams();

  const { data: dbRes, isLoading } = useTanFetch([
    "items",
    searchParams.toString(),
  ]);

  type Params = { [key: string]: any };
  const paramObj: Params = paramsToObject(searchParams.entries());

  const numberOfRows = Number(paramObj.rows) || 20;

  if (isLoading || !dbRes?.paginatedItemData) return <TableSkeleton />;

  return (
    <div className="w-full p-2 pb-20 md:pb-2">
      <Suspense>
        <ItemsTable dbItemData={dbRes.paginatedItemData} />
      </Suspense>
      {dbRes.paginatedItemData.length > 0 && (
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
