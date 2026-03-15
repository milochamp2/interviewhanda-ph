export type Language = "en" | "tl";

export type ExperienceLevel = "fresh" | "1-3" | "3+";

export type PlanType = "base" | "bundle";

export type SessionStatus = "active" | "near_expiry" | "grace" | "expired";

export interface JobCategory {
  id: string;
  label: { en: string; tl: string };
  icon: string;
}

export interface QuestionnaireData {
  jobCategoryId: string;
  customRole?: string;
  experienceLevel: ExperienceLevel;
  jobDescription?: string;
}

export interface TeaserResult {
  readinessSummary: string;
  previewQuestions: string[];
  sampleAnswer: string;
  tips: string[];
}

export interface InterviewQuestion {
  question: string;
  sampleAnswer: string;
  recruiterTrap?: string;
}

export interface FullResult {
  questions: InterviewQuestion[];
  tips: string[];
  recruiterTraps: string[];
  resumeSuggestions?: string[];
  coverLetter?: string;
  salaryScript?: string;
  practiceGuide?: string[];
}

export interface SessionState {
  id: string;
  plan: PlanType;
  status: SessionStatus;
  createdAt: string;
  expiresAt: string;
  jobCategory: string;
  customRole?: string;
  experienceLevel: ExperienceLevel;
  result: FullResult;
}

export interface CheckoutItem {
  plan: PlanType;
  price: number;
  label: string;
}
