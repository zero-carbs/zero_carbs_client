// https://github.com/weareseeed/react-square-web-payments-sdk/issues/107
// https://github.com/weareseeed/react-square-web-payments-sdk/issues/93
// @ts-ignore
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import useTanMutate from "@/hooks/useTanMutate";
import { useNavigate } from "react-router-dom";

export default function PaymentStep({
  informationValues,
}: {
  informationValues?: {
    firstName: string;
    lastName: string;
    emailAddress: string;
  };
}) {
  const isLocal = import.meta.env.MODE === "development";

  const navigate = useNavigate();
  const { mutateAsync: makePayment, isPending: paymentPending } = useTanMutate({
    key: "subscribe",
    reval: ["user"],
  });

  const onSubmit = async (token: any) => {
    const paymentRes = await makePayment({
      sourceId: token.token,
      firstName: informationValues?.firstName,
      lastName: informationValues?.lastName,
      emailAddress: informationValues?.emailAddress,
    });


    if (!paymentPending && paymentRes.subscriptionStatus === "ACTIVE") {
      return navigate("/", { state: { isSubscribed: true } });
    }
  };

  return (
    <PaymentForm
      applicationId={
        isLocal
          ? import.meta.env.VITE_PUBLIC_SQUARE_SANDBOX_ID
          : import.meta.env.VITE_PUBLIC_SQUARE_APP_ID
      }
      cardTokenizeResponseReceived={(token: any) => onSubmit(token)}
      locationId={
        isLocal
          ? import.meta.env.VITE_PUBLIC_SQUARE_SANDBOX_LOCATION_ID
          : import.meta.env.VITE_PUBLIC_SQUARE_LOCATION_ID
      }
    >
      <CreditCard
        includeInputLabels
        buttonProps={{
          css: {
            backgroundColor: "hsl(var(--background))",
            color: "hsl(var(--primary-foreground))",
            width: "auto",
            height: "2.5rem",
            padding: ".5rem 1rem .5rem 1rem",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            borderRadius: "calc(var(--radius) - 2px)",
            float: "right",
            whiteSpace: "nowrap",
            border: "1px solid hsl(var(--input))",
            "&:hover": {
              backgroundColor: "hsl(var(--accent))",
              color: "hsl(var(--accent-foreground))",
            },
          },
        }}
        style={{
          input: {
            fontFamily: "monospace",
            fontSize: "14px",
          },
          ".message-text": { color: "#bd0c0c" },
          ".message-icon": { color: "#bd0c0c" },
        }}
      >
        Pay $3.99
      </CreditCard>
    </PaymentForm>
  );
}
