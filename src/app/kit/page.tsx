"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText, MessageSquare, AlertTriangle, CheckCircle,
  Lightbulb, FileEdit, Mail, DollarSign, CalendarDays,
  Lock, ArrowLeft, Crown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { getMockSession } from "@/lib/mock-data";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/motion";
import type { SessionState, PlanType } from "@/types";

type Section = "questions" | "tips" | "resume" | "cover" | "salary" | "guide";

interface KitSection {
  id: Section;
  icon: React.ComponentType<{ className?: string }>;
  bundleOnly: boolean;
}

const ALL_SECTIONS: KitSection[] = [
  { id: "questions", icon: MessageSquare, bundleOnly: false },
  { id: "tips", icon: Lightbulb, bundleOnly: false },
  { id: "resume", icon: FileEdit, bundleOnly: true },
  { id: "cover", icon: Mail, bundleOnly: true },
  { id: "salary", icon: DollarSign, bundleOnly: true },
  { id: "guide", icon: CalendarDays, bundleOnly: true },
];

export default function KitPage() {
  const router = useRouter();
  const { language } = useAppState();
  const t = getTranslations(language);
  const [session, setSession] = useState<SessionState | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("questions");
  const [expandedQ, setExpandedQ] = useState<number | null>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan") === "bundle" ? "bundle" : "base";
    const status = (params.get("status") as SessionState["status"]) || "active";
    setSession(getMockSession(plan, status));
  }, []);

  if (!session) return null;

  const { result, plan, status } = session;
  const isBundle = plan === "bundle";
  const isExpired = status === "expired";
  const isGrace = status === "grace";
  const viewOnly = isGrace;

  const availableSections = ALL_SECTIONS.filter(
    (s) => !s.bundleOnly || isBundle
  );

  const activeConfig = ALL_SECTIONS.find((s) => s.id === activeSection);
  const isSectionLocked = activeConfig?.bundleOnly && !isBundle;

  return (
    <div className="luminous-bg min-h-screen bg-[var(--background)]">
      <header className="glass sticky top-0 z-50 border-b border-gray-100/50 dark:border-white/10 px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/success?plan=${plan}&status=${status}`)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200/60 text-gray-500 transition-colors hover:text-gray-700 dark:border-white/10 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="text-base font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Interview<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Handa</span>
            </span>
          </div>
          <Badge
            variant="secondary"
            className={
              isBundle
                ? "border-indigo-200/60 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-300"
                : "border-gray-200/60 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
            }
          >
            {isBundle ? t.kit.bundleBadge : t.kit.baseBadge}
          </Badge>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
        {/* Section Navigation */}
        <FadeUp>
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {ALL_SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              const isLocked = section.bundleOnly && !isBundle;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex flex-shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-medium transition-all ${
                    isActive
                      ? "border-indigo-500/50 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-500/30"
                      : isLocked
                        ? "border-gray-200/40 bg-gray-50/50 text-gray-400 dark:border-white/5 dark:bg-white/[0.02] dark:text-gray-600"
                        : "border-gray-200/60 bg-white text-gray-600 hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-white/20"
                  }`}
                >
                  {isLocked ? (
                    <Lock className="h-3.5 w-3.5" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                  {t.kit.sections[section.id]}
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Locked Section Upsell */}
        {isSectionLocked && (
          <FadeUp>
            <Card className="glow-card border-indigo-200/60 bg-gradient-to-b from-indigo-50/80 to-white dark:border-indigo-500/20 dark:from-indigo-950/30 dark:to-transparent">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-50 pulse-glow dark:from-indigo-900/40 dark:to-violet-900/20">
                  <Crown className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="mb-1.5 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {t.kit.upgradeTitle}
                </h3>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {t.kit.upgradeSubtitle}
                </p>
                <ul className="mb-5 space-y-1.5 text-left text-sm text-gray-600 dark:text-gray-400">
                  {[t.kit.sections.resume, t.kit.sections.cover, t.kit.sections.salary, t.kit.sections.guide].map((label) => (
                    <li key={label} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-indigo-500" />
                      {label}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => router.push("/checkout")}
                  size="lg"
                  className="glow-button w-full rounded-xl bg-indigo-600 text-base font-semibold hover:bg-indigo-700"
                >
                  {t.kit.upgradeCta}
                </Button>
              </CardContent>
            </Card>
          </FadeUp>
        )}

        {/* Interview Questions */}
        {activeSection === "questions" && !isSectionLocked && (
          <FadeUp>
            <div className="space-y-3">
              {result.questions.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card className="glow-card border-gray-100/80 bg-white dark:border-white/10 dark:bg-white/5">
                    <CardContent className="p-0">
                      <button
                        onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                        className="flex w-full items-center justify-between p-4 text-left sm:p-5"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 text-sm font-semibold text-indigo-700 dark:from-indigo-900/40 dark:to-indigo-800/20 dark:text-indigo-300">
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {q.question}
                          </span>
                        </div>
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
                            <div className="border-t border-gray-100/80 px-4 pb-4 pt-3 dark:border-white/10 sm:px-5">
                              <div className="mb-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50/50 p-4 dark:from-emerald-950/30 dark:to-green-950/10">
                                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                  {t.kit.strongAnswer}
                                </p>
                                <p className="mt-1 text-sm leading-relaxed text-emerald-800 dark:text-emerald-400">
                                  {q.sampleAnswer}
                                </p>
                              </div>
                              {q.recruiterTrap && (
                                <div className="flex gap-2 rounded-xl bg-amber-50/80 p-4 dark:bg-amber-950/20">
                                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                                  <div>
                                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                                      {t.kit.recruiterTrap}
                                    </p>
                                    <p className="mt-1 text-sm leading-relaxed text-amber-800 dark:text-amber-400">
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
            </div>
          </FadeUp>
        )}

        {/* Tips & Recruiter Traps */}
        {activeSection === "tips" && !isSectionLocked && (
          <FadeUp>
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{t.kit.interviewTips}</h3>
                <div className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <div
                      key={i}
                      className="flex gap-2 rounded-xl border border-gray-100/80 bg-white p-3.5 text-sm text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
              <Separator className="bg-gray-100/80 dark:bg-white/10" />
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{t.kit.trapsToWatch}</h3>
                <div className="space-y-2">
                  {result.recruiterTraps.map((trap, i) => (
                    <div
                      key={i}
                      className="flex gap-2 rounded-xl border border-amber-100/60 bg-amber-50/60 p-3.5 text-sm text-amber-800 dark:border-amber-500/20 dark:bg-amber-950/20 dark:text-amber-300"
                    >
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                      {trap}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        )}

        {/* Resume Suggestions (Bundle) */}
        {activeSection === "resume" && !isSectionLocked && result.resumeSuggestions && (
          <FadeUp>
            <Card className="glow-card border-gray-100/80 bg-white dark:border-white/10 dark:bg-white/5">
              <CardContent className="space-y-3 p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t.kit.sections.resume}</h3>
                <StaggerGroup className="space-y-2.5">
                  {result.resumeSuggestions.map((s, i) => (
                    <StaggerItem key={i}>
                      <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-indigo-500 dark:text-indigo-400">{i + 1}.</span>
                        {s}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </CardContent>
            </Card>
          </FadeUp>
        )}

        {/* Cover Letter (Bundle) */}
        {activeSection === "cover" && !isSectionLocked && result.coverLetter && (
          <FadeUp>
            <Card className="glow-card border-gray-100/80 bg-white dark:border-white/10 dark:bg-white/5">
              <CardContent className="p-5 sm:p-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{t.kit.sections.cover}</h3>
                <div className="whitespace-pre-wrap rounded-xl bg-gray-50/80 p-5 text-sm leading-relaxed text-gray-700 dark:bg-white/5 dark:text-gray-300">
                  {result.coverLetter}
                </div>
              </CardContent>
            </Card>
          </FadeUp>
        )}

        {/* Salary Script (Bundle) */}
        {activeSection === "salary" && !isSectionLocked && result.salaryScript && (
          <FadeUp>
            <Card className="glow-card border-gray-100/80 bg-white dark:border-white/10 dark:bg-white/5">
              <CardContent className="p-5 sm:p-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{t.kit.sections.salary}</h3>
                <div className="whitespace-pre-wrap rounded-xl bg-gray-50/80 p-5 text-sm leading-relaxed text-gray-700 dark:bg-white/5 dark:text-gray-300">
                  {result.salaryScript}
                </div>
              </CardContent>
            </Card>
          </FadeUp>
        )}

        {/* Practice Guide (Bundle) */}
        {activeSection === "guide" && !isSectionLocked && result.practiceGuide && (
          <FadeUp>
            <StaggerGroup className="space-y-3">
              {result.practiceGuide.map((day, i) => (
                <StaggerItem key={i}>
                  <Card className="glow-card border-gray-100/80 bg-white dark:border-white/10 dark:bg-white/5">
                    <CardContent className="flex gap-3 p-5">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 text-xs font-bold text-indigo-700 dark:from-indigo-900/40 dark:to-indigo-800/20 dark:text-indigo-300">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{day}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </FadeUp>
        )}

        {/* Upgrade banner for base plan users at bottom */}
        {!isBundle && !isSectionLocked && (
          <FadeUp delay={0.2}>
            <Card className="mt-8 border-indigo-200/60 bg-gradient-to-r from-indigo-50/60 to-violet-50/30 dark:border-indigo-500/20 dark:from-indigo-950/20 dark:to-violet-950/10">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t.kit.wantMore}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.kit.upgradeHint}</p>
                </div>
                <Button
                  onClick={() => router.push("/checkout")}
                  size="sm"
                  className="rounded-xl bg-indigo-600 text-xs font-semibold hover:bg-indigo-700"
                >
                  <Crown className="mr-1.5 h-3.5 w-3.5" />
                  {t.kit.upgrade}
                </Button>
              </CardContent>
            </Card>
          </FadeUp>
        )}
      </div>
    </div>
  );
}
