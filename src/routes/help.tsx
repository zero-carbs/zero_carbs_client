import { useState } from "react";
import DialogWrapper from "@/components/DialogWrapper";
import ContactForm from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import FrequentQuestions from "@/components/FrequentQuestions";
import { Link } from "react-router-dom";

export default function HelpPage() {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <div className="max-w-[600px] px-4 py-1 mt-2 text-sm flex flex-col gap-y-4">
      <h1 className="text-sm font-bold italic mb-4">Help</h1>
      <div className="mb-8">
        <FrequentQuestions />
      </div>
      <div>
        <p className="mb-2">
          The questions/answers above are more specific to use of the app. For
          more general questions and info check out the FAQ on the main site.
        </p>
          <span className="flex gap-x-2">
        {`>`}<Link
          to="https://zerocarbs.app/faq"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://zerocarbs.app/faq
        </Link>

          </span>
      </div>
        <hr className="my-8"/>
      <p>
        Still didn&apos;t find what you were looking for? No problem, click the button
        below to submit a ticket and I&apos;ll look in to it ASAP.
      </p>
        <div className="mt-8 max-w-fit">
      <DialogWrapper
        title="Support"
        description="Submit an issue or feature"
        setOpen={setSupportOpen}
        content={<ContactForm closeModal={() => setSupportOpen(false)} />}
        trigger={
          <Button onClick={() => setSupportOpen(true)} className="">
            Submit a ticket
          </Button>

        }
        open={supportOpen}
      />

        </div>
    </div>
  );
}
