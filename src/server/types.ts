export type Language = "en" | "tl";

export type ExperienceLevel = "fresh" | "1-3" | "3+";

export type PlanCode = "basic_399" | "bundle_999" | "extend_149";

export type EntitlementStatus = "active" | "near_expiry" | "in_grace" | "expired" | "none";

export interface Session {
  id: string;
  language: Language;
  jobCategoryId: string;
  customRole?: string;
  experienceLevel: ExperienceLevel;
  jobDescription?: string;
  createdAt: string;
}

export interface TeaserContent {
  readinessSummary: string;
  previewQuestions: string[];
  sampleAnswer: string;
  tips: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  sampleAnswer: string;
  recruiterTrap?: string;
}

export interface FullContent {
  questions: InterviewQuestion[];
  tips: string[];
  recruiterTraps: string[];
  resumeSuggestions?: string[];
  coverLetter?: string;
  salaryScript?: string;
  practiceGuide?: string[];
}

export interface Entitlement {
  id: string;
  sessionId: string;
  plan: PlanCode;
  status: EntitlementStatus;
  activatedAt: string;
  expiresAt: string;
  extensionsUsed: number;
  paymentReferences: string[];
}

export interface EntitlementStatusResponse {
  status: EntitlementStatus;
  expiresAt: string | null;
  timeRemainingMs: number;
  extensionsUsed: number;
  maxExtensions: number;
  allowedActions: AllowedActions;
}

export interface AllowedActions {
  viewContent: boolean;
  downloadPdf: boolean;
  sendEmail: boolean;
  grade: boolean;
  purchaseExtension: boolean;
}

export interface GradeResult {
  questionId: string;
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface PaymentCheckout {
  id: string;
  sessionId: string;
  plan: PlanCode;
  amount: number;
  checkoutUrl: string;
  paymongoCheckoutId: string;
  createdAt: string;
}
