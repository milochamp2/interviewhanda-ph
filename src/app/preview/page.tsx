"use client";

import { useRouter } from "next/navigation";
import { Lock, CheckCircle, Lightbulb, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { mockTeaserResult } from "@/lib/mock-data";
import { TeaserQuestionCard } from "@/components/teaser-question-card";
import { PaywallCard } from "@/components/paywall-card";

export default function PreviewPage() {
  const router = useRouter();
  const { language, teaser } = useAppState();
  const t = getTranslations(language);
  const data = teaser || mockTeaserResult;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="border-b border-gray-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center">
          <span className="text-base font-bold text-gray-900">
            Interview<span className="text-indigo-600">Handa</span>
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">{t.teaser.title}</h1>

        {/* Readiness Summary */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="flex gap-3 p-4">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
            <div>
              <h3 className="mb-1 text-sm font-semibold text-green-800">
                {t.teaser.readiness}
              </h3>
              <p className="text-sm leading-relaxed text-green-700">
                {data.readinessSummary}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preview Questions */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-gray-800">
              {t.teaser.previewQuestions}
            </h3>
          </div>
          <div className="space-y-3">
            {data.previewQuestions.map((q, i) => (
              <TeaserQuestionCard key={i} index={i + 1} question={q} />
            ))}
          </div>
        </div>

        {/* Sample Answer */}
        <Card className="mb-6 border-indigo-200 bg-indigo-50">
          <CardContent className="p-4">
            <h3 className="mb-2 text-sm font-semibold text-indigo-800">
              {t.teaser.sampleAnswer}
            </h3>
            <p className="text-sm leading-relaxed text-indigo-700">
              {data.sampleAnswer}
            </p>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-gray-800">{t.teaser.tips}</h3>
          </div>
          <ul className="space-y-2">
            {data.tips.map((tip, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-lg border border-gray-100 bg-white p-3 text-sm text-gray-600"
              >
                <span className="font-medium text-amber-500">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Blurred locked content */}
        <div className="relative mb-6 overflow-hidden rounded-xl">
          <div className="pointer-events-none select-none blur-sm">
            <div className="space-y-3 p-4">
              {[4, 5, 6, 7].map((n) => (
                <div key={n} className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-full rounded bg-gray-100" />
                  <div className="mt-1 h-3 w-5/6 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm">
              <Lock className="h-4 w-4" />
              {t.teaser.locked}
            </div>
          </div>
        </div>

        {/* Paywall CTA */}
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
