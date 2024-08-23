import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "@/components/LoadingButton";
import FormDatePicker from "@/components/FormDatePicker";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import FormCheckbox from "@/components/FormCheckbox";
import FormTextarea from "@/components/FormTextarea";
import { convertCentsToDollars, convertDollarsToCents } from "@/lib/utils";
import { ListingWithItems } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import useTanMutate from "@/hooks/useTanMutate";

const editListingFormSchema = z.object({
  listingSold: z.boolean().default(false).optional(),
  listingSoldPrice: z.string().min(1),
  listingSoldShipping: z.string().min(1),
  listingSoldFees: z.string().min(1),
  listingSoldDate: z.date().or(z.string()),
  listingNotes: z.string().max(5000).or(z.literal("")),
});

export default function EditListingForm({
  data,
  closeModal,
}: {
  data: ListingWithItems;
  closeModal: () => void;
}) {
  const { toast } = useToast();
  const { mutate: updateListing, isPending: listingsLoading } = useTanMutate({
    key: "listings",
    method: "put",
    reval: ["listings"],
  });

  const form = useForm<z.infer<typeof editListingFormSchema>>({
    resolver: zodResolver(editListingFormSchema),
    defaultValues: {
      listingSold: data.listingSold,
      listingSoldPrice: convertCentsToDollars(data.listingSoldPrice).toFixed(2),
      listingSoldShipping: convertCentsToDollars(
        data.listingSoldShipping,
      ).toFixed(2),
      listingSoldFees: convertCentsToDollars(data.listingSoldFees).toFixed(2),
      listingSoldDate: data.listingSoldDate || new Date().toISOString(),
      listingNotes: data?.listingNotes || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof editListingFormSchema>) => {
    const formattedValues = {
      ...data,
      ...values,
      listingSoldDate: new Date(values.listingSoldDate).toISOString(),
      listingSoldPrice: convertDollarsToCents(values.listingSoldPrice),
      listingSoldShipping: convertDollarsToCents(values.listingSoldShipping),
      listingSoldFees: convertDollarsToCents(values.listingSoldFees),
    };

    try {
      updateListing(formattedValues);
      toast({ description: `${data.listingName} updated`, variant: "success" });
      closeModal();
    } catch (err) {
      toast({ description: "Error updating listing", variant: "destructive" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-screen-sm space-y-4"
      >
        {/* Mark as sold */}
        <FormCheckbox form={form} label="Mark as sold" id="listingSold" />

        {form.watch("listingSold") && (
          <>
            <div className="flex min-w-full items-center justify-start gap-2">
              <FormDatePicker
                form={form}
                label="Date sold"
                id="listingSoldDate"
                placeholder="Pick a date"
                classes="w-full"
              />
            </div>

            <div className="flex items-center justify-start gap-2">
              <FormInput form={form} label="Total" id="listingSoldPrice" />
              <FormInput
                form={form}
                label="Shipping"
                id="listingSoldShipping"
              />
              <FormInput form={form} label="Fees" id="listingSoldFees" />
            </div>
          </>
        )}

        {/* Item notes */}
        <FormTextarea id="listingNotes" label="Notes" form={form} />

        <div className="w-full text-right">
          <LoadingButton
            label="Submit"
            type="submit"
            loading={listingsLoading}
            disabled={!form.formState.isDirty}
          />
        </div>
      </form>
    </Form>
  );
}
