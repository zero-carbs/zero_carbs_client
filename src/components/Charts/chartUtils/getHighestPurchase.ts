import { calculateProfitMargin, price } from "@/lib/utils";
import { PurchaseWithItems } from "@/types";

export const getHighestPurchase = (dbData: PurchaseWithItems[]) => {
  if (!dbData) {
    return null
  }

  const hasSoldItem = dbData.filter((purchase) => purchase.soldTotals > 0);

  if (hasSoldItem.length === 0) {
    return {
      data: [
        { label: "Percent:", value: "0%" },
        {
          label: "Cost:",
          value: price(0),
        },
        {
          label: "Sold Price (net):",
          value: price(0),
        },
        { label: "Source:", value: "N/A" },
      ],
      name: "",
    };
  }

  const purchaseTotalCost = (data: PurchaseWithItems) =>
    data.priceTotal + data.priceShipping + data.priceTax + data.priceFees;

  const allPurchaseCosts = dbData.map((pData) => ({
    pTotalCost: purchaseTotalCost(pData),
    pSoldTotal: pData.soldTotals,
    items: pData.items,
    purchaseName: pData.purchaseName,
    datePurchased: pData.datePurchased,
    source: pData.source,
  }));

  const percentage = allPurchaseCosts.map((p) => ({
    percent: Number(calculateProfitMargin(p.pTotalCost, p.pSoldTotal)),
    name: p.purchaseName,
    datePurchased: p.datePurchased,
    source: p.source,
    purchasePrice: p.pTotalCost,
    soldTotals: p.pSoldTotal,
  }));

  const highestPercentage = percentage.sort((a, b) => b.percent - a.percent);

  const highestSoldPurchase = {
    name: highestPercentage[0].name,
    percent: highestPercentage[0].percent,
    datePurchased: highestPercentage[0].datePurchased,
    source: highestPercentage[0].source,
    purchasePrice: highestPercentage[0].purchasePrice,
    soldTotals: highestPercentage[0].soldTotals,
  };

  const highestPurchaseReturnListData = [
    { label: "Percent:", value: highestSoldPurchase.percent + "%" },
    {
      label: "Cost:",
      value: price(highestSoldPurchase.purchasePrice),
    },
    {
      label: "Sold Price (net):",
      value: price(highestSoldPurchase.soldTotals),
    },
    { label: "Source:", value: highestSoldPurchase.source },
  ];

  return {
    data: highestPurchaseReturnListData,
    name: highestSoldPurchase.name || "",
  };
};
