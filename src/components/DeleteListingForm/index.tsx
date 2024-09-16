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
      allowDelete?: boolean;
    }
  | {
      data: PurchaseWithItems;
      type: "purchases";
      setOpen: (value: boolean) => void;
      allowDelete?: boolean;
    };

export default function DeleteListingForm({
  data,
  type,
  setOpen,
  allowDelete,
}: FFF) {
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
        <p>{`Are you sure you want to delete this ${type.substring(0, type.length - 1)}?`}</p>
      )}
      {type === "purchases" && (
        <p className="">
          {allowDelete
            ? "This will also delete any items associated with this purchase."
            : "This purchase has active listings. You must delete the listings first."}
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
          disabled={!allowDelete}
        />
      </div>
    </>
  );
}
