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
    <Card className="border-gray-200 bg-white">
      <CardContent className="space-y-3 p-5">
        <h3 className="text-lg font-semibold text-gray-900">
          {expired ? t.accessExpired : t.accessExpiring}
        </h3>
        {expired && (
          <p className="text-sm text-gray-500">{t.graceMessage}</p>
        )}
        <div className="space-y-2">
          <Button
            onClick={onExtend}
            variant="outline"
            className="w-full justify-center border-gray-200 text-sm font-medium"
          >
            {t.extend7}
          </Button>
          <Button
            onClick={onRenew}
            className="w-full justify-center bg-indigo-600 text-sm font-medium hover:bg-indigo-700"
          >
            {t.renew30}
          </Button>
          <Button
            onClick={onUpgrade}
            variant="outline"
            className="w-full justify-center border-indigo-200 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
          >
            {t.upgradeBundle}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
