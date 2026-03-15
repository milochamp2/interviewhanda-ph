"use client";

import { Shield, CreditCard, Smartphone } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem, motion } from "@/components/motion";
import type { Translations } from "@/lib/i18n";

interface TrustSectionProps {
  t: Translations["trust"];
}

export function TrustSection({ t }: TrustSectionProps) {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <FadeUp>
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 pulse-glow">
            <Shield className="h-8 w-8 text-indigo-600" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">{t.title}</h2>
          <p className="mb-8 text-sm text-gray-500">{t.subtitle}</p>
        </FadeUp>

        <StaggerGroup className="flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: Smartphone, label: "GCash" },
            { icon: Smartphone, label: "Maya" },
            { icon: CreditCard, label: "Visa / Mastercard" },
          ].map((m) => (
            <StaggerItem key={m.label}>
              <motion.div
                whileHover={{ y: -2 }}
                className="glow-card flex items-center gap-2.5 rounded-xl border border-gray-100/80 bg-white px-5 py-3 text-sm font-medium text-gray-700"
              >
                <m.icon className="h-4 w-4 text-indigo-400" />
                {m.label}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeUp delay={0.3}>
          <p className="mt-5 text-xs text-gray-400">{t.badge}</p>
        </FadeUp>
      </div>
    </section>
  );
}
