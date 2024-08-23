import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearchParams } from "react-router-dom";

export default function NumberOfRowsSelect({
  numberOfRows,
}: {
  numberOfRows: number | string;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onNumberOfRowsChange = (e: string) => {
    searchParams.set("rows", e.toString());

    // This is not ideal, but it's not terrible either
    searchParams.set("p", String(1));
    navigate(`?${searchParams.toString()}`);
  };
  return (
    <Select onValueChange={(e) => onNumberOfRowsChange(e)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={numberOfRows} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="50">50</SelectItem>
      </SelectContent>
    </Select>
  );
}
