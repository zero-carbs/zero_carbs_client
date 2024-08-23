import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

export default function DialogWrapper({
  title,
  content,
  description,
  trigger,
  open,
  setOpen,
  contentClasses,
}: {
  title: string;
  content: React.ReactNode;
  description?: string;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  contentClasses?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger stopPropagation>{trigger}</DialogTrigger>
      <DialogContent
        className={`!font-dank !bg-dialog mx-auto max-w-[95dvw] md:max-w-lg p-3 md:p-4 rounded-sm ${contentClasses}`}
      >
        <DialogHeader className="!font-ital">
          <DialogTitle className="text-left">{title}</DialogTitle>
          <DialogDescription className="text-left">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="">{content}</div>
      </DialogContent>
    </Dialog>
  );
}
