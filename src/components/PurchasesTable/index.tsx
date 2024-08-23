import { PurchaseWithItems } from "@/types";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import { Accordion } from "../ui/accordion";

export default function PurchasesTable({
  dbPurchaseData,
}: {
  dbPurchaseData: PurchaseWithItems[];
}) {
  return dbPurchaseData.length === 0 ? (
    <div className="text-xs">No purchases to show</div>
  ) : (
    <div className="">
      <TableHeader table="purchases" />

      <Accordion type="multiple" className="rounded-b-sm border">
        {dbPurchaseData.map((data, index) => (
          <TableRow key={data.id} data={data} table="purchases" index={index} />
        ))}
      </Accordion>
    </div>
  );
}
