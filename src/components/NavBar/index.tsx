import ControlButtons from "../ControlButtons";
import NavLinks from "../NavLinks";
import MobileSearchButton from "../MobileSearchButton";
import SearchForm from "../forms/SearchForm";
import UserMenuTrigger from "../UserMenuTrigger";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Link } from "react-router-dom";

export default function NavBar() {
  const isMobile = useMediaQuery("mobile");

  return isMobile ? (
    <div
      className="fixed flex flex-wrap bottom-0 gap-2 justify-between pt-4 pb-2 px-2 z-10 border-t w-full bg-primary"
      style={{ boxShadow: "0 -1px 2px 0px rgb(0 0 0 / 0.05)" }}
    >
      <div className="grow w-full">
        <NavLinks />
      </div>

      <div className="flex">
        <ControlButtons />
      </div>

      <div className="flex gap-2">
        <div className="">
          <MobileSearchButton />
        </div>

        <div className="h-full flex flex-col justify-start ml-2">
          <UserMenuTrigger />
        </div>
      </div>
    </div>
  ) : (
    <div className="z-10 col-span-1 flex flex-col w-full gap-4 px-2 py-3 relative row-start-1 justify-start">
      <ControlButtons />
      <hr className="my-2 hidden md:inline" />
      <div className="hidden md:inline">
        <SearchForm />
      </div>
      <div className="md:hidden">
        <MobileSearchButton />
      </div>
      <hr className="my-2 hidden md:inline" />
      <NavLinks />
      <hr className="my-2" />
      <div className="h-full flex flex-col justify-start ml-2">
        <span className="text-xs flex items-center gap-x-2">
          &gt;{" "}
          <Link className="text-xs hover:text-flamingo" to="/settings">
            Settings
          </Link>
        </span>
      </div>
    </div>
  );
}
