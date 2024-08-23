import PopoverWrapper from "../PopoverWrapper";

export default function Notes({ data }: { data: string | null }) {
  if (!data) {
    return null;
  }

  return (
    <PopoverWrapper
      trigger={<div className="truncate max-w-[120px]">{data}</div>}
      content={<div className="text-xs">{data}</div>}
    />
  );
}
