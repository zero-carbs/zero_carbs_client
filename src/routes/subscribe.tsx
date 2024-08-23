import SubscriptionForm from "@/components/forms/SubscriptionForm";
import { Link } from "react-router-dom";

export default function SubscribePage() {
  return (
    <div className="max-w-[600px] mx-auto mt-20">
      <div className="text-center mb-4 font-ital">
        <p>zero_carbs</p>
      <p className="text-xs">14 days free, then $3.99/mo</p>
      </div>
      <SubscriptionForm />

      <div className="text-xs mt-16 flex flex-col gap-y-4 max-w-[450px] mx-auto float-none clear-both">
        <p>All payments are processed securely with Square.</p>
        <p>
          zero_carbs does not save, store, or sell any personal payment
          information for any reason.
        </p>
        <div className="flex flex-col w-fit">
          <Link
            to="https://squareup.com/us/en/legal/general/ua"
            target="_blank"
          >
            https://squareup.com/us/en/legal/general/ua
          </Link>
          <Link
            to="https://squareup.com/us/en/legal/general/privacy-no-account"
            target="_blank"
          >
            https://squareup.com/us/en/legal/general/privacy-no-account
          </Link>
        </div>
      </div>
    </div>
  );
}
