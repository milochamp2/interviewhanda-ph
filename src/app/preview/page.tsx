"use client";

import { useRouter } from "next/navigation";
import { Lock, CheckCircle, Lightbulb, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { mockTeaserResult } from "@/lib/mock-data";
import { TeaserQuestionCard } from "@/components/teaser-question-card";
import { PaywallCard } from "@/components/paywall-card";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/motion";

export default function PreviewPage() {
  const router = useRouter();
  const { language, teaser } = useAppState();
  const t = getTranslations(language);
  const data = teaser || mockTeaserResult;

  return (
    <div className="luminous-bg min-h-screen bg-[var(--background)]">
      <header className="glass border-b border-gray-100/50 dark:border-white/10 px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center">
          <span className="text-base font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Interview<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Handa</span>
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-10">
        <FadeUp>
          <h1 className="mb-7 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">{t.teaser.title}</h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Card className="mb-6 border-emerald-200/60 bg-gradient-to-r from-emerald-50/80 to-green-50/40 dark:border-emerald-500/20 dark:from-emerald-950/30 dark:to-green-950/10">
            <CardContent className="flex gap-3 p-5">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
              <div>
                <h3 className="mb-1 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  {t.teaser.readiness}
                </h3>
                <p className="text-sm leading-relaxed text-emerald-700 dark:text-emerald-400">
                  {data.readinessSummary}
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-indigo-500" />
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {t.teaser.previewQuestions}
              </h3>
            </div>
            <StaggerGroup className="space-y-3">
              {data.previewQuestions.map((q, i) => (
                <StaggerItem key={i}>
                  <TeaserQuestionCard index={i + 1} question={q} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <Card className="mb-6 border-indigo-200/60 bg-gradient-to-r from-indigo-50/80 to-violet-50/40 dark:border-indigo-500/20 dark:from-indigo-950/30 dark:to-violet-950/10">
            <CardContent className="p-5">
              <h3 className="mb-2 text-sm font-semibold text-indigo-800 dark:text-indigo-300">
                {t.teaser.sampleAnswer}
              </h3>
              <p className="text-sm leading-relaxed text-indigo-700 dark:text-indigo-400">
                {data.sampleAnswer}
              </p>
            </CardContent>
          </Card>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t.teaser.tips}</h3>
            </div>
            <ul className="space-y-2">
              {data.tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex gap-2 rounded-xl border border-gray-100/80 bg-white p-3.5 text-sm text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
                >
                  <span className="font-medium text-amber-500">&bull;</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="relative mb-7 overflow-hidden rounded-2xl">
            <div className="pointer-events-none select-none blur-sm">
              <div className="space-y-3 p-4">
                {[4, 5, 6, 7].map((n) => (
                  <div key={n} className="rounded-xl border border-gray-200/60 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="h-4 w-3/4 rounded bg-gray-200/60 dark:bg-white/10" />
                    <div className="mt-2 h-3 w-full rounded bg-gray-100/60 dark:bg-white/5" />
                    <div className="mt-1 h-3 w-5/6 rounded bg-gray-100/60 dark:bg-white/5" />
                  </div>
                ))}
              </div>
            </div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px] dark:bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/90 px-5 py-2.5 text-sm font-medium text-gray-500 shadow-lg shadow-gray-200/30 dark:border-white/10 dark:bg-white/10 dark:text-gray-400 dark:shadow-black/20">
                <Lock className="h-4 w-4" />
                {t.teaser.locked}
              </div>
            </motion.div>
          </div>
        </FadeUp>

        <PaywallCard
          title={t.teaser.unlock}
          ctaText={t.teaser.unlockCta}
          subtitle={t.teaser.includes}
          onCta={() => router.push("/checkout")}
        />
      </div>
    </div>
  );
}
