import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import {
  listingTableHeaders,
  listingTableMobileHeaders,
  purchaseTableHeaders,
  purchaseTableMobileHeaders,
  itemTableHeaders,
  TableHeader as TableHeaderTypes,
} from "@/config/tableData";
import TableCells from "../TableCells";
import { ListingWithItems, PurchaseWithItems } from "@/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import SubTable from "../SubTable";
import { DbItemSelect } from "@server/db/schema";

interface Common {
  index: number;
}

interface Listing {
  data: ListingWithItems;
  table: "listings";
}

interface Purchase {
  data: PurchaseWithItems;
  table: "purchases";
}

interface Item {
  data: DbItemSelect;
  table: "items";
}

type TData = (Listing & Common) | (Purchase & Common) | (Item & Common);

export default function TableRow({ data, table, index }: TData) {
  const isMobile = useMediaQuery("mobile");

  const tableOptions: { [key: string]: TableHeaderTypes } = {
    purchases: isMobile ? purchaseTableMobileHeaders : purchaseTableHeaders,
    listings: isMobile ? listingTableMobileHeaders : listingTableHeaders,
    items: itemTableHeaders,
  };

  const headerSizes = tableOptions[table]
    .map((header) => header.size)
    .join(" ")
    .toString();

  return (
    <AccordionItem
      key={data.id}
      value={String(data.id)}
      className={
        "border-none px-4 py-2 odd:bg-table-odd even:bg-table-even hover:bg-muted/5"
      }
    >
      <AccordionTrigger className="p-0 text-xs hover:no-underline">
        <div
          className="relative grid w-full px-0 text-left md:gap-x-4"
          style={{
            gridTemplateColumns: headerSizes,
          }}
        >
          {/* What the fucking fuck is this shit */}
          {/* @ts-ignore */}
          <TableCells data={data} table={table} index={index} />
        </div>
      </AccordionTrigger>

      {(table === "purchases" || table === "listings") && (
        <AccordionContent>
          <SubTable table={table} data={data} />
        </AccordionContent>
      )}
    </AccordionItem>
  );
}
