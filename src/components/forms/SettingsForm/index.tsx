import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import FormSelect from "@/components/FormSelect";
import AddPurchaseSource from "./AddPurchaseSource";
import { useTheme } from "@/components/themeProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import useTanMutate from "@/hooks/useTanMutate";

export default function SettingsForm({
  defaultSettings,
}: {
  defaultSettings: any;
}) {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutateAsync: updateSettings, isPending: settingsLoading } =
    useTanMutate({
      key: "settings",
      ignoreParams: true,
      reval: ["settings", "all"],
    });

  const searchFormSchema = z.object({
    sources: z.string().optional(),
    theme: z.enum(["light", "dark", "system", "catppuccin-mocha"]),
  });

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      sources: "",
      theme: defaultSettings.theme,
    },
  });

  const onSubmit = async (values: z.infer<typeof searchFormSchema>) => {
    const newSettings = Object.entries(values)
      .filter((key) => key[0] !== "sources")
      .map((item) => {
        const newObj = {
          userId: defaultSettings.userId,
          [item[0]]: item[1],
        };
        return newObj;
      });

    try {
      await updateSettings(newSettings[0]);
      const { theme } = values;
      setTheme(theme);
      navigate("/settings");
      toast({
        description: "Settings updated successfully",
        variant: "success",
      });
    } catch (err) {
      toast({
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-y-8">
          <div className="">
            <AddPurchaseSource form={form} defaultSettings={defaultSettings} />
          </div>

          <FormSelect
            id="theme"
            label="Theme"
            form={form}
            options={[
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" },
              { label: "Catppuccin Mocha", value: "catppuccin-mocha" },
            ]}
          />
        </div>
        <div className="w-full flex justify-end mt-4">
          <LoadingButton
            label="Submit"
            type="submit"
            size="sm"
            loading={settingsLoading}
            className="mt-2 rounded-sm"
          />
        </div>
      </form>
    </Form>
  );
}
