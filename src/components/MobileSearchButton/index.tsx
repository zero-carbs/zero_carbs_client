import SearchForm from "../forms/SearchForm";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function MobileSearchButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <MagnifyingGlassIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 rounded-sm">
        <div>
          <SearchForm autoFocus />
        </div>
      </PopoverContent>
    </Popover>
  );
}
