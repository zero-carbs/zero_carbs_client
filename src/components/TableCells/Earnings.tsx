import { price } from "@/lib/utils";

export default function Earnings({
  soldTotals,
  customClasses,
}: {
  soldTotals: number;
  customClasses?: string;
}) {
  return <div className={customClasses}>{price(soldTotals)}</div>;
}
