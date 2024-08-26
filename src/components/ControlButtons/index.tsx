import DialogWrapper from "../DialogWrapper";
import AddPurchaseForm from "../forms/AddPurchaseForm";
import AddListingForm from "../forms/AddListingForm";
import { Button } from "../ui/button";
import { useState } from "react";

export default function ControlButtons() {
  const [purchasesOpen, setPurchasesOpen] = useState(false);
  const [listingsOpen, setListingsOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2 md:flex-col">
        <DialogWrapper
          title="Add Purchase"
          open={purchasesOpen}
          setOpen={setPurchasesOpen}
          content={
            <AddPurchaseForm closeModal={() => setPurchasesOpen(false)} />
          }
          trigger={
            <Button
              onClick={() => setPurchasesOpen(true)}
              size="sm"
              // className="h-full w-full rounded-sm md:h-auto md:py-2 bg-surface0/30 hover:bg-accent/10"
              className="h-full w-full rounded-sm md:h-auto md:py-2"
            >
              Add Purchase
            </Button>
          }
        />

        <DialogWrapper
          title="Add Listing"
          open={listingsOpen}
          setOpen={setListingsOpen}
          content={<AddListingForm closeModal={() => setListingsOpen(false)} />}
          trigger={
            <Button
              onClick={() => setListingsOpen(true)}
              size="sm"
              // className="h-full w-full rounded-sm md:h-auto md:py-2 bg-surface0/30 hover:bg-accent/10"
              className="h-full w-full rounded-sm md:h-auto md:py-2"
            >
              Add Listing
            </Button>
          }
        />
      </div>
    </>
  );
}
