"use client";

import { useEffect, useState } from "react";
import { Clock, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { getMockSession } from "@/lib/mock-data";
import { RenewalCard } from "@/components/renewal-card";
import { CountdownBanner } from "@/components/countdown-banner";
import type { SessionState, SessionStatus } from "@/types";

export default function ExpiredPage() {
  const { language } = useAppState();
  const t = getTranslations(language);
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = (params.get("status") as SessionStatus) || "expired";
    setSession(getMockSession("base", status));
  }, []);

  if (!session) return null;

  const { status, expiresAt } = session;

  const isGrace = status === "grace";
  const isExpired = status === "expired";
  const isNearExpiry = status === "near_expiry";

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="border-b border-gray-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center">
          <span className="text-base font-bold text-gray-900">
            Interview<span className="text-indigo-600">Handa</span>
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-12">
        {isNearExpiry && (
          <div className="mb-6">
            <CountdownBanner
              expiresAt={expiresAt}
              severity="warning"
              t={t.expiry}
            />
          </div>
        )}

        <div className="mb-8 text-center">
          {isExpired ? (
            <ShieldAlert className="mx-auto mb-4 h-12 w-12 text-red-400" />
          ) : (
            <Clock className="mx-auto mb-4 h-12 w-12 text-amber-400" />
          )}
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {isExpired ? t.expiry.accessExpired : t.expiry.accessExpiring}
          </h1>
          {isGrace && (
            <p className="text-sm text-gray-500">{t.expiry.graceMessage}</p>
          )}
        </div>

        {/* View-only blurred content for grace period */}
        {isGrace && (
          <Card className="mb-6 border-gray-200">
            <CardContent className="p-5">
              <p className="text-center text-sm text-gray-500">
                {language === "en"
                  ? "Your content is still viewable below. Downloads and email are disabled during the grace period."
                  : "Pwede mo pa ring tingnan ang content mo sa ibaba. Naka-disable ang downloads at email sa grace period."}
              </p>
            </CardContent>
          </Card>
        )}

        <RenewalCard
          expired={isExpired || isGrace}
          t={t.expiry}
          onExtend={() => {}}
          onRenew={() => {}}
          onUpgrade={() => {}}
        />
      </div>
    </div>
  );
}
