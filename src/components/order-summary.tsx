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
    <Card className="glow-card border-gray-100/80 bg-white">
      <CardContent className="p-5 sm:p-6">
        <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
          {t.orderSummary}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">{label}</span>
          <span className="text-sm font-semibold text-gray-900">{price}</span>
        </div>
        <Separator className="my-3.5 bg-gray-100/80" />
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900">{t.total}</span>
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-xl font-bold text-transparent">
            {price}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
