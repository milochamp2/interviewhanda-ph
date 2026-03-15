"use client";

import { ClipboardList, MessageSquare, Award } from "lucide-react";
import type { Translations } from "@/lib/i18n";

const icons = [ClipboardList, MessageSquare, Award];

interface HowItWorksProps {
  t: Translations["howItWorks"];
}

export function HowItWorks({ t }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {t.title}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {t.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Step {i + 1}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
