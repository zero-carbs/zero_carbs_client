import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

export default function PopoverWrapper({
  content,
  trigger,
  side = "bottom",
  sideOffset = 4,
  align = "end",
  alignOffset,
  customClasses,
  asChild,
}: {
  content: React.ReactNode;
  trigger: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  customClasses?: string;
  asChild?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger
        className="text-left"
        asChild={asChild}
        onClick={(e) => e.stopPropagation()}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={`p-6 bg-dialog border rounded-sm z-50 shadow-md ${customClasses}`}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}
