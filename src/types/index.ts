import {
  DbItemSelect,
  DbListingSelect,
  DbPurchaseSelect,
  DbSources,
  DbUserSettings,
} from "@server/db/schema";

export interface PurchaseWithItems extends DbPurchaseSelect {
  items: DbItemSelect[];
}

export interface ListingWithItems extends DbListingSelect {
  items: DbItemSelect[];
}

export interface UserSettingsWithSources extends DbUserSettings {
  sources: DbSources[];
}

interface ListingTableProps {
  data: ListingWithItems;
  table: "listings";
  isMobile: boolean;
}

interface PurchaseTableProps {
  data: PurchaseWithItems;
  table: "purchases";
  isMobile: boolean;
}

export type TableProps = ListingTableProps | PurchaseTableProps;

export type PaginatedItemData = {
  id: number;
  itemName: string;
  purchaseId: number;
  listingId: number | null;
  soldPriceTotal: number;
  soldPriceShipping: number;
  soldPriceFees: number;
  soldDate: string | null;
  isSold: boolean;
  isListed: boolean;
  listedSource: string | null;
  listedSourceUrl: string | null;
  itemNotes: string | null;
};

export type PaginatedPurchaseData = {
  id: number;
  purchaseName: string;
  datePurchased: string;
  priceTotal: number;
  priceTax: number;
  priceShipping: number;
  priceFees: number;
  soldTotals: number;
  source: string;
  sourceUrl: string | null;
  purchaseNotes: string | null;
  items: PaginatedItemData[];
};

export type PaginatedListingData = {
  id: number;
  listingName: string;
  listingDate: string;
  listingPrice: number | null;
  listingSource: string | null;
  listingSourceUrl: string | null;
  listingSold: boolean;
  listingSoldPrice: number;
  listingSoldShipping: number;
  listingSoldFees: number;
  listingSoldDate: string | null;
  listingNotes: string | null;
  items: PaginatedItemData[];
};

export type Sources = {
  id: number;
  userId: string;
  sourceName: string;
  sourceLabel: string;
}[];

export type UserSettings = {
  id: string;
  settingsId: string;
  userId: string;
  theme: string;
  sources: Sources;
};

// export type paginatedListingData = {
//     id: number;
//     listingName: string;
//     listingDate: string;
//     listingPrice: number | null;
//     listingSource: string | null;
//     listingSourceUrl: string | null;
//     listingSold: boolean;
//     listingSoldPrice: number;
//   listingNotes: string;
//   listingSoldDate: string | null;
//
//     items: ItemData[];
// }
