"use client";

import { Shield, CreditCard, Smartphone } from "lucide-react";
import type { Translations } from "@/lib/i18n";

interface TrustSectionProps {
  t: Translations["trust"];
}

export function TrustSection({ t }: TrustSectionProps) {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <Shield className="mx-auto mb-4 h-10 w-10 text-indigo-600" />
        <h2 className="mb-2 text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="mb-8 text-sm text-gray-500">{t.subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { icon: Smartphone, label: "GCash" },
            { icon: Smartphone, label: "Maya" },
            { icon: CreditCard, label: "Visa / Mastercard" },
          ].map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm"
            >
              <m.icon className="h-4 w-4 text-gray-400" />
              {m.label}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400">{t.badge}</p>
      </div>
    </section>
  );
}
