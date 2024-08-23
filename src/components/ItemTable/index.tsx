import { DbItemSelect } from "@server/db/schema";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import { Accordion } from "../ui/accordion";

export default function ItemsTable({
  dbItemData,
}: {
  dbItemData: DbItemSelect[];
}) {
  return dbItemData.length === 0 ? (
    <div className="text-xs">No items to show</div>
  ) : (
    <div className="">
      <TableHeader table="items" />

      <Accordion type="multiple" className="rounded-b-sm border">
        {dbItemData.map((data, index) => (
          <TableRow key={data.id} data={data} table="items" index={index} />
        ))}
      </Accordion>
    </div>
  );
}
