"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Translations } from "@/lib/i18n";

interface OrderSummaryProps {
  plan: "base" | "bundle";
  t: Translations["checkout"];
}

export function OrderSummary({ plan, t }: OrderSummaryProps) {
  const isBundle = plan === "bundle";
  const label = isBundle ? t.bundlePlan : t.basePlan;
  const price = isBundle ? t.bundlePrice : t.basePrice;

  return (
    <Card className="border-gray-200 bg-white">
      <CardContent className="p-5">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          {t.orderSummary}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">{label}</span>
          <span className="text-sm font-semibold text-gray-900">{price}</span>
        </div>
        <Separator className="my-3" />
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900">{t.total}</span>
          <span className="text-xl font-bold text-indigo-600">{price}</span>
        </div>
      </CardContent>
    </Card>
  );
}
