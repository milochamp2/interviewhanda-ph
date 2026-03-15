"use client";

import { createContext, useContext } from "react";
import type { Language, QuestionnaireData, PlanType, SessionState, TeaserResult } from "@/types";

export interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  questionnaire: Partial<QuestionnaireData>;
  setQuestionnaire: (data: Partial<QuestionnaireData>) => void;
  teaser: TeaserResult | null;
  setTeaser: (teaser: TeaserResult | null) => void;
  selectedPlan: PlanType;
  setSelectedPlan: (plan: PlanType) => void;
  session: SessionState | null;
  setSession: (session: SessionState | null) => void;
}

export const AppContext = createContext<AppState | null>(null);

export function useAppState(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
}
