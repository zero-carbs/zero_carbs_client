import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useStepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import PopoverWrapper from "@/components/PopoverWrapper";
import { InfoIcon } from "lucide-react";

const InformationFormSchema = z.object({
  firstName: z.string().min(2, { message: "Please enter your first name" }),
  lastName: z.string().min(2, { message: "Please enter your last name" }),
  emailAddress: z
    .string()
    .email({ message: "Please enter a valid email address" }),
});

export default function InformationStep({
  setInformationValues,
}: {
  setInformationValues: (values: any) => void;
}) {
  const { nextStep } = useStepper();

  const form = useForm<z.infer<typeof InformationFormSchema>>({
    resolver: zodResolver(InformationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
    },
  });

  const onSubmit = (values: z.infer<typeof InformationFormSchema>) => {
    setInformationValues(values);
    nextStep();
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div className="flex justify-between gap-4">
            <FormInput
              label="First name"
              id="firstName"
              form={form}
              className="bg-background"
              itemStyles="w-full"
            />
            <FormInput
              label="Last name"
              id="lastName"
              form={form}
              className="bg-background"
              itemStyles="w-full"
            />
          </div>
          <FormInput
            label="Email address"
            id="emailAddress"
            form={form}
            className="bg-background"
            afterLabel={
              <PopoverWrapper
                trigger={<InfoIcon className="w-3 h-3" />}
                side="right"
                align="start"
                content={
                  <div className="text-xs flex flex-col space-y-2">
                    <p>
                      This is only in case Square needs to contact you about
                      anything regarding payment related issues.{" "}
                    </p>
                  </div>
                }
                customClasses="p-2 max-w-fit"
              />
            }
          />

          <div className="w-full text-right mt-8">
            <Button variant="outline">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
