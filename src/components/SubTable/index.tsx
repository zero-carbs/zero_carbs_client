import {
  purchaseTableItemHeaders,
  listingTableItemHeaders,
} from "@/config/tableData";
import SubCells from "./SubCells";
import { ListingWithItems, PurchaseWithItems } from "@/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobilePurchaseSubHeaders from "./SubHeader/Mobile/MobilePurchaseSubHeaders";
import MobileListingSubHeaders from "./SubHeader/Mobile/MobileListingSubHeaders";

interface TableData<T> {
  data: T;
  table: string;
}

type YYY = TableData<ListingWithItems | PurchaseWithItems>;
interface Listing extends YYY {}
interface Purchase extends YYY {}
type FFF = Listing | Purchase;

export default function SubTable({ data, table }: FFF) {
  const isMobile = useMediaQuery("mobile");
  const subTableHeaders =
    table === "purchases" ? purchaseTableItemHeaders : listingTableItemHeaders;

  const rightHeaders = ["actions"];
  const cellSizes = subTableHeaders
    .map((header) => header.size)
    .join(" ")
    .toString();

  const getSubHeaders = () => {
    if (table === "purchases") {
      return <MobilePurchaseSubHeaders data={data as PurchaseWithItems} />;
    } else {
      return <MobileListingSubHeaders data={data as ListingWithItems} />;
    }
  };
  return (
    <div className="relative w-full pl-2 pt-2 text-left text-xs">
      <div className="mr-3 rounded-sm border-t border-l border-r">
        {/* Headers */}
        <div
          className="grid bg-table-header px-2 py-1 border-b"
          style={{
            gridTemplateColumns: cellSizes,
          }}
        >
          {subTableHeaders.map((header: { slug: string; label: string }) => (
            <div
              key={header.slug}
              className="text-xs"
              style={{
                textAlign: rightHeaders.includes(header.slug)
                  ? "right"
                  : "left",
              }}
            >
              {/* No headers on mobile sub-tables */}
              {isMobile ? <></> : <span>{header.label}</span>}
            </div>
          ))}
        </div>

        {/* Body */}
        <div>
          {/* Sub-table header */}
          {isMobile && getSubHeaders()}

          {/* Sub-table body */}
          {data.items.map((item) => (
            <div
              key={item.itemName}
              className="grid px-2 py-1 bg-primary/20 last:rounded-b-sm last:border-b"
              style={{
                gridTemplateColumns: cellSizes,
              }}
            >
              <SubCells
                item={item}
                listingData={data as ListingWithItems}
                table={table as "listings"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
