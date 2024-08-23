import { ListingWithItems, PurchaseWithItems } from "@/types";
import { Button } from "../ui/button";
import LoadingButton from "../LoadingButton";
import { useToast } from "../ui/use-toast";
import useTanMutate from "@/hooks/useTanMutate";

// TODO: Disable deleting a purchase if there is an active listing.
// Must delete listing first.

type FFF =
  | {
      data: ListingWithItems;
      type: "listings";
      setOpen: (value: boolean) => void;
    }
  | {
      data: PurchaseWithItems;
      type: "purchases";
      setOpen: (value: boolean) => void;
    };

export default function DeleteListingForm({ data, type, setOpen }: FFF) {
  const { toast } = useToast();
  const { mutate: trigger, isPending: deleteLoading } = useTanMutate({
    key: type,
    method: "delete",
    reval: [type],
  });

  const onDelete = async () => {
    try {
      trigger(data);
      toast({
        variant: "success",
        description: `${type === "purchases" ? `${data.purchaseName} deleted` : `${data.listingName} deleted`}`,
      });
      setOpen(false);
    } catch (err) {
      toast({ description: "Something went wrong. Please try again." });
    }
  };
  return (
    <>
      {type !== "purchases" && (
        <h3>{`Are you sure you want to delete this ${type}?`}</h3>
      )}
      {type === "purchases" && (
        <p className="">
          This will also delete any items associated with this purchase.
        </p>
      )}

      <div className="w-full flex justify-end items-center gap-x-4 mt-4">
        <Button variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <LoadingButton
          label="Delete"
          type="submit"
          loading={deleteLoading}
          variant="destructive"
          onClick={onDelete}
        />
      </div>
    </>
  );
}
