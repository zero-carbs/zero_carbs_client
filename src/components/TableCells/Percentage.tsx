/**
 * Percentage component displays the percentage profit margin of a purchase.
 *
 * @param {PurchaseWithItems} data - The purchase data containing priceTotal, priceShipping, priceTax, and priceFees.
 * @returns {JSX.Element} JSX element representing the Percentage component.
 */

import { calculateProfitMargin } from "@/lib/utils";
import { localizeValue } from "@/util/localizeValue";
import { PurchaseWithItems } from "@/types";

export default function Percentage({ data }: { data: PurchaseWithItems }) {
  const { priceTotal, priceShipping, priceTax, priceFees } = data;
  const purchaseTotalCost = priceTotal + priceShipping + priceTax + priceFees;
  const calc = calculateProfitMargin(purchaseTotalCost, data.soldTotals || 0);
  const formattedPercent = localizeValue(calc);

  return (
    <div className="" style={{ textAlign: "right" }}>
      <span
        className={`font-bold ${Number(calculateProfitMargin(purchaseTotalCost, data.soldTotals)) >= 0 ? "text-success" : "text-destructive"}`}
      >
        {formattedPercent}%
      </span>
    </div>
  );
}
