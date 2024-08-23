import {
  purchaseTableHeaders,
  purchaseTableMobileHeaders,
  listingTableHeaders,
  itemTableHeaders,
  listingTableMobileHeaders,
  TableHeader as TableHeaderTypes,
} from "../../config/tableData";
import { cn } from "@/lib/utils";
import TableHeaderLinks from "../TableHeaderLinks";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function TableHeader({ table }: { table: string }) {
  const isMobile = useMediaQuery("mobile");

  const tableOptions: { [key: string]: TableHeaderTypes } = {
    purchases: isMobile ? purchaseTableMobileHeaders : purchaseTableHeaders,
    listings: isMobile ? listingTableMobileHeaders : listingTableHeaders,
    items: itemTableHeaders,
  };

  const tableHeaders = tableOptions[table];
  const columnSizes = tableOptions[table]
    .map((header) => header.size)
    .join(" ")
    .toString();

  const leftHeaders = ["id", "itemName", "listingName"];
  const borderClass = `border-l border-r border-t`;
  return (
    <div
      className={cn(
        `grid w-full rounded-t-sm bg-table-header px-4 py-2 text-xs md:gap-x-4 ${borderClass}`,
      )}
      style={{
        gridTemplateColumns: columnSizes,
      }}
    >
      {tableHeaders.map((header) => (
        <span
          key={header.slug}
          className={"m-0 p-0 font-bold"}
          style={{
            textAlign: leftHeaders.includes(header.slug) ? "left" : "right",
          }}
        >
          <TableHeaderLinks label={header.label} slug={header.slug} />
        </span>
      ))}
    </div>
  );
}
