import { useState } from "react";
import { Pencil2Icon, TrashIcon, FileTextIcon } from "@radix-ui/react-icons";
import EditPurchaseForm from "../forms/EditPurchaseForm";
import DialogWrapper from "../DialogWrapper";
import EditListingForm from "../forms/EditListingForm";
import DeleteListingForm from "../DeleteListingForm";
import PopoverWrapper from "../PopoverWrapper";
import { ListingWithItems, PurchaseWithItems } from "@/types";
import { DbItemSelect } from "@server/db/schema";

type FFF =
  | {
      data: ListingWithItems;
      type: "listings";
    }
  | {
      data: PurchaseWithItems;
      type: "purchases";
    }
  | {
      data: DbItemSelect;
      type: "items";
    };

export default function CellEditButton({ data, type }: FFF) {
  if (type === "items") return;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const dataItems = data.items;

  const allowDelete =
    type === "listings"
      ? Boolean(dataItems.filter((i) => i.listingId))
      : Boolean(dataItems.filter((i) => i.listingId === null).length);

  const formToShow = (): React.ReactNode => {
    switch (type) {
      case "purchases":
        return (
          <EditPurchaseForm
            data={data as PurchaseWithItems}
            closeModal={() => setEditOpen(false)}
          />
        );
      case "listings":
        return (
          <EditListingForm
            data={data as ListingWithItems}
            closeModal={() => setEditOpen(false)}
          />
        );
      default:
        break;
    }
  };

  const description = () => {
    switch (type) {
      case "purchases":
        return data.purchaseName;
      case "listings":
        return data.listingName;
      default:
        break;
    }
  };

  const notes = () => {
    switch (type) {
      case "purchases":
        return data.purchaseNotes;
      case "listings":
        return data.listingNotes;
      default:
        false;
    }
  };

  return (
    <div className="flex justify-end items-start gap-x-1">
      {notes() && (
        <PopoverWrapper
          asChild
          trigger={
            <div>
              <FileTextIcon className="w-4 h-4 p-0.5 text-primary-foreground/60 hover:text-primary-foreground" />
            </div>
          }
          content={<div className="text-xs">{notes()}</div>}
        />
      )}

      <DialogWrapper
        title={`Edit ${type}`}
        description={description()}
        content={formToShow()}
        trigger={
          <Pencil2Icon className="h-4 w-4 p-0.5 text-primary-foreground/60 hover:text-primary-foreground" />
        }
        open={editOpen}
        setOpen={setEditOpen}
      />

      <DialogWrapper
        title={`Delete ${type}`}
        description={description()}
        content={
          <DeleteListingForm
            data={data as any} // Fix this dumb shit
            type={type}
            setOpen={setDeleteOpen}
            allowDelete={allowDelete}
          />
        }
        trigger={
          <TrashIcon className="h-4 w-4 p-0.5 text-primary-foreground/60 hover:text-primary-foreground" />
        }
        open={deleteOpen}
        setOpen={setDeleteOpen}
      />
    </div>
  );
}
