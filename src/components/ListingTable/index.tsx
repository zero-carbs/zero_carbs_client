import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import { Accordion } from "../ui/accordion";
import { ListingWithItems } from "@/types";

export default function ListingsTable({
  dbListingsData,
}: {
  dbListingsData: ListingWithItems[];
}) {
  return dbListingsData.length === 0 ? (
    <div className="text-xs">No listings to show</div>
  ) : (
    <div className="">
      <TableHeader table="listings" />

      <Accordion type="multiple" className="rounded-b-sm border">
        {dbListingsData.map((data, index) => (
          <TableRow key={data.id} data={data} table="listings" index={index} />
        ))}
      </Accordion>
    </div>
  );
}
