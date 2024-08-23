import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import MultipleSelector from "../ui/multiple-selector";

export default function FormSelectMultiple({
  id,
  label,
  options,
  noResMessage,
  placeholder,
  maxSelected,
  creatable,
  customBadgeClasses,
  singleItem,
  onChange,
  commandProps,
  form,
}: {
  id: string;
  label: string;
  options: any[];
  noResMessage?: string;
  placeholder?: string;
  maxSelected?: number;
  creatable?: boolean;
  customBadgeClasses?: string;
  singleItem?: boolean;
  onChange?: (fff: any) => void;
  commandProps?: any;
  form: any;
}) {
  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="mb-1">{label}</FormLabel>
            <FormMessage className="text-xs mt-0 pt-0" />
            <FormControl className="flex items-center justify-center gap-2">
              <MultipleSelector
                hidePlaceholderWhenSelected
                value={field.value}
                onChange={onChange || field.onChange}
                options={options}
                creatable={creatable}
                maxSelected={maxSelected}
                placeholder={placeholder || "Select an option"}
                emptyIndicator={
                  <p className="text-center text-xs">
                    {noResMessage || "No results found."}
                  </p>
                }
                badgeClassName={`rounded-sm text-xs text-ellipsis !w-full min-w-fit m-0 p-0 ${customBadgeClasses}`}
                className="w-full p-0 text-xs text-left flex items-start justify-start"
                singleItem={singleItem}
                commandProps={commandProps}
                inputProps={{ className: "" }}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
