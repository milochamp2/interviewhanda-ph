"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Translations } from "@/lib/i18n";

interface RenewalCardProps {
  expired: boolean;
  t: Translations["expiry"];
  onExtend: () => void;
  onRenew: () => void;
  onUpgrade: () => void;
}

export function RenewalCard({ expired, t, onExtend, onRenew, onUpgrade }: RenewalCardProps) {
  return (
    <Card className="glow-card border-gray-100/80 bg-white">
      <CardContent className="space-y-4 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {expired ? t.accessExpired : t.accessExpiring}
        </h3>
        {expired && (
          <p className="text-sm text-gray-500">{t.graceMessage}</p>
        )}
        <div className="space-y-2.5">
          <Button
            onClick={onExtend}
            variant="outline"
            className="touch-target w-full justify-center rounded-xl border-gray-200/80 text-sm font-medium"
          >
            {t.extend7}
          </Button>
          <Button
            onClick={onRenew}
            className="glow-button touch-target w-full justify-center rounded-xl bg-indigo-600 text-sm font-medium hover:bg-indigo-700"
          >
            {t.renew30}
          </Button>
          <Button
            onClick={onUpgrade}
            variant="outline"
            className="touch-target w-full justify-center rounded-xl border-indigo-200/60 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
          >
            {t.upgradeBundle}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
