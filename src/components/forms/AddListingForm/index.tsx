import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormDatePicker from "@/components/FormDatePicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/components/ui/use-toast";
import { useTanFetch } from "@/hooks/useTanFetch";
import useTanMutate from "@/hooks/useTanMutate";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  listingName: z.string().min(2, {
    message: "Must be at least 2 characters.",
  }),
  listingDate: z.date(),
  listingSource: z.string().min(2, { message: "A source is required" }),
  listingSourceUrl: z.string().url().or(z.literal("")),
  listingNotes: z.string().max(5000).optional(),
  listingItems: z.any().optional(),
});

export default function AddListingForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listingName: "",
      listingDate: new Date(),
      listingSource: "",
      listingSourceUrl: "",
      listingNotes: "",
    },
  });

  const { toast } = useToast();
  const { mutateAsync: listingsMutate, isPending: postLoading } = useTanMutate({
    key: "listings",
    reval: ["listings", "chart-data", "purchases"],
  });

  const { data: allItems, isLoading } = useTanFetch(["all-items"], true);

  const itemArray: Option[] =
    !isLoading &&
    allItems
      .filter((i: any) => i.isSold === false && i.isListed === false)
      .map((item: any) => {
        const itemData = {
          label: item.itemName,
          value: item.id,
          ...item,
        };
        return itemData;
      });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await listingsMutate(values);
      toast({
        description: `${values.listingName} added.`,
        variant: "success",
      });

      closeModal();
    } catch (err) {
      toast({ description: "Something went wrong...", variant: "destructive" });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Row one */}
          <div className="flex w-full justify-between gap-6">
            <FormInput label="Listing title" id="listingName" form={form} />

            <FormDatePicker label="Date listed" id="listingDate" form={form} />
          </div>

          {/* Row two */}
          <div className="flex w-full justify-between gap-4">
            <FormInput
              itemStyles="grow"
              label="Source"
              id="listingSource"
              form={form}
            />
            <FormInput
              itemStyles="grow"
              label="Source URL"
              id="listingSourceUrl"
              form={form}
            />
          </div>

          <ul className="list-disc pl-4">
            {form.watch("listingItems")?.map((item: any) => (
              <li key={item.value} className="text-xs">
                {item.label}
              </li>
            ))}
          </ul>

          <FormField
            control={form.control}
            name="listingItems"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Items in this listing</FormLabel>
                  {isLoading || !allItems ? (
                    <Skeleton className="w-full h-[40px] bg-surface0 rounded-md" />
                  ) : (
                    <FormControl>
                      <MultipleSelector
                        hidePlaceholderWhenSelected
                        value={field.value}
                        onChange={field.onChange}
                        options={itemArray}
                        placeholder="Select the items in this listing"
                        emptyIndicator={
                          <p className="text-center text-xs">
                            No results found.
                          </p>
                        }
                        badgeClassName="rounded-sm text-xs text-ellipsis overflow-hidden bg-flamingo/10 text-primary-foreground 
                      hover:bg-flamingo/15"
                      />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormTextarea id="listingNotes" form={form} label="Notes" />

          <div className="w-full text-right">
            <LoadingButton
              label="Submit"
              type="submit"
              loading={postLoading}
              className="border"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
