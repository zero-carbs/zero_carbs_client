import { Link, useSearchParams } from "react-router-dom";

export default function TableHeaderLinks({
  label,
  slug,
}: {
  label: string;
  slug: string;
}) {
  const [searchParams] = useSearchParams();

  const ignoreSort = ["isSold", "earningsPercent"];
  const order = searchParams.get("order") === "asc" ? "desc" : "asc";

  const getParamString = () => {
    searchParams.set("sort", slug);
    searchParams.set("order", order);
    return `?${searchParams.toString()}`;
  };

  return (
    <Link
      to={getParamString()}
      replace={true}
      className={`${ignoreSort.includes(slug) ? "pointer-events-none" : ""}`}
    >
      {label}
    </Link>
  );
}
