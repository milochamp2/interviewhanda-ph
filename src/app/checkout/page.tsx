"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, CreditCard, Smartphone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { createCheckout } from "@/lib/api";
import { ComparisonTable } from "@/components/comparison-table";
import { OrderSummary } from "@/components/order-summary";

export default function CheckoutPage() {
  const router = useRouter();
  const { language, selectedPlan, setSelectedPlan } = useAppState();
  const t = getTranslations(language);
  const [loading, setLoading] = useState(false);

  const isBundle = selectedPlan === "bundle";

  async function handlePay() {
    setLoading(true);
    try {
      const { checkoutUrl } = await createCheckout("mock-session-001", selectedPlan);
      router.push(checkoutUrl);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="border-b border-gray-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center">
          <span className="text-base font-bold text-gray-900">
            Interview<span className="text-indigo-600">Handa</span>
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">{t.checkout.title}</h1>

        {/* Plan Toggle */}
        <Card className="mb-6 border-indigo-200 bg-indigo-50/50">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <Label htmlFor="bundle-toggle" className="text-sm font-semibold text-gray-900">
                {t.checkout.upgradeToggle}
              </Label>
              <p className="text-xs text-gray-500">
                {t.checkout.bundlePrice} {language === "en" ? "total" : "kabuuan"}
              </p>
            </div>
            <Switch
              id="bundle-toggle"
              checked={isBundle}
              onCheckedChange={(checked) => setSelectedPlan(checked ? "bundle" : "base")}
            />
          </CardContent>
        </Card>

        {/* Comparison Table */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            {t.checkout.comparison.title}
          </h3>
          <ComparisonTable
            features={t.checkout.comparison.features}
            baseLabel={t.checkout.basePrice}
            bundleLabel={t.checkout.bundlePrice}
          />
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <OrderSummary plan={selectedPlan} t={t.checkout} />
        </div>

        {/* Payment Methods */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: Smartphone, label: "GCash" },
            { icon: Smartphone, label: "Maya" },
            { icon: CreditCard, label: "Cards" },
          ].map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600"
            >
              <m.icon className="h-3.5 w-3.5 text-gray-400" />
              {m.label}
            </div>
          ))}
        </div>

        {/* Pay CTA */}
        <Button
          onClick={handlePay}
          disabled={loading}
          size="lg"
          className="h-14 w-full gap-2 rounded-xl bg-indigo-600 text-base font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {t.checkout.payNow}
              {isBundle ? ` – ${t.checkout.bundlePrice}` : ` – ${t.checkout.basePrice}`}
            </>
          )}
        </Button>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Shield className="h-3.5 w-3.5" />
          {t.checkout.secure}
        </div>
      </div>
    </div>
  );
}
