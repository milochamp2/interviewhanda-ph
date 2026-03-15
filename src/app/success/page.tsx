"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, ChevronDown, ChevronUp, PartyPopper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { getMockSession } from "@/lib/mock-data";
import { PdfEmailPanel } from "@/components/pdf-email-panel";
import { CountdownBanner } from "@/components/countdown-banner";
import { RenewalCard } from "@/components/renewal-card";
import { FadeUp } from "@/components/motion";
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
    <div className="luminous-bg min-h-screen bg-[var(--background)]">
      <header className="glass border-b border-gray-100/50 px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <span className="text-base font-bold tracking-tight text-gray-900">
            Interview<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Handa</span>
          </span>
          {isBundle && (
            <Badge variant="secondary" className="border-indigo-200/60 bg-indigo-50 text-indigo-700">
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
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50">
                {status === "active" ? (
                  <PartyPopper className="h-8 w-8 text-emerald-500" />
                ) : (
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                )}
              </div>
            </motion.div>
            <h1 className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl">{t.success.title}</h1>
            <p className="text-sm text-gray-500">{t.success.subtitle}</p>
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
          <Tabs defaultValue="questions" className="mb-8">
            <TabsList className="mb-5 flex w-full flex-wrap gap-1.5 bg-transparent p-0">
              {[
                { value: "questions", label: t.success.tabs.questions },
                { value: "tips", label: t.success.tabs.tips },
                ...(isBundle
                  ? [
                      { value: "resume", label: t.success.tabs.resume },
                      { value: "cover", label: t.success.tabs.coverLetter },
                      { value: "salary", label: t.success.tabs.salary },
                      { value: "guide", label: t.success.tabs.practiceGuide },
                    ]
                  : []),
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-lg border border-gray-200/60 bg-white px-3 py-1.5 text-xs font-medium transition-all data-[state=active]:border-indigo-500/50 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="questions" className="space-y-3">
              {result.questions.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card className="glow-card border-gray-100/80 bg-white">
                    <CardContent className="p-0">
                      <button
                        onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                        className="flex w-full items-center justify-between p-4 text-left sm:p-5"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 text-sm font-semibold text-indigo-700">
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
                      <AnimatePresence>
                        {expandedQ === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-gray-100/80 px-4 pb-4 pt-3 sm:px-5">
                              <div className="mb-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50/50 p-4">
                                <p className="text-xs font-semibold text-emerald-700">
                                  Strong Answer
                                </p>
                                <p className="mt-1 text-sm leading-relaxed text-emerald-800">
                                  {q.sampleAnswer}
                                </p>
                              </div>
                              {q.recruiterTrap && (
                                <div className="flex gap-2 rounded-xl bg-amber-50/80 p-4">
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-800">Interview Tips</h3>
                <div className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <div
                      key={i}
                      className="flex gap-2 rounded-xl border border-gray-100/80 bg-white p-3.5 text-sm text-gray-600"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-800">Recruiter Traps to Watch</h3>
                <div className="space-y-2">
                  {result.recruiterTraps.map((trap, i) => (
                    <div
                      key={i}
                      className="flex gap-2 rounded-xl border border-amber-100/60 bg-amber-50/60 p-3.5 text-sm text-amber-800"
                    >
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                      {trap}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resume">
              {result.resumeSuggestions && (
                <Card className="glow-card border-gray-100/80 bg-white">
                  <CardContent className="space-y-3 p-5">
                    <h3 className="text-sm font-semibold text-gray-800">Resume Suggestions</h3>
                    {result.resumeSuggestions.map((s, i) => (
                      <div key={i} className="flex gap-2 text-sm text-gray-600">
                        <span className="font-medium text-indigo-500">{i + 1}.</span>
                        {s}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="cover">
              {result.coverLetter && (
                <Card className="glow-card border-gray-100/80 bg-white">
                  <CardContent className="p-5">
                    <h3 className="mb-3 text-sm font-semibold text-gray-800">Cover Letter Template</h3>
                    <div className="whitespace-pre-wrap rounded-xl bg-gray-50/80 p-5 text-sm leading-relaxed text-gray-700">
                      {result.coverLetter}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="salary">
              {result.salaryScript && (
                <Card className="glow-card border-gray-100/80 bg-white">
                  <CardContent className="p-5">
                    <h3 className="mb-3 text-sm font-semibold text-gray-800">Salary Negotiation Script</h3>
                    <div className="whitespace-pre-wrap rounded-xl bg-gray-50/80 p-5 text-sm leading-relaxed text-gray-700">
                      {result.salaryScript}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="guide">
              {result.practiceGuide && (
                <div className="space-y-3">
                  {result.practiceGuide.map((day, i) => (
                    <Card key={i} className="glow-card border-gray-100/80 bg-white">
                      <CardContent className="p-5">
                        <p className="text-sm leading-relaxed text-gray-700">{day}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </FadeUp>
      </div>
    </div>
  );
}
