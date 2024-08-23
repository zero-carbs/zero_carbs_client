import PopoverWrapper from "../PopoverWrapper";
import { PurchaseWithItems } from "@/types";
import { price } from "@/lib/utils";

export default function CellPrice({ data }: { data: PurchaseWithItems }) {
  const { priceTotal, priceTax, priceShipping, priceFees } = data;

  return (
    <PopoverWrapper
      asChild
      customClasses="text-xs max-w-[200px]"
      trigger={
        <div className="inline text-right">
          {price(priceTotal + priceTax + priceShipping + priceFees)}
        </div>
      }
      content={
        <ul className="">
          <li className="flex justify-between">
            <strong>Item:</strong> {price(priceTotal)}
          </li>
          <li className="flex justify-between">
            <strong>Tax:</strong> {price(priceTax)}
          </li>
          <li className="flex justify-between">
            <strong>Shipping:</strong> {price(priceShipping)}
          </li>
          <li className="flex justify-between">
            <strong>Fees:</strong>
            {price(priceFees)}
          </li>
        </ul>
      }
    />
  );
}
