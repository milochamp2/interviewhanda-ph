"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
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
      const teaser = await generateTeaser(sessionId);
      setTeaser(teaser);
      router.push("/preview");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="border-b border-gray-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <span className="text-base font-bold text-gray-900">
            Interview<span className="text-indigo-600">Handa</span>
          </span>
          <span className="text-xs text-gray-400">
            {step}/{TOTAL_STEPS}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <ProgressBar current={step} total={TOTAL_STEPS} />

        <div className="mt-8">
          {step === 1 && (
            <div className="animate-in fade-in duration-300">
              <h2 className="mb-1 text-xl font-bold text-gray-900">
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
            <div className="animate-in fade-in duration-300">
              <h2 className="mb-1 text-xl font-bold text-gray-900">
                {t.questionnaire.selectExperience}
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                {language === "en"
                  ? "This helps us tailor the difficulty of questions."
                  : "Makakatulong ito para ma-adjust ang level ng mga tanong."}
              </p>
              <div className="space-y-3">
                {(["fresh", "1-3", "3+"] as ExperienceLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() =>
                      setQuestionnaire({ ...questionnaire, experienceLevel: level })
                    }
                    className={`w-full rounded-xl border p-4 text-left text-base font-medium transition-all ${
                      experience === level
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {t.questionnaire.experienceLevels[level]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in duration-300">
              <h2 className="mb-1 text-xl font-bold text-gray-900">
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
                className="min-h-[160px] rounded-xl border-gray-200 text-base"
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="h-12 flex-1 gap-2 rounded-xl border-gray-200 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.questionnaire.back}
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canContinue() || loading}
            className="h-12 flex-1 gap-2 rounded-xl bg-indigo-600 text-sm font-semibold hover:bg-indigo-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.questionnaire.generating}
              </>
            ) : (
              <>
                {step === TOTAL_STEPS ? t.questionnaire.next : t.questionnaire.next}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
