import PurchasesTable from "@/components/PurchasesTable";
import NumberOfRowsSelect from "@/components/NumberOfRowsSelect";
import TablePagination from "@/components/TablePagination";
import { useSearchParams } from "react-router-dom";
import { paramsToObject } from "@/util/paramsToObject";
import TableSkeleton from "@/components/Skeletons/TableSkeleton";
import { useTanFetch } from "@/hooks/useTanFetch";

export default function PurchasesPage() {
  const [searchParams] = useSearchParams();

  type Params = { [key: string]: any };
  const paramObj: Params = paramsToObject(searchParams.entries());

  const { data: dbRes, isLoading } = useTanFetch([
    `purchases`,
    searchParams.toString(),
  ]);

  const numberOfRows = Number(paramObj.rows) || 20;

  if (isLoading || !dbRes?.paginatedPurchaseData) return <TableSkeleton />;

  return (
    <div className="w-full p-2 pb-20 md:pb-2">
      <PurchasesTable dbPurchaseData={dbRes.paginatedPurchaseData} />
      {dbRes.paginatedPurchaseData.length > 0 && (
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
