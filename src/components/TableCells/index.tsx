import CellSource from "../CellSource";
import CellPrice from "../CellPrice";
import CellEditButton from "../CellEditButton";
import Percentage from "./Percentage";
import { ListingWithItems, PurchaseWithItems } from "@/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ItemsSoldCount from "./ItemsSoldCount";
import { DbItemSelect } from "@server/db/schema";
import { price } from "@/lib/utils";

type CommonProps = {
  index: number;
};

type ConditionalProps =
  | {
      data: ListingWithItems;
      table: "listings";
    }
  | {
      data: PurchaseWithItems;
      table: "purchases";
    }
  | {
      data: DbItemSelect;
      table: "items";
    };

type FuckFuck = ConditionalProps & CommonProps;

export default function TableCells({ data, table, index }: FuckFuck) {
  const isMobile = useMediaQuery("mobile");

  const getTableColumns = () => {
    if (table === "purchases") {
      return (
        <>
          {/* ID */}
          <div className="col-span-1 text-left">{index + 1}</div>

          {/* Purchase name */}
          <div className="text-left">{data.purchaseName}</div>

          {/* Date purchased */}
          <div className="text-right">{data.datePurchased}</div>

          {/* Source */}
          {!isMobile && (
            <div className="text-right">
              <CellSource data={data} />
            </div>
          )}

          {!isMobile && <ItemsSoldCount items={data.items} />}

          {/* Cost */}
          {!isMobile && (
            <div className="text-right">
              <CellPrice data={data} />
            </div>
          )}

          {/* Earnings */}
          {!isMobile && (
            <div className="text-right">{price(data.soldTotals)}</div>
          )}

          {/* Percent */}
          {!isMobile && <Percentage data={data} />}

          {/* Actions */}
          {!isMobile && (
            <div className="text-right">
              <CellEditButton data={data} type="purchases" />
            </div>
          )}
        </>
      );
    }

    if (table === "listings") {
      return (
        <>
          <div className="col-span-1">{index + 1}</div>
          <div className="">{data.listingName}</div>

          {/* Listed date */}
          {!isMobile && <div className="text-right">{data.listingDate}</div>}

          {/* Listing sold date */}
          <div className="text-right">
            {data.listingSold ? data.listingSoldDate : "---"}
          </div>

          {/* Listing source */}
          {!isMobile && (
            <>
              <div className="text-right">{data.listingSource}</div>

              {/* Amount */}
              <div className="text-right">
                {data.listingSoldPrice === 0
                  ? "---"
                  : price(
                      data.listingSoldPrice -
                        (data.listingSoldShipping + data.listingSoldFees),
                    )}
              </div>

              {/* Actions */}
              {!isMobile && (
                <div className="text-right">
                  <CellEditButton data={data} type="listings" />
                </div>
              )}
            </>
          )}
        </>
      );
    }

    if (table === "items") {
      return (
        <>
          <div className="col-span-1">{index + 1}</div>
          <div>{data.itemName}</div>
          <div className="text-right">
            {data.isListed || data.isSold ? data.listedSource : "---"}
          </div>
          <div className="text-right">
            {data.isSold ? data.soldDate : "---"}
          </div>
        </>
      );
    }
  };

  return getTableColumns();
}
