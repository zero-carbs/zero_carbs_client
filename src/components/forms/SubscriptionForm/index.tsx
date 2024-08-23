import { useState } from "react";
import { cn } from "@/lib/utils";
import { Step, Stepper, type StepItem } from "@/components/ui/stepper";
import InformationStep from "./InformationStep";
import PaymentStep from "./PaymentStep";

export default function SubscriptionForm() {
  const steps = [
    { label: "Information" },
    { label: "Payment" },
  ] satisfies StepItem[];

  const [infoState, setInfoState] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
  });

  const setInformationValues = (values: any) => {
    setInfoState(values);
  };

  return (
    <Stepper
      initialStep={0}
      variant="circle-alt"
      steps={steps}
      styles={{
        "step-button-container": cn(
          "text-primary-foreground",
          "data-[current=true]:text-primary data-[current=true]:border-accent data-[current=true]:bg-flamingo",
          "data-[active=true]:text-primary data-[active=true]:border-success data-[active=true]:bg-success",
        ),
        "horizontal-step": cn("after:data-[completed=true]:bg-red-400"),
        "horizontal-step-container": cn("text-primary-foreground"),
      }}
    >
      {steps.map((stepProps, index) => {
        if (index === 0) {
          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="mt-20">
                <InformationStep
                  setInformationValues={(informationStepValues) =>
                    setInformationValues(informationStepValues)
                  }
                />
              </div>
            </Step>
          );
        }

        return (
          <Step key={stepProps.label} {...stepProps}>
            <div className="mt-20">
              <PaymentStep informationValues={infoState} />
            </div>
          </Step>
        );
      })}
    </Stepper>
  );
}
