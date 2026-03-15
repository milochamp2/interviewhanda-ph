"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, PartyPopper, FolderOpen, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { getMockSession } from "@/lib/mock-data";
import { PdfEmailPanel } from "@/components/pdf-email-panel";
import { CountdownBanner } from "@/components/countdown-banner";
import { RenewalCard } from "@/components/renewal-card";
import { FadeUp } from "@/components/motion";
import type { SessionState } from "@/types";

export default function SuccessPage() {
  const router = useRouter();
  const { language } = useAppState();
  const t = getTranslations(language);
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan") === "bundle" ? "bundle" : "base";
    const status = (params.get("status") as SessionState["status"]) || "active";
    setSession(getMockSession(plan, status));
  }, []);

  if (!session) return null;

  const { plan, status, expiresAt } = session;
  const isBundle = plan === "bundle";
  const isGrace = status === "grace";
  const isExpired = status === "expired";
  const isNearExpiry = status === "near_expiry";

  const expiryDiffMs = new Date(expiresAt).getTime() - Date.now();
  const expiryDays = Math.ceil(expiryDiffMs / (1000 * 60 * 60 * 24));

  function getSeverity() {
    if (expiryDays <= 3) return "urgent";
    if (expiryDays <= 7) return "warning";
    return "subtle";
  }

  // TODO: Replace with real Google Drive folder link per session
  const driveLink = "#";

  return (
    <div className="luminous-bg min-h-screen bg-[var(--background)]">
      <header className="glass border-b border-gray-100/50 dark:border-white/10 px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <span className="text-base font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Interview<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Handa</span>
          </span>
          {isBundle && (
            <Badge variant="secondary" className="border-indigo-200/60 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-300">
              Career Bundle
            </Badge>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-10">
        {isNearExpiry && (
          <FadeUp>
            <div className="mb-5">
              <CountdownBanner expiresAt={expiresAt} severity={getSeverity()} t={t.expiry} />
            </div>
          </FadeUp>
        )}

        {(isGrace || isExpired) && (
          <FadeUp>
            <div className="mb-5">
              <RenewalCard
                expired={isExpired}
                t={t.expiry}
                onExtend={() => {}}
                onRenew={() => {}}
                onUpgrade={() => {}}
              />
            </div>
          </FadeUp>
        )}

        <FadeUp>
          <div className="mb-7 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50 dark:from-emerald-900/40 dark:to-green-900/20">
                {status === "active" ? (
                  <PartyPopper className="h-8 w-8 text-emerald-500" />
                ) : (
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                )}
              </div>
            </motion.div>
            <h1 className="mb-1 text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">{t.success.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.success.subtitle}</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mb-6">
            <PdfEmailPanel
              sessionId={session.id}
              t={t.success}
              disabled={isExpired}
            />
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <Card className="glow-card border-gray-100/80 bg-white dark:border-white/10 dark:bg-white/5">
            <CardContent className="flex flex-col items-center p-7 text-center sm:p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-50 dark:from-indigo-900/40 dark:to-violet-900/20">
                <BookOpen className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mb-1.5 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t.success.kitTitle}
              </h3>
              <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                {t.success.kitSubtitle}
              </p>
              <Button
                onClick={() => router.push(`/kit?plan=${plan}&status=${status}`)}
                size="lg"
                className="glow-button mb-3 w-full rounded-xl bg-indigo-600 text-base font-semibold hover:bg-indigo-700"
                disabled={isExpired}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                {t.success.viewKit}
              </Button>
            </CardContent>
          </Card>
        </FadeUp>

        <FadeUp delay={0.25}>
          <Card className="mt-4 glow-card border-gray-100/80 bg-white dark:border-white/10 dark:bg-white/5">
            <CardContent className="flex flex-col items-center p-7 text-center sm:p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50 dark:from-emerald-900/40 dark:to-green-900/20">
                <FolderOpen className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="mb-1.5 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t.success.driveTitle}
              </h3>
              <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                {t.success.driveSubtitle}
              </p>
              <a href={driveLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-xl border-gray-200/80 text-base font-semibold dark:border-white/10 dark:text-gray-300"
                  disabled={isExpired}
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  {t.success.openDrive}
                </Button>
              </a>
            </CardContent>
          </Card>
        </FadeUp>
      </div>
    </div>
  );
}
