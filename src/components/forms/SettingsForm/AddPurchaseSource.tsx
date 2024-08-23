import FormInput from "@/components/FormInput";
import PopoverWrapper from "@/components/PopoverWrapper";
import { Button } from "@/components/ui/button";
import { UserSettingsWithSources } from "@/types";
import { slugify } from "@/util/slugify";
import { InfoIcon } from "lucide-react";
import useTanMutate from "@/hooks/useTanMutate";

export default function AddPurchaseSource({
  defaultSettings,
  form,
}: {
  defaultSettings: UserSettingsWithSources;
  form: any;
}) {
  const { mutateAsync: addSource } = useTanMutate({
    key: "settings",
    ignoreParams: true,
    reval: ["settings"],
  });

  const { mutateAsync: deleteSource } = useTanMutate({
    key: "settings",
    method: "delete",
    ignoreParams: true,
    reval: ["settings"],
  });
  const { getValues } = form;

  const handleAddSource = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const values = getValues("sources");

    if (!values) return;

    const formattedSource = {
      userId: defaultSettings.userId,
      sourceName: slugify(values),
      sourceLabel: values,
    };

    await addSource({ sourceToAdd: formattedSource, type: "source" });
    form.setValue("sources", "");
  };

  const handleRemoveSource = async (
    e: React.MouseEvent<HTMLElement>,
    sourceName: string | null,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!sourceName) {
      return;
    }

    const formattedSourceToRemove = {
      userId: defaultSettings.userId,
      sourceName: sourceName,
      sourceLabel: sourceName,
    };
    await deleteSource({
      sourceToRemove: formattedSourceToRemove,
      type: "source",
    });
  };

  return (
    <>
      <div className="w-full">
        <FormInput
          label="Add source"
          afterLabel={
            <PopoverWrapper
              trigger={<InfoIcon className="w-3 h-3" />}
              side="right"
              align="start"
              content={
                <div className="text-xs flex flex-col space-y-2">
                  <p>
                    These are the options that will be available when adding a{" "}
                    <em>purchase</em>.
                  </p>{" "}
                  <p>Removing items here will not affect any existing data.</p>
                </div>
              }
              customClasses="p-2 max-w-fit"
            />
          }
          id="sources"
          form={form}
          className="text-xs"
          afterElement={<Button onClick={handleAddSource}>Add</Button>}
        />
      </div>
      <div className="text-xs mt-0 flex items-center justify-start flex-wrap gap-y-2 pt-0">
        {defaultSettings.sources.map((source) => (
          <div
            key={source.id}
            className="px-3 py-0 border border-slate-150 rounded-sm mr-2"
          >
            <Button
              variant="ghost"
              className="py-1 px-0 m-0 mr-2 h-fit text-xs hover:bg-transparent hover:text-destructive"
              onClick={(e) => handleRemoveSource(e, source.sourceName)}
            >
              x
            </Button>
            {source.sourceLabel}
          </div>
        ))}
      </div>
    </>
  );
}
