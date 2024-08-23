import DialogWrapper from "@/components/DialogWrapper";
import SignOutButton from "@/components/SignOutButton";
import SiteSettingsSkeleton from "@/components/Skeletons/SiteSettingsSkeleton";
import SettingsForm from "@/components/forms/SettingsForm";
import { Button } from "@/components/ui/button";
import { useTanFetch } from "@/hooks/useTanFetch";
import { Link } from "react-router-dom";
import ExportDataForm from "@/components/forms/ExportDataForm";
import CancelSubscriptionDialog from "@/components/CancelSubscriptionDialog";

export default function SiteSettingsPage() {
  const { data: userSettings, isLoading } = useTanFetch(["settings"], true);

  if (isLoading || !userSettings) {
    return <SiteSettingsSkeleton />;
  }

  return (
    <div className="max-w-[420px] px-4 py-1 mt-2">
      <h1 className="text-sm font-bold italic">Settings</h1>
      <div className="mt-8">
        <SettingsForm defaultSettings={userSettings} />
      </div>

      <div className="flex flex-col gap-y-4 mt-8 items-start justify-start">
        <span className="flex items-center gap-x-2 text-xs">
          &gt;{" "}
          <Link to="/user-settings" className="text-xs hover:underline">
            Account settings
          </Link>
        </span>

        <DialogWrapper
          title="Export Tables"
          description="Select the tables you would like to export"
          content={
            <div>
              <ExportDataForm />
            </div>
          }
          trigger={
            <span className="flex items-center gap-x-2 text-xs">
              &gt;{" "}
              <Button
                variant="link"
                className="text-primary-foreground text-xs p-0 hover:underline h-auto"
              >
                Export data
              </Button>
            </span>
          }
        />

        <DialogWrapper
          title="Cancel subscription"
          description=""
          content={<CancelSubscriptionDialog />}
          trigger={
            <span className="flex items-center gap-x-2 text-xs">
              &gt;{" "}
              <Button
                variant="link"
                className="text-primary-foreground text-xs p-0 hover:underline h-auto"
              >
                Cancel subscription
              </Button>
            </span>
          }
        />

        <span className="flex items-center gap-x-2 text-xs">
          &gt;{" "}
          <SignOutButton
            type="link"
            label="Logout"
            className="text-primary-foreground text-xs p-0 hover:underline h-auto"
          />
        </span>
      </div>
    </div>
  );
}
