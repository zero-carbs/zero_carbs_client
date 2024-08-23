/**
 * Renders a card component with an optional title, description, content, and footer.
 *
 * @param {Object} props - The props for the CardWrapper component.
 * @param {string} [props.title] - The title of the card.
 * @param {string} [props.description] - The description of the card.
 * @param {React.ReactNode} props.content - The content of the card.
 * @param {React.ReactNode} [props.footer] - The footer of the card.
 * @param {string} [props.classes] - Additional CSS classes for the card.
 * @param {string} [props.contentClasses] - Additional CSS classes for the card content.
 * @returns {JSX.Element} The rendered CardWrapper component.
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function CardWrapper({
  title,
  description,
  content,
  footer,
  classes,
  contentClasses,
}: {
  title?: string;
  description?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  classes?: string;
  contentClasses?: string;
}) {
  return (
    <Card className={`w-full rounded-sm ${classes}`}>
      <CardHeader className={`${title || description ? "p-4" : "p-0"} pb-0`}>
        {title && <CardTitle className="font-bold">{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={`p-4 ${contentClasses}`}>{content}</CardContent>
      {footer && <CardFooter className="p-4">{footer}</CardFooter>}
    </Card>
  );
}
