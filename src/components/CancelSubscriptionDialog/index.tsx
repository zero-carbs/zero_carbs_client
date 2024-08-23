import { useState } from "react";
import LoadingButton from "../LoadingButton";
import useTanMutate from "@/hooks/useTanMutate";
import { useTanFetch } from "@/hooks/useTanFetch";
import { replaceUUID } from "@/util/replaceUUID";

export default function CancelSubscriptionDialog() {
  const {
    mutateAsync: cancelSubscription,
    isPending: cancelSubscriptionPending,
  } = useTanMutate({
    key: "cancel-subscription",
    reval: ["user"],
  });

  const { data: userData, isLoading: userDataLoading } = useTanFetch(
    ["user"],
    true,
  );

  const [cancelStatus, setCancelStatus] = useState("");

  const handleCancelSubscription = async () => {
    const cancelSubscriptionRes = await cancelSubscription({
      ...userData.data,
    });

    if (cancelSubscriptionRes.status === "error") {
      setCancelStatus(replaceUUID(cancelSubscriptionRes.data[0].detail));
    }
  };

  return (
    <div className="flex flex-col gap-y-4 text-sm">
      <p>
        <span className="font-bold">WARNING:</span> You are about to cancel your
        subscription to zero_carbs!
      </p>
      <p>
        Make sure you&apos;ve backed up any data you don&apos;t want to lose.
      </p>
      <p>
        After the current billing cycle ends you will no longer be able to
        access zero_carbs
      </p>
      <LoadingButton
        label="Proceed"
        variant="destructive"
        loading={cancelSubscriptionPending || userDataLoading}
        onClick={handleCancelSubscription}
        className="mt-4"
        disabled={userData.data.subscriptionCanceledDate || cancelStatus}
      />
      <div className="mt-2">
        {userData.data.subscriptionCanceledDate ? (
          <p className="text-xs font-ital text-flamingo">
            Your subscription is already set to be canceled on{" "}
            {userData.data.subscriptionCanceledDate}
          </p>
        ) : (
          <p className="text-xs font-ital text-flamingo">{cancelStatus}</p>
        )}
      </div>
    </div>
  );
}
