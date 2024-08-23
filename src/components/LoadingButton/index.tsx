import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { VariantProps } from "class-variance-authority";

export default function LoadingButton({
  className,
  disabled,
  label,
  loading,
  onClick,
  size,
  type,
  variant,
}: {
  className?: string;
  disabled?: boolean;
  label: string;
  loading: boolean;
  onClick?: () => void;
  size?: VariantProps<typeof Button>["size"];
  type?: VariantProps<typeof Button>["type"];
  variant?: VariantProps<typeof Button>["variant"];
}) {
  return (
    <Button
      variant={variant || "default"}
      disabled={disabled || loading}
      type={type || "submit"}
      size={size}
      className={className}
      onClick={onClick}
    >
      {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}
