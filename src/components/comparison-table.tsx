"use client";

import { Check, X } from "lucide-react";

interface Feature {
  label: string;
  base: boolean;
  bundle: boolean;
}

interface ComparisonTableProps {
  features: readonly Feature[];
  baseLabel: string;
  bundleLabel: string;
}

export function ComparisonTable({ features, baseLabel, bundleLabel }: ComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100/80 bg-white dark:border-white/10 dark:bg-white/5">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100/80 bg-gray-50/60 dark:border-white/10 dark:bg-white/5">
            <th className="px-4 py-3.5 text-left font-medium text-gray-500 dark:text-gray-400">Feature</th>
            <th className="px-4 py-3.5 text-center font-medium text-gray-500 dark:text-gray-400">{baseLabel}</th>
            <th className="px-4 py-3.5 text-center font-semibold text-indigo-600 dark:text-indigo-400">{bundleLabel}</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50/40 dark:border-white/5 dark:hover:bg-white/5">
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{f.label}</td>
              <td className="px-4 py-3 text-center">
                {f.base ? (
                  <Check className="mx-auto h-5 w-5 text-emerald-500" />
                ) : (
                  <X className="mx-auto h-5 w-5 text-gray-300/60" />
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {f.bundle ? (
                  <Check className="mx-auto h-5 w-5 text-emerald-500" />
                ) : (
                  <X className="mx-auto h-5 w-5 text-gray-300/60" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
