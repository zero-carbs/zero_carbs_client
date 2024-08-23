import { UserProfile } from "@clerk/clerk-react";

export default function UserSettingsPage() {
  return <UserProfile path="/user-settings" />;
}
