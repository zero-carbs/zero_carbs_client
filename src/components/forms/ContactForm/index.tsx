import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/components/ui/use-toast";
import FormTextarea from "@/components/FormTextarea";
import FormRadioGroup from "@/components/FormRadioGroup";
import useTanMutate from "@/hooks/useTanMutate";

export default function ContactForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { toast } = useToast();
  const { mutateAsync: sendContactData, isPending: contactDataLoading } =
    useTanMutate({
      key: "contact",
      ignoreParams: true,
    });

  const contactFormSchema = z.object({
    contactFormContent: z
      .string()
      .min(1, { message: "This field is required" })
      .max(500, { message: "The maximum length is 500" }),
    typeOfIssue: z.string(),
  });

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactFormContent: "",
      typeOfIssue: "issue",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      const contactFormRes = await sendContactData(values);
      if (contactFormRes.status === "success") {
        toast({
          title: "Thank you!",
          description: `Your ${values.typeOfIssue} has been sent`,
          variant: "success",
        });

        closeModal();
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }
  };

  const formTypeOptions = [
    { label: "Issue with the site", value: "issue" },
    { label: "Feature request", value: "feature" },
  ];

  const { watch } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8"
      >
        <FormRadioGroup
          id="typeOfIssue"
          form={form}
          label="Reason"
          options={formTypeOptions}
          orientation="vertical"
        />
        <FormTextarea
          id="contactFormContent"
          form={form}
          label={`Describe the ${watch("typeOfIssue") === "issue" ? "issue" : "feature"}`}
        />
        <div className="flex justify-end">
          <LoadingButton label="Submit" loading={contactDataLoading} />
        </div>
      </form>
    </Form>
  );
}
