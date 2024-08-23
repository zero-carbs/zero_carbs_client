/**
 * SignOutButton component displays a button that triggers user sign out.
 *
 * @param className - Optional CSS class name for styling the button.
 * @param type - The variant of the button. Can be "link", "outline", or "destructive".
 * @param label - The label or content of the button.
 * @returns JSX element representing the SignOutButton component.
 */

import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function SignOutButton({
  className,
  type,
  label,
}: {
  className?: string;
  type: "link" | "outline" | "destructive";
  label: string | React.ReactNode;
}) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };
  return (
    <Button variant={type} onClick={handleSignOut} className={className}>
      {label}
    </Button>
  );
}
