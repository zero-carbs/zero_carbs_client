/**
 * HoverCardWrapper component displays a hover card with trigger and content.
 *
 * @param trigger - The element that triggers the hover card.
 * @param content - The content displayed in the hover card.
 * @param triggerClasses - Optional classes for styling the trigger element.
 * @returns JSX element representing the HoverCardWrapper component.
 */

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export default function HoverCardWrapper({
  trigger,
  content,
  triggerClasses,
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  triggerClasses?: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className={triggerClasses}>{trigger}</div>
      </HoverCardTrigger>
      <HoverCardContent className="!font-dank w-40 rounded-sm px-4 shadow-sm">
        <div className="p-1">{content}</div>
      </HoverCardContent>
    </HoverCard>
  );
}
