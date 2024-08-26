import { useState } from "react";
import DialogWrapper from "@/components/DialogWrapper";
import ContactForm from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <div className="max-w-[500px] px-4 py-1 mt-2 text-sm flex flex-col gap-y-4">
      <h1 className="text-sm font-bold italic mb-4">Help</h1>
      <p>
        Didn&apos;t find what you were looking for? No problem, click the button
        below to submit a ticket and I&apos;ll look in to it ASAP.
      </p>
      <DialogWrapper
        title="Support"
        description="Submit an issue or feature"
        content={<ContactForm closeModal={() => setSupportOpen(false)} />}
        trigger={
          <Button onClick={() => setSupportOpen(true)} className="mt-8">
            Submit a ticket
          </Button>
        }
        open={supportOpen}
      />
    </div>
  );
}
