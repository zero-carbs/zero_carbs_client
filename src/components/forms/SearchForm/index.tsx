import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import FormCheckbox from "@/components/FormCheckbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchForm({ autoFocus }: { autoFocus?: boolean }) {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const searchFormSchema = z.object({
    searchTerm: z
      .string()
      .min(3, {
        message: "Must be at least 2 characters.",
      })
      .or(z.literal("")),
    selectPurchases: z.boolean(),
    selectListings: z.boolean(),
    selectItems: z.boolean(),
  });

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchTerm: "",
      selectPurchases: false,
      selectListings: false,
      selectItems: false,
    },
  });

  const onSubmit = (values: z.infer<typeof searchFormSchema>) => {
    searchParams.delete("p");
    searchParams.set("q", values.searchTerm);
    values.selectPurchases
      ? searchParams.set("sp", String(values.selectPurchases))
      : searchParams.delete("sp");
    values.selectListings
      ? searchParams.set("sl", String(values.selectListings))
      : searchParams.delete("sl");
    values.selectItems
      ? searchParams.set("si", String(values.selectItems))
      : searchParams.delete("si");

    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          label=""
          placeholder="Search..."
          id="searchTerm"
          form={form}
          className="text-xs"
          autoFocus={autoFocus}
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="filters" className="border-none">
            <AccordionTrigger className="flex w-full justify-end py-0 text-right text-xs">
              Filter
            </AccordionTrigger>
            <AccordionContent className="border-none">
              <div className="flex flex-col gap-y-1 text-xs">
                <FormCheckbox
                  className="text-xs"
                  label="Purchases"
                  id="selectPurchases"
                  form={form}
                />
                <FormCheckbox
                  className="text-xs"
                  label="Listings"
                  id="selectListings"
                  form={form}
                />
                <FormCheckbox
                  className="text-xs"
                  label="Items"
                  id="selectItems"
                  form={form}
                />
              </div>
              {form.formState.isSubmitted && form.formState.isDirty && (
                <Button size="sm" className="mt-4 w-full rounded-sm">
                  Search
                </Button>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
}
