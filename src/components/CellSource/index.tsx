import { Link } from "react-router-dom";
import HoverCardWrapper from "../HoverCardWrapper";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { sentenceCase } from "@/util/sentenceCase";

export default function CellSource({ data }: { data: any }) {
  const { source, sourceUrl } = data;
  return sourceUrl ? (
    <HoverCardWrapper
      trigger={
        <span className="flex justify-start items-start gap-1">
          {source}{" "}
          {sourceUrl !== "" && <ExternalLinkIcon className="inline h-2 w-2" />}
        </span>
      }
      content={
        <Link
          to={sourceUrl}
          rel={sourceUrl !== "" ? "noopener noreferrer" : ""}
          target={sourceUrl !== "" ? "_blank" : ""}
        >
          <span className="flex items-center justify-between">
            {source} <ExternalLinkIcon className="h-4 w-4" />
          </span>
        </Link>
      }
    />
  ) : (
    <div>{sentenceCase(source)}</div>
  );
}
