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
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-600">Feature</th>
            <th className="px-4 py-3 text-center font-medium text-gray-600">{baseLabel}</th>
            <th className="px-4 py-3 text-center font-medium text-indigo-600">{bundleLabel}</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 text-gray-700">{f.label}</td>
              <td className="px-4 py-3 text-center">
                {f.base ? (
                  <Check className="mx-auto h-5 w-5 text-green-500" />
                ) : (
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {f.bundle ? (
                  <Check className="mx-auto h-5 w-5 text-green-500" />
                ) : (
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
