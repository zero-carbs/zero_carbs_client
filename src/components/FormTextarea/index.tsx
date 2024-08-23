import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function FormTextarea({
  form,
  label,
  id,
  description,
  className,
  itemStyles,
  fieldName,
  itemKey,
}: {
  form: any;
  label: string;
  id: string;
  description?: string;
  itemStyles?: string;
  className?: string;
  fieldName?: string;
  itemKey?: any;
}) {
  return (
    <FormField
      key={itemKey}
      control={form.control}
      name={fieldName || id}
      render={({ field }) => (
        <FormItem className={itemStyles}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} className={className} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
