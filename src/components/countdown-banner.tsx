"use client";

import { Clock, AlertTriangle } from "lucide-react";
import type { Translations } from "@/lib/i18n";

interface CountdownBannerProps {
  expiresAt: string;
  severity: "subtle" | "warning" | "urgent";
  t: Translations["expiry"];
}

export function CountdownBanner({ expiresAt, severity, t }: CountdownBannerProps) {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffMs = expiry.getTime() - now.getTime();
  const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const diffHours = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60)));

  const timeLabel =
    diffDays > 0
      ? `${diffDays} ${t.daysLeft}`
      : `${diffHours} ${t.hoursLeft}`;

  const styles = {
    subtle: "border-amber-200 bg-amber-50 text-amber-700",
    warning: "border-orange-300 bg-orange-50 text-orange-700",
    urgent: "border-red-300 bg-red-50 text-red-700",
  };

  const Icon = severity === "urgent" ? AlertTriangle : Clock;

  return (
    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${styles[severity]}`}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">{t.accessExpiring}</p>
        <p className="text-xs opacity-80">{timeLabel}</p>
      </div>
    </div>
  );
}
