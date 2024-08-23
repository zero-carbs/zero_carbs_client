import PopoverWrapper from "../PopoverWrapper";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GearIcon } from "@radix-ui/react-icons";

const SettingsMenu = ({
  handleSignOut,
}: {
  handleSignOut: () => Promise<void>;
}) => {
  return (
    <ul className="pl-5 text-xs mt-1 flex flex-col gap-1">
      <li className="py-2 md:py-0">
        <Link className="pt-6 hover:text-flamingo" to="/settings">
          Site Settings
        </Link>
      </li>
      <li className="py-2 md:py-0">
        <Link className="hover:text-flamingo" to="/user-settings">
          User Settings
        </Link>
      </li>
      <li className="py-2 md:py-0">
        <Button
          variant="link"
          className="no-tw !cursor-pointer hover:!text-flamingo"
          onClick={handleSignOut}
        >
          Logout
        </Button>
      </li>
    </ul>
  );
};

export default function UserMenuTrigger() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("mobile");

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };
  return isMobile ? (
    <PopoverWrapper
      asChild
      content={<SettingsMenu handleSignOut={handleSignOut} />}
      customClasses="py-2 px-1 max-w-[200px]"
      side="top"
      align="end"
      alignOffset={0}
      trigger={
        <Button variant="outline">
          <GearIcon className="w-4 h-4" />
        </Button>
      }
    />
  ) : (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="filters" className="border-none">
          <AccordionTrigger className="py-0 text-xs hover:no-underline hover:text-flamingo">
            &gt; Settings
          </AccordionTrigger>
          <AccordionContent className="border-none">
            <SettingsMenu handleSignOut={handleSignOut} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
