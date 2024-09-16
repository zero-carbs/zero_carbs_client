import CardWrapper from "@/components/CardWrapper";
import { localizeValue } from "@/util/localizeValue";

type TDataType = {
  label: string;
  value: string | number;
}[];

export default function DataListCard({
  data,
  title,
  description,
}: {
  data: TDataType;
  title?: string;
  description?: string;
}) {
  return (
    <CardWrapper
      title={title}
      description={description}
      content={
        <ul>
          {data.map((item) => {
            const isPercent = String(item.value).includes("%");
            const redText = String(item.value).includes("-");
            return (
              <li
                key={item.label}
                className="leading-0 m-0 flex w-full items-center justify-between gap-0 p-0"
              >
                <span className="text-xs">{item.label}</span>
                <span
                  className={`text-lg font-bold ${isPercent && `${redText ? "text-destructive" : "text-success"}`}`}
                >
                  {localizeValue(item.value)}
                </span>
              </li>
            );
          })}
        </ul>
      }
      classes="rounded-sm"
    />
  );
}
