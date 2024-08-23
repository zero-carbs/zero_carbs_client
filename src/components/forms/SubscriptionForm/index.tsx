import { useState } from "react";
import { cn } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import FormInput from "@/components/FormInput";
// import FormTextarea from "@/components/FormTextarea";
// import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
// import LoadingButton from "@/components/LoadingButton";
// import { useToast } from "@/components/ui/use-toast";
// import { useTanFetch } from "@/hooks/useTanFetch";
// import useTanMutate from "@/hooks/useTanMutate";
// import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
// import { Skeleton } from "@/components/ui/skeleton";
// import CreditCardInput from "@/components/FormInputCreditCard";
import {
  Step,
  Stepper,
  // useStepper,
  type StepItem,
} from "@/components/ui/stepper";
import InformationStep from "./InformationStep";
import PaymentStep from "./PaymentStep";

// const formSchema = z.object({
//   firstName: z.string().min(2),
//   lastName: z.string().min(2),
//   emailAddress: z
//     .string()
//     .email({ message: "Please enter a valid email address" }),
// });

export default function SubscriptionForm() {
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     firstName: "",
  //     lastName: "",
  //     emailAddress: "",
  //   },
  // });

  // const { toast } = useToast();
  // const {
  // mutateAsync: createSubscription,
  // isPending: createSubscriptionLoading,
  // } = useTanMutate({
  // key: "subscribe",
  // reval: ["listings", "chart-data"],
  // });

  // const { data: allItems, isLoading } = useTanFetch(["all-items"], true);
  // const { getValues, setValue, formState } = form;

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  // const onSubmit = async (token: any, verifiedBuyer: any) => {
  //   console.log("token", token);
  //   console.log("verifiedBuyer", verifiedBuyer);
  //
  //   const values = getValues();
  //   const formIsValid = formSchema.safeParse(values);
  //   console.log("formIsValid:", formIsValid);
  //   if (!formIsValid.success) {
  //     console.log("invalid form");
  //     console.log("formState.errors", formState);
  //     return;
  //   }
  //
  //   try {
  //     // const paymentRes = await createSubscription({ sourceId: token.token });
  //     console.log("paymentRes");
  //     // await createSubscription(values);
  //     toast({
  //       description: `Subscription created!`,
  //       variant: "success",
  //     });
  //   } catch (err) {
  //     toast({ description: "Something went wrong...", variant: "destructive" });
  //   }
  // };

  // const dummySubmit = () => {};

  const steps = [
    { label: "Information" },
    { label: "Payment" },
  ] satisfies StepItem[];

  // function StepperFormActions() {
  //   const {
  //     prevStep,
  //     resetSteps,
  //     isDisabledStep,
  //     hasCompletedAllSteps,
  //     isLastStep,
  //     isOptionalStep,
  //   } = useStepper();
  //
  //   return (
  //     <div className="flex w-full justify-end gap-2">
  //       {hasCompletedAllSteps ? (
  //         <Button size="sm" onClick={resetSteps}>
  //           Reset
  //         </Button>
  //       ) : (
  //         <>
  //           <Button
  //             disabled={isDisabledStep}
  //             onClick={prevStep}
  //             size="sm"
  //             variant="secondary"
  //           >
  //             Prev
  //           </Button>
  //           <Button size="sm">
  //             {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
  //           </Button>
  //         </>
  //       )}
  //     </div>
  //   );
  // }

  // function MyStepperFooter() {
  //   const { activeStep, resetSteps, steps } = useStepper();
  //
  //   if (activeStep !== steps.length) return null;
  //
  //   return (
  //     <div className="flex items-center justify-end gap-2">
  //       <Button onClick={resetSteps}>Reset Stepper with Form</Button>
  //     </div>
  //   );
  // }

  const [infoState, setInfoState] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
  });

  const setInformationValues = (values: any) => {
    console.log("setInformationValues", values);
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
        "horizontal-step-container": cn("text-primary-foreground")
        // "step-button-container": cn(
        // "data-[active=true]: bg-background",
        // "data-[current=true]: bg-red-600",
        // ),
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
      {/* <MyStepperFooter /> */}
    </Stepper>
  );
}
