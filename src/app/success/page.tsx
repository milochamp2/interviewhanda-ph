"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { getMockSession } from "@/lib/mock-data";
import { PdfEmailPanel } from "@/components/pdf-email-panel";
import { CountdownBanner } from "@/components/countdown-banner";
import { RenewalCard } from "@/components/renewal-card";
import type { SessionState } from "@/types";

export default function SuccessPage() {
  const { language } = useAppState();
  const t = getTranslations(language);
  const [session, setSession] = useState<SessionState | null>(null);
  const [expandedQ, setExpandedQ] = useState<number | null>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan") === "bundle" ? "bundle" : "base";
    const status = (params.get("status") as SessionState["status"]) || "active";
    setSession(getMockSession(plan, status));
  }, []);

  if (!session) return null;

  const { result, plan, status, expiresAt } = session;
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

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="border-b border-gray-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <span className="text-base font-bold text-gray-900">
            Interview<span className="text-indigo-600">Handa</span>
          </span>
          {isBundle && (
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
              Career Bundle
            </Badge>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Expiry banners */}
        {isNearExpiry && (
          <div className="mb-4">
            <CountdownBanner expiresAt={expiresAt} severity={getSeverity()} t={t.expiry} />
          </div>
        )}

        {(isGrace || isExpired) && (
          <div className="mb-4">
            <RenewalCard
              expired={isExpired}
              t={t.expiry}
              onExtend={() => {}}
              onRenew={() => {}}
              onUpgrade={() => {}}
            />
          </div>
        )}

        {/* Title */}
        <div className="mb-6 text-center">
          <CheckCircle className="mx-auto mb-3 h-10 w-10 text-green-500" />
          <h1 className="mb-1 text-2xl font-bold text-gray-900">{t.success.title}</h1>
          <p className="text-sm text-gray-500">{t.success.subtitle}</p>
        </div>

        {/* PDF / Email */}
        <div className="mb-6">
          <PdfEmailPanel
            sessionId={session.id}
            t={t.success}
            disabled={isExpired}
          />
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="questions" className="mb-8">
          <TabsList className="mb-4 flex w-full flex-wrap gap-1 bg-transparent p-0">
            <TabsTrigger
              value="questions"
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium data-[state=active]:border-indigo-600 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
            >
              {t.success.tabs.questions}
            </TabsTrigger>
            <TabsTrigger
              value="tips"
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium data-[state=active]:border-indigo-600 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
            >
              {t.success.tabs.tips}
            </TabsTrigger>
            {isBundle && (
              <>
                <TabsTrigger
                  value="resume"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium data-[state=active]:border-indigo-600 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                >
                  {t.success.tabs.resume}
                </TabsTrigger>
                <TabsTrigger
                  value="cover"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium data-[state=active]:border-indigo-600 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                >
                  {t.success.tabs.coverLetter}
                </TabsTrigger>
                <TabsTrigger
                  value="salary"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium data-[state=active]:border-indigo-600 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                >
                  {t.success.tabs.salary}
                </TabsTrigger>
                <TabsTrigger
                  value="guide"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium data-[state=active]:border-indigo-600 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                >
                  {t.success.tabs.practiceGuide}
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Interview Questions */}
          <TabsContent value="questions" className="space-y-3">
            {result.questions.map((q, i) => (
              <Card key={i} className="border-gray-200 bg-white">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        {q.question}
                      </span>
                    </div>
                    {expandedQ === i ? (
                      <ChevronUp className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    )}
                  </button>
                  {expandedQ === i && (
                    <div className="border-t border-gray-100 px-4 pb-4 pt-3">
                      <div className="mb-3 rounded-lg bg-green-50 p-3">
                        <p className="text-xs font-semibold text-green-700">
                          Strong Answer
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-green-800">
                          {q.sampleAnswer}
                        </p>
                      </div>
                      {q.recruiterTrap && (
                        <div className="flex gap-2 rounded-lg bg-amber-50 p-3">
                          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                          <div>
                            <p className="text-xs font-semibold text-amber-700">
                              Recruiter Trap
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-amber-800">
                              {q.recruiterTrap}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tips & Traps */}
          <TabsContent value="tips" className="space-y-4">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-800">
                Interview Tips
              </h3>
              <div className="space-y-2">
                {result.tips.map((tip, i) => (
                  <div
                    key={i}
                    className="flex gap-2 rounded-lg border border-gray-100 bg-white p-3 text-sm text-gray-600"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-800">
                Recruiter Traps to Watch
              </h3>
              <div className="space-y-2">
                {result.recruiterTraps.map((trap, i) => (
                  <div
                    key={i}
                    className="flex gap-2 rounded-lg border border-amber-100 bg-amber-50 p-3 text-sm text-amber-800"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                    {trap}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Resume */}
          <TabsContent value="resume">
            {result.resumeSuggestions && (
              <Card className="border-gray-200 bg-white">
                <CardContent className="space-y-3 p-5">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Resume Suggestions
                  </h3>
                  {result.resumeSuggestions.map((s, i) => (
                    <div
                      key={i}
                      className="flex gap-2 text-sm text-gray-600"
                    >
                      <span className="font-medium text-indigo-500">
                        {i + 1}.
                      </span>
                      {s}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Cover Letter */}
          <TabsContent value="cover">
            {result.coverLetter && (
              <Card className="border-gray-200 bg-white">
                <CardContent className="p-5">
                  <h3 className="mb-3 text-sm font-semibold text-gray-800">
                    Cover Letter Template
                  </h3>
                  <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
                    {result.coverLetter}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Salary */}
          <TabsContent value="salary">
            {result.salaryScript && (
              <Card className="border-gray-200 bg-white">
                <CardContent className="p-5">
                  <h3 className="mb-3 text-sm font-semibold text-gray-800">
                    Salary Negotiation Script
                  </h3>
                  <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
                    {result.salaryScript}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Practice Guide */}
          <TabsContent value="guide">
            {result.practiceGuide && (
              <div className="space-y-3">
                {result.practiceGuide.map((day, i) => (
                  <Card key={i} className="border-gray-200 bg-white">
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed text-gray-700">
                        {day}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
