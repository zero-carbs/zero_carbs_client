import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "@/components/LoadingButton";
import FormDatePicker from "@/components/FormDatePicker";
import { convertDollarsToCents, convertCentsToDollars } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import FormSelectMultiple from "@/components/FormSelectMultiple";
import { getFormattedSources } from "@/util/getFormattedSources";
import { slugify } from "@/util/slugify";
import { PurchaseWithItems } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useTanFetch } from "@/hooks/useTanFetch";
import useTanMutate from "@/hooks/useTanMutate";

const editPurchaseFormSchema = z.object({
  purchaseNotes: z.string().max(5000),
  purchaseName: z.string().min(1, { message: "A name is required" }),
  datePurchased: z.date().or(z.string()),
  priceTotal: z.string().min(1),
  priceTax: z.string().min(1),
  priceShipping: z.string().min(1),
  priceFees: z.string().min(1),
  source: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, { message: "A source is required" }),
  sourceUrl: z.string().or(z.literal("")),
});

export default function EditPurchaseForm({
  data,
  closeModal,
}: {
  data: PurchaseWithItems;
  closeModal: () => void;
}) {
  const { toast } = useToast();
  const { data: userSettings } = useTanFetch(["settings"], true);
  const { mutate: trigger, isPending: purchasesLoading } = useTanMutate({
    key: "purchases",
    method: "put",
    reval: ["purchases"],
  });

  const formattedSources = getFormattedSources(userSettings);

  const form = useForm<z.infer<typeof editPurchaseFormSchema>>({
    resolver: zodResolver(editPurchaseFormSchema),
    defaultValues: {
      purchaseNotes: data?.purchaseNotes || "",
      purchaseName: data.purchaseName,
      datePurchased: new Date(data.datePurchased).toISOString(),
      priceTotal: convertCentsToDollars(data.priceTotal).toFixed(2),
      priceTax: convertCentsToDollars(data.priceTax).toFixed(2),
      priceShipping: convertCentsToDollars(data.priceShipping).toFixed(2),
      priceFees: convertCentsToDollars(data.priceFees).toFixed(2),
      source: [{ label: data.source, value: slugify(data.source) }] || [],
      sourceUrl: data.sourceUrl || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof editPurchaseFormSchema>) => {
    const { ...purchaseData } = data;
    const formattedValues = {
      ...purchaseData,
      ...values,
      datePurchased: new Date(values.datePurchased).toISOString(),
      priceTotal: convertDollarsToCents(Number(values.priceTotal)),
      priceTax: convertDollarsToCents(Number(values.priceTax)),
      priceShipping: convertDollarsToCents(Number(values.priceShipping)),
      priceFees: convertDollarsToCents(Number(values.priceFees)),
      source: values.source[0].label,
    };

    try {
      trigger(formattedValues);
      toast({
        description: `${values.purchaseName} updated`,
        variant: "success",
      });
      closeModal();
    } catch (err) {
      toast({
        description: "There was an error updating this purchase",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-screen-sm space-y-4"
      >
        <div className="flex justify-between gap-4">
          <FormInput form={form} label="Purchase name" id="purchaseName" />
          <FormDatePicker
            form={form}
            label="Date purchased"
            id="datePurchased"
            placeholder="Pick a date"
            classes=""
          />
        </div>

        <div className="flex justify-between gap-4">
          <FormInput label="Total Price" id="priceTotal" form={form} />
          <FormInput label="Tax" id="priceTax" form={form} />
          <FormInput label="Shipping" id="priceShipping" form={form} />
          <FormInput label="Fees" id="priceFees" form={form} />
        </div>

        <div className="flex gap-4">
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

          <FormInput
            itemStyles="grow"
            label="Source URL"
            id="sourceUrl"
            form={form}
          />
        </div>

        {/* Item notes */}
        <FormTextarea id="purchaseNotes" label="Notes" form={form} />

        <div className="w-full text-right">
          <LoadingButton
            label="Submit"
            type="submit"
            loading={purchasesLoading}
            disabled={!form.formState.isDirty}
          />
        </div>
      </form>
    </Form>
  );
}
