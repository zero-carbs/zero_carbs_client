import { Input } from "../ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function FormInput({
  form,
  label,
  id,
  description,
  className,
  itemStyles,
  fieldName,
  itemKey,
  afterElement,
  placeholder,
  autoFocus,
  afterLabel,
  onKeyDown,
}: {
  form: any;
  label: string;
  id: string;
  description?: string;
  itemStyles?: string;
  className?: string;
  fieldName?: string;
  itemKey?: any;
  afterElement?: React.ReactNode;
  placeholder?: string;
  autoFocus?: boolean;
  afterLabel?: React.ReactNode;
  onKeyDown?: any;
}) {
  return (
    <FormField
      key={itemKey}
      control={form.control}
      name={fieldName || id}
      render={({ field }) => (
        <FormItem className={itemStyles}>
          <FormLabel>
            <span className={`${afterLabel && "flex gap-2 items-center"}`}>
              {label}
              {afterLabel || ""}
            </span>
          </FormLabel>
          <FormControl className="w-full">
            <div
              className={`${afterElement && "flex gap-2 items-center justify-start"}`}
            >
              <Input
                {...field}
                className={className}
                placeholder={placeholder}
                autoFocus={autoFocus}
                onKeyDown={onKeyDown}
              />
              {afterElement || null}
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
