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
    subtle: "border-amber-200/60 bg-gradient-to-r from-amber-50/80 to-yellow-50/40 text-amber-700",
    warning: "border-orange-200/60 bg-gradient-to-r from-orange-50/80 to-amber-50/40 text-orange-700",
    urgent: "border-red-200/60 bg-gradient-to-r from-red-50/80 to-rose-50/40 text-red-700",
  };

  const Icon = severity === "urgent" ? AlertTriangle : Clock;

  return (
    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 ${styles[severity]}`}>
      <Icon className={`h-5 w-5 flex-shrink-0 ${severity === "urgent" ? "animate-pulse" : ""}`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{t.accessExpiring}</p>
        <p className="text-xs opacity-75">{timeLabel}</p>
      </div>
    </div>
  );
}
