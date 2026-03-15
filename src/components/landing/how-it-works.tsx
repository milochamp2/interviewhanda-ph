"use client";

import { ClipboardList, MessageSquare, Award } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/motion";
import type { Translations } from "@/lib/i18n";

const icons = [ClipboardList, MessageSquare, Award];

interface HowItWorksProps {
  t: Translations["howItWorks"];
}

export function HowItWorks({ t }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="relative px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeUp>
          <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            {t.title}
          </h2>
        </FadeUp>

        <StaggerGroup className="grid gap-6 sm:grid-cols-3" slow>
          {t.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={i}>
                <div className="glow-card group flex flex-col items-center rounded-2xl border border-gray-100/80 bg-white p-7 text-center dark:border-white/10 dark:bg-white/5">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 transition-transform duration-300 group-hover:scale-110 dark:from-indigo-900/40 dark:to-indigo-800/20">
                    <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400">
                    Step {i + 1}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
