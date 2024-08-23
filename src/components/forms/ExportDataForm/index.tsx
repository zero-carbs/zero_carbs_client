import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import useTanMutate from "@/hooks/useTanMutate";
import { buildDatestamp } from "@/util/buildDatestamp";

export default function SettingsForm() {
  const { toast } = useToast();
  const { mutateAsync: exportData, isPending: exportLoading } = useTanMutate({
    key: "export",
    ignoreParams: true,
  });

  const items = [
    { id: "purchases", label: "Purchases" },
    { id: "listings", label: "Listings" },
    { id: "items", label: "Items" },
  ];

  const exportDataSchema = z.object({
    format: z.enum(["json"], {
      required_error: "You must select a format",
    }),
    tablesToExport: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
  });

  const form = useForm<z.infer<typeof exportDataSchema>>({
    resolver: zodResolver(exportDataSchema),
    defaultValues: {
      format: "json",
      tablesToExport: ["purchases", "listings", "items"],
    },
  });

  const { getValues } = form;
  const filename = `zero_carbs_export_${buildDatestamp(new Date())}.${getValues("format")}`;

  const onSubmit = async (values: z.infer<typeof exportDataSchema>) => {
    try {
      const res = await exportData(values);

      const handleSaveAsJSON = async (
        jsonData: Record<string, unknown>,
        filename: string,
      ) => {
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${filename}`;
        link.href = url;
        link.click();
      };

      if (values.format === "json") {
        await handleSaveAsJSON(res, filename);
      }

      toast({
        title: "Export Complete",
        description: "JSON exported successfully",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-y-8">
          <div className="flex flex-col gap-y-8">
            <FormField
              control={form.control}
              name="tablesToExport"
              render={() => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="">Tables</FormLabel>
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="tablesToExport"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex items-center justify-start gap-x-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="!m-0 !p-0 !mt-1">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Format</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-x-8"
                    >
                      <FormItem className="flex items-center gap-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="json"
                            className="border border-text-primary text-primary-foreground"
                          />
                        </FormControl>
                        <FormLabel className="font-normal !m-0 !p-0 !mt-0.5">
                          JSON
                        </FormLabel>
                      </FormItem>
                      {/* <FormItem className="flex items-center gap-x-2"> */}
                      {/*   <FormControl> */}
                      {/*     <RadioGroupItem */}
                      {/*       value="csv" */}
                      {/*       className="border border-text-primary text-primary-foreground" */}
                      {/*     /> */}
                      {/*   </FormControl> */}
                      {/*   <FormLabel className="font-normal !m-0 !p-0 !mt-0.5"> */}
                      {/*     CSV */}
                      {/*   </FormLabel> */}
                      {/* </FormItem> */}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <p className="text-xs">{filename}</p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end mt-4">
          <LoadingButton
            label="Submit"
            type="submit"
            size="sm"
            loading={exportLoading}
            className="mt-2 rounded-sm"
          />
        </div>
      </form>
    </Form>
  );
}
