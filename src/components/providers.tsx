"use client";

import { useState, type ReactNode } from "react";
import { AppContext } from "@/lib/store";
import type { Language, QuestionnaireData, PlanType, SessionState, TeaserResult } from "@/types";

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [questionnaire, setQuestionnaire] = useState<Partial<QuestionnaireData>>({});
  const [teaser, setTeaser] = useState<TeaserResult | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("base");
  const [session, setSession] = useState<SessionState | null>(null);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        questionnaire,
        setQuestionnaire,
        teaser,
        setTeaser,
        selectedPlan,
        setSelectedPlan,
        session,
        setSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
