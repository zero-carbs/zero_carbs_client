import PurchasesTable from "@/components/PurchasesTable";
import ListingsTable from "@/components/ListingTable";
import ItemsTable from "@/components/ItemTable";
import { useSearchParams } from "react-router-dom";
import { useTanFetch } from "@/hooks/useTanFetch";
import SearchPageSkeleton from "@/components/Skeletons/SearchPageSkeleton";

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const sp = searchParams.get("sp");
  const sl = searchParams.get("sl");
  const si = searchParams.get("si");

  searchParams.delete("p");
  const { data: dbRes, isLoading } = useTanFetch([
    "search",
    searchParams.toString(),
  ]);

  const defaultSearch = !sp && !sl && !si;

  if (isLoading || !dbRes) return <SearchPageSkeleton />;

  return (
    <div className="w-full p-2 pb-20 md:pb-2">
      <div className="flex flex-col gap-y-4">
        {(defaultSearch || sp) && (
          <div>
            <h2>Purchases</h2>
            <PurchasesTable dbPurchaseData={dbRes.purchaseRes} />
          </div>
        )}

        {(defaultSearch || sl) && (
          <div>
            <h2>Listings</h2>
            <ListingsTable dbListingsData={dbRes.listingRes} />
          </div>
        )}
        {(defaultSearch || si) && (
          <div>
            <h2>Items</h2>
            <ItemsTable dbItemData={dbRes.itemRes} />
          </div>
        )}
      </div>
    </div>
  );
}
