import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export default function FormCheckbox({
  label,
  form,
  id,
  className,
}: {
  label: string;
  form: any;
  id: string;
  className?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start justify-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              className="rounded-sm"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className={className}>{label}</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
}
