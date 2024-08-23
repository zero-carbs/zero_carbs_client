import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "@/config/siteConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function NavLinks() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useMediaQuery("mobile");

  const handleSelectChange = (value: string) => {
    navigate(value);
  };

  const mobilePlaceholder =
    path !== "/search" &&
    path.substring(1).charAt(0).toUpperCase() + path.substring(2);

  return (
    <nav className={`flex ${!isMobile && "flex-col"} gap-2 w-full wrap`}>
      {/* Mobile */}
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="md:hidden">
          <SelectValue placeholder={mobilePlaceholder || "Select a table..."} />
        </SelectTrigger>
        <SelectContent>
          {navLinks.map((link) => (
            <SelectItem
              value={link.slug}
              key={link.slug}
              className="!font-dank"
            >
              {link.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Desktop */}
      {navLinks.map((link) => (
        <span
          key={link.slug}
          className="text-xs hidden md:flex items-center ml-2"
        >
          &gt;
          <Link
            to={link.slug}
            className={`w-fit px-2 text-xs hover:text-flamingo hidden md:block ${path === link.slug && "font-bold text-flamingo"}`}
          >
            {link.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
