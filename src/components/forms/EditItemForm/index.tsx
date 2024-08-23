import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "@/components/LoadingButton";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import { DbItemSelect } from "@server/db/schema";
import { useToast } from "@/components/ui/use-toast";
import useTanMutate from "@/hooks/useTanMutate";

const editItemFormSchema = z.object({
  itemName: z.string().min(2, { message: "An item name is required" }).max(256),
  itemNotes: z.string().max(5000).or(z.literal("")),
});

export default function EditItemForm({
  data,
  setOpen,
}: {
  data: DbItemSelect;
  setOpen: (value: boolean) => void;
}) {
  const { toast } = useToast();
  const { mutate: itemTrigger, isPending: itemsLoading } = useTanMutate({
    key: "items",
    method: "put",
    reval: ["purchases"],
  });

  const form = useForm<z.infer<typeof editItemFormSchema>>({
    resolver: zodResolver(editItemFormSchema),
    defaultValues: {
      itemName: data.itemName,
      itemNotes: data.itemNotes || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof editItemFormSchema>) => {
    const itemData = {
      ...data,
      ...values,
    };
    try {
      itemTrigger(itemData);

      toast({
        description: `${values.itemName} updated successfully`,
        variant: "success",
      });
      setOpen(false);
    } catch (err) {
      toast({ description: "Error updating item", variant: "destructive" });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-screen-sm space-y-4"
      >
        <FormInput form={form} label="Item name" id="itemName" />
        <FormTextarea id="itemNotes" label="Notes" form={form} />

        <div className="w-full text-right">
          <LoadingButton
            label="Submit"
            type="submit"
            loading={itemsLoading}
            disabled={!form.formState.isDirty}
          />
        </div>
      </form>
    </Form>
  );
}
