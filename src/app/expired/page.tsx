"use client";

import { useEffect, useState } from "react";
import { Clock, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { getMockSession } from "@/lib/mock-data";
import { RenewalCard } from "@/components/renewal-card";
import { CountdownBanner } from "@/components/countdown-banner";
import { FadeUp } from "@/components/motion";
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
    <div className="luminous-bg min-h-screen bg-[var(--background)]">
      <header className="glass border-b border-gray-100/50 px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center">
          <span className="text-base font-bold tracking-tight text-gray-900">
            Interview<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Handa</span>
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-12 sm:py-16">
        {isNearExpiry && (
          <FadeUp>
            <div className="mb-6">
              <CountdownBanner
                expiresAt={expiresAt}
                severity="warning"
                t={t.expiry}
              />
            </div>
          </FadeUp>
        )}

        <FadeUp>
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {isExpired ? (
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-100 to-red-50">
                  <ShieldAlert className="h-8 w-8 text-red-400" />
                </div>
              ) : (
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50">
                  <Clock className="h-8 w-8 text-amber-400" />
                </div>
              )}
            </motion.div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {isExpired ? t.expiry.accessExpired : t.expiry.accessExpiring}
            </h1>
            {isGrace && (
              <p className="text-sm text-gray-500">{t.expiry.graceMessage}</p>
            )}
          </div>
        </FadeUp>

        {isGrace && (
          <FadeUp delay={0.1}>
            <Card className="mb-6 border-gray-100/80 bg-white">
              <CardContent className="p-5">
                <p className="text-center text-sm text-gray-500">
                  {language === "en"
                    ? "Your content is still viewable below. Downloads and email are disabled during the grace period."
                    : "Pwede mo pa ring tingnan ang content mo sa ibaba. Naka-disable ang downloads at email sa grace period."}
                </p>
              </CardContent>
            </Card>
          </FadeUp>
        )}

        <FadeUp delay={0.15}>
          <RenewalCard
            expired={isExpired || isGrace}
            t={t.expiry}
            onExtend={() => {}}
            onRenew={() => {}}
            onUpgrade={() => {}}
          />
        </FadeUp>
      </div>
    </div>
  );
}
