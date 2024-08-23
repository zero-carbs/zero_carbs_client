export type TableHeader = {
  slug: string;
  label: string;
  width?: string;
  size?: string;
}[];

const idColSize = "30px";

export const purchaseTableHeaders: TableHeader = [
  { slug: "id", label: "ID", size: idColSize },
  { slug: "itemName", label: "Name", size: "2fr" },
  { slug: "datePurchased", label: "Date", size: "1fr" },
  { slug: "source", label: "Source", size: "1fr" },
  { slug: "isSold", label: "Sold", size: "1fr" },
  { slug: "purchasePrice", label: "Cost", size: "1fr" },
  { slug: "soldTotals", label: "Earned", size: "1fr" },
  { slug: "earningsPercent", label: "Return", size: "1fr" },
  { slug: "actions", label: " ", size: "1fr" },
];

export const purchaseTableMobileHeaders: TableHeader = [
  { slug: "id", label: "ID", size: idColSize },
  { slug: "itemName", label: "Name", size: "2fr" },
  { slug: "datePurchased", label: "Date", size: "1fr" },
];

export const purchaseTableItemHeaders: TableHeader = [
  { slug: "name", label: "Name", size: "2fr" },
  { slug: "listedSource", label: "Listed On", size: "1fr" },
  { slug: "soldDate", label: "Sold Date", size: "1fr" },
  { slug: "itemNotes", label: "Notes", size: "1fr" },
  { slug: "actions", label: " ", size: ".5fr" },
];

export const listingTableHeaders: TableHeader = [
  { slug: "id", label: "ID", size: idColSize },
  { slug: "listingName", label: "Name", size: "2fr" },
  { slug: "listingDate", label: "Listed", size: "1fr" },
  { slug: "listingSold", label: "Sold", size: "1fr" },
  { slug: "listingSource", label: "Source", size: "1fr" },
  { slug: "listingSoldPrice", label: "Amount", size: "1fr" },
  { slug: "actions", label: " ", size: ".5fr" },
];

export const listingTableMobileHeaders: TableHeader = [
  { slug: "id", label: "ID", size: idColSize },
  { slug: "listingName", label: "Name", size: "2fr" },
  { slug: "listingSold", label: "Sold", size: "1fr" },
];

export const listingTableItemHeaders: TableHeader = [
  { slug: "itemName", label: "Name", size: "2fr" },
  { slug: "purchaseId", label: "Purchase(s)", size: "1fr" },
  { slug: "itemNotes", label: "Notes", size: "1fr" },
];

export const itemTableHeaders: TableHeader = [
  { slug: "id", label: "ID", size: idColSize },
  { slug: "itemName", label: "Name", size: "2fr" },
  { slug: "itemIsListed", label: "Listed", size: "1fr" },
  { slug: "itemIsSold", label: "Sold", size: "1fr" },
];
