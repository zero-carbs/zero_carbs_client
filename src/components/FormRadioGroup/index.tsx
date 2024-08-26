import { FormField, FormControl, FormItem, FormLabel } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FormRadioGroup({
  form,
  id,
  label,
  options,
  orientation,
}: {
  form: any;
  id: string;
  label: string;
  options: { label: string; value: string }[];
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={`flex items-center gap-x-8 ${orientation === "vertical" ? "flex-col items-start" : ""}`}
            >
              {options.map((item: { label: string; value: string }) => (
                <FormItem
                  key={item.value}
                  className="flex items-center gap-x-2"
                >
                  <FormControl>
                    <RadioGroupItem
                      value={item.value}
                      className="border border-text-primary text-primary-foreground"
                    />
                  </FormControl>
                  <FormLabel className="font-normal !m-0 !p-0 !mt-0.5">
                    {item.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
