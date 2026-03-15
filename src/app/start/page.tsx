"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { createSession, generateTeaser } from "@/lib/api";
import { ProgressBar } from "@/components/progress-bar";
import { JobCategoryGrid } from "@/components/job-category-grid";
import { CustomRoleInput } from "@/components/custom-role-input";
import type { ExperienceLevel } from "@/types";

const TOTAL_STEPS = 3;

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function StartPage() {
  const router = useRouter();
  const { language, questionnaire, setQuestionnaire, setTeaser } = useAppState();
  const t = getTranslations(language);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [customRole, setCustomRole] = useState(questionnaire.customRole || "");

  const category = questionnaire.jobCategoryId;
  const experience = questionnaire.experienceLevel;
  const jobDescription = questionnaire.jobDescription || "";

  function canContinue() {
    if (step === 1) return !!category && (category !== "others" || customRole.trim().length > 0);
    if (step === 2) return !!experience;
    return true;
  }

  async function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    try {
      const finalData = {
        ...questionnaire,
        customRole: category === "others" ? customRole : undefined,
        jobDescription: jobDescription || undefined,
      };
      setQuestionnaire(finalData);
      const { sessionId } = await createSession(finalData as Parameters<typeof createSession>[0]);
      const teaser = await generateTeaser(sessionId, finalData);
      setTeaser(teaser);
      router.push("/preview");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="luminous-bg min-h-screen bg-[var(--background)]">
      <header className="glass border-b border-gray-100/50 px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <span className="text-base font-bold tracking-tight text-gray-900">
            Interview<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Handa</span>
          </span>
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
            {step}/{TOTAL_STEPS}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
        <ProgressBar current={step} total={TOTAL_STEPS} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-8"
          >
            {step === 1 && (
              <div>
                <h2 className="mb-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  {t.questionnaire.selectCategory}
                </h2>
                <p className="mb-6 text-sm text-gray-500">
                  {language === "en"
                    ? "Pick the role that best matches your target job."
                    : "Piliin ang role na pinaka-angkop sa target job mo."}
                </p>
                <JobCategoryGrid
                  selected={category}
                  onSelect={(id) => setQuestionnaire({ ...questionnaire, jobCategoryId: id })}
                  language={language}
                  compact
                />
                {category === "others" && (
                  <CustomRoleInput
                    value={customRole}
                    onChange={setCustomRole}
                    placeholder={t.questionnaire.enterRole}
                  />
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="mb-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  {t.questionnaire.selectExperience}
                </h2>
                <p className="mb-6 text-sm text-gray-500">
                  {language === "en"
                    ? "This helps us tailor the difficulty of questions."
                    : "Makakatulong ito para ma-adjust ang level ng mga tanong."}
                </p>
                <div className="space-y-3">
                  {(["fresh", "1-3", "3+"] as ExperienceLevel[]).map((level) => (
                    <motion.button
                      key={level}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() =>
                        setQuestionnaire({ ...questionnaire, experienceLevel: level })
                      }
                      className={`touch-target w-full rounded-xl border p-4 text-left text-base font-medium transition-all sm:p-5 ${
                        experience === level
                          ? "glow-card border-indigo-500/50 bg-indigo-50 text-indigo-700"
                          : "border-gray-200/80 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {t.questionnaire.experienceLevels[level]}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="mb-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  {t.questionnaire.jobDescription}
                </h2>
                <p className="mb-6 text-sm text-gray-500">
                  {t.questionnaire.jobDescriptionHint}
                </p>
                <Textarea
                  value={jobDescription}
                  onChange={(e) =>
                    setQuestionnaire({ ...questionnaire, jobDescription: e.target.value })
                  }
                  placeholder={
                    language === "en"
                      ? "Paste the job listing description here..."
                      : "I-paste dito ang job listing description..."
                  }
                  className="min-h-[180px] rounded-xl border-gray-200/80 bg-white text-base focus:border-indigo-300 focus:ring-indigo-200/50"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Sticky bottom CTA on mobile */}
        <div className="mt-8 flex gap-3 pb-4 sm:pb-0">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="h-13 flex-1 gap-2 rounded-xl border-gray-200/80 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.questionnaire.back}
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canContinue() || loading}
            className="glow-button h-13 flex-1 gap-2 rounded-xl bg-indigo-600 text-sm font-semibold hover:bg-indigo-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.questionnaire.generating}
              </>
            ) : (
              <>
                {t.questionnaire.next}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
