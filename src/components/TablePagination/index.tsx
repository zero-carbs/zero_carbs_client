/**
 * TablePagination component handles pagination for a table.
 *
 * @param {string | number} page - The current page number.
 * @param {boolean} isLastPage - Indicates if the current page is the last page.
 * @returns {JSX.Element} JSX element representing the TablePagination component.
 */

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useSearchParams } from "react-router-dom";

export default function TablePagination({
  page,
  isLastPage,
}: {
  page: string | number;
  isLastPage: boolean;
}) {
  const [searchParams] = useSearchParams();
  const getParams = (type: string | number) => {
    if (type === "previous") {
      searchParams.set("p", (Number(page) - 1).toString());
      return `?${searchParams.toString()}`;
    }

    if (type === "next") {
      searchParams.set("p", (Number(page) + 1).toString());
      return `?${searchParams.toString()}`;
    }

    return `${searchParams.toString()}`;
  };

  return (
    <Pagination className="flex justify-end">
      <PaginationContent className="text-xs">
        {/* Previous Button */}
        {Number(page) !== 1 && (
          <PaginationItem className="text-xs">
            <PaginationPrevious
              label=""
              className="text-xs"
              to={getParams("previous")}
            />
          </PaginationItem>
        )}

        {/* Previous Page */}
        {Number(page) !== 1 && (
          <PaginationItem>
            <PaginationLink className="text-xs" to={getParams("previous")}>
              {Number(page) - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Current Page */}
        <PaginationItem>
          <PaginationLink
            to=""
            className="pointer-events-none text-xs text-red-400"
          >
            {Number(page)}
          </PaginationLink>
        </PaginationItem>

        {/* Next Page */}
        {!isLastPage && (
          <>
            <PaginationItem>
              <PaginationLink className="text-xs" to={getParams("next")}>
                {Number(page) + 1}
              </PaginationLink>
            </PaginationItem>

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext label="" to={getParams("next")} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
