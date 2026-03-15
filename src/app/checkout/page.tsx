"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, CreditCard, Smartphone, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { createCheckout } from "@/lib/api";
import { ComparisonTable } from "@/components/comparison-table";
import { OrderSummary } from "@/components/order-summary";
import { FadeUp } from "@/components/motion";

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
    <div className="luminous-bg min-h-screen bg-[var(--background)]">
      <header className="glass border-b border-gray-100/50 px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center">
          <span className="text-base font-bold tracking-tight text-gray-900">
            Interview<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Handa</span>
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-10">
        <FadeUp>
          <h1 className="mb-7 text-2xl font-bold text-gray-900 sm:text-3xl">{t.checkout.title}</h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Card className="mb-6 border-indigo-200/60 bg-gradient-to-r from-indigo-50/60 to-violet-50/30">
            <CardContent className="flex items-center justify-between p-5">
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
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">
              {t.checkout.comparison.title}
            </h3>
            <div className="glow-card overflow-hidden rounded-xl">
              <ComparisonTable
                features={t.checkout.comparison.features}
                baseLabel={t.checkout.basePrice}
                bundleLabel={t.checkout.bundlePrice}
              />
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mb-6">
            <OrderSummary plan={selectedPlan} t={t.checkout} />
          </div>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Smartphone, label: "GCash" },
              { icon: Smartphone, label: "Maya" },
              { icon: CreditCard, label: "Cards" },
            ].map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-2 rounded-xl border border-gray-100/80 bg-white px-4 py-2.5 text-xs font-medium text-gray-600 shadow-sm"
              >
                <m.icon className="h-3.5 w-3.5 text-indigo-400" />
                {m.label}
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handlePay}
              disabled={loading}
              size="lg"
              className="glow-button h-14 w-full gap-2 rounded-2xl bg-indigo-600 text-base font-semibold hover:bg-indigo-700"
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
          </motion.div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Shield className="h-3.5 w-3.5" />
            {t.checkout.secure}
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
