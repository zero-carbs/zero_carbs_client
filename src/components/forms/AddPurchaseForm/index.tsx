import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormDatePicker from "@/components/FormDatePicker";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import FormCheckbox from "@/components/FormCheckbox";
import { convertDollarsToCents } from "@/lib/utils";
import FormTextarea from "@/components/FormTextarea";
import FormSelectMultiple from "@/components/FormSelectMultiple";
import { getFormattedSources } from "@/util/getFormattedSources";
import { slugify } from "@/util/slugify";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/components/ui/use-toast";
import { useTanFetch } from "@/hooks/useTanFetch";
import useTanMutate from "@/hooks/useTanMutate";

const formSchema = z.object({
  purchaseName: z.string().min(2, {
    message: "Must be at least 2 characters.",
  }),
  datePurchased: z.date(),
  priceTotal: z.coerce.number().min(0),
  priceTax: z.coerce.number().min(0),
  priceShipping: z.coerce.number().min(0),
  priceFees: z.coerce.number().min(0),
  source: z.array(z.object({ label: z.string(), value: z.string() })),
  sourceUrl: z.string().url().or(z.literal("")),
  multipleItems: z.boolean().default(false).optional(),
  purchaseNotes: z.string().max(5000).optional(),
  items: z.array(z.object({ itemName: z.string() })),
});

export default function AddPurchaseForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { toast } = useToast();

  const { mutateAsync: pMutate, isPending: postLoading } = useTanMutate({
    key: "purchases",
    reval: ["purchases", "chart-data"],
  });

  const { data: userSettings, isLoading } = useTanFetch(["settings"], true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchaseName: "",
      datePurchased: new Date(),
      priceTotal: 0,
      priceTax: 0,
      priceShipping: 0,
      priceFees: 0,
      source: [] || "",
      sourceUrl: "",
      multipleItems: false,
      purchaseNotes: "",
      items: [{ itemName: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  const formattedSources = getFormattedSources(userSettings);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.source.length === 0) {
      form.setError("source", { message: "Click 'create' in the dropdown" });
      return;
    }

    if (form.getValues("source").length === 0) {
      form.setError("source", { message: "Click 'create' in the dropdown" });
    }

    // Clean up blank item names from fieldArray
    const cleanItems = values.multipleItems
      ? values.items.filter((v) => v.itemName !== "")
      : [{ itemName: "" }];

    const formattedValues = {
      ...values,
      items: cleanItems,
      source: {
        sourceName: slugify(values.source[0]?.label),
        sourceLabel: values.source[0]?.label,
      },
      priceTotal: convertDollarsToCents(values.priceTotal),
      priceTax: convertDollarsToCents(values.priceTax),
      priceShipping: convertDollarsToCents(values.priceShipping),
      priceFees: convertDollarsToCents(values.priceFees),
    };

    try {
      await pMutate(formattedValues);

      toast({
        variant: "success",
        description: `${values.purchaseName} added.`,
      });
      closeModal();
    } catch (err) {
      toast({
        title: "Something went wrong...",
        description: "Your purchase was not added. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isMultipleItems = form.watch("multipleItems");

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-screen-md space-y-4"
        >
          <FormCheckbox
            label="This purchase contains multiple items"
            id="multipleItems"
            form={form}
          />

          {/* Row one */}
          <div className="flex w-full items-center gap-4">
            <FormInput
              itemStyles="grow"
              label={`${isMultipleItems ? "Purchase" : "Item"} Name`}
              id="purchaseName"
              form={form}
            />

            <FormDatePicker
              label="Date Purchased"
              id="datePurchased"
              form={form}
            />
          </div>

          {/* Price row */}
          <div className="flex justify-between gap-4">
            <FormInput label="Total" id="priceTotal" form={form} />
            <FormInput label="Tax" id="priceTax" form={form} />
            <FormInput label="Shipping" id="priceShipping" form={form} />
            <FormInput label="Fees" id="priceFees" form={form} />
          </div>

          {/* Source row */}
          <div className="flex gap-4 items-center">
            <div className="w-[50%] -mb-1">
              {!isLoading && (
                <FormSelectMultiple
                  id="source"
                  label="Source"
                  maxSelected={1}
                  creatable
                  options={formattedSources}
                  placeholder="Select or add a source"
                  form={form}
                  singleItem
                  customBadgeClasses="p-0 m-0 max-w-[100%] text-primary-foreground text-md shadow-none"
                />
              )}
            </div>

            <FormInput
              itemStyles="grow"
              label="Source URL"
              id="sourceUrl"
              form={form}
            />
          </div>

          <FormTextarea id="purchaseNotes" form={form} label="Notes" />

          {isMultipleItems && (
            <div className="max-h-[400px] overflow-y-scroll px-2">
              {fields.map((field, index) => {
                return (
                  <div className="flex items-center" key={field.id}>
                    <FormInput
                      label={`${index + 1}. Item Name`}
                      id={`items.${index}.itemName`}
                      fieldName={`items.${index}.itemName`}
                      form={form}
                      itemStyles="grow"
                      onKeyDown={(e: any) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          append({ itemName: "" });
                        }
                      }}
                      afterElement={
                        <Button
                          variant="ghost"
                          className="text-xs uppercase"
                          style={{ display: index === 0 ? "none" : "inline" }}
                          disabled={index === 0}
                          onClick={(e) => {
                            e.preventDefault();
                            remove(index);
                          }}
                        >
                          Remove
                        </Button>
                      }
                    />
                  </div>
                );
              })}

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  append({ itemName: "" });
                }}
              >
                Add Item
              </Button>
            </div>
          )}

          <div className="w-full text-right">
            <LoadingButton
              label="Submit"
              type="submit"
              loading={postLoading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
