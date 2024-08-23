import { DbItemSelect } from "@server/db/schema";

export default function ItemsSoldCount({ items }: { items: DbItemSelect[] }) {
  const totalNumber = items.length;
  const numberSold = items.filter((item) => item.isSold).length;

  return (
    <div className="text-right">{`${numberSold} / ${totalNumber || 1}`}</div>
  );
}
