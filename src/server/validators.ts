import {
  VALID_CATEGORY_IDS,
  VALID_EXPERIENCE_LEVELS,
  VALID_LANGUAGES,
  JOB_DESCRIPTION_MAX_LENGTH,
  CUSTOM_ROLE_MAX_LENGTH,
} from "./constants";
import type { Language, ExperienceLevel, PlanCode } from "./types";

export interface ValidationError {
  field: string;
  message: string;
}

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: ValidationError[] };

// --- Session creation ---

export interface CreateSessionInput {
  language: Language;
  jobCategoryId: string;
  customRole?: string;
  experienceLevel: ExperienceLevel;
  jobDescription?: string;
}

export function validateCreateSession(body: unknown): ValidationResult<CreateSessionInput> {
  const errors: ValidationError[] = [];
  if (!body || typeof body !== "object") {
    return { ok: false, errors: [{ field: "body", message: "Request body is required" }] };
  }

  const b = body as Record<string, unknown>;

  if (!b.language || !VALID_LANGUAGES.includes(b.language as Language)) {
    errors.push({ field: "language", message: "Must be 'en' or 'tl'" });
  }

  if (!b.jobCategoryId || !VALID_CATEGORY_IDS.includes(b.jobCategoryId as typeof VALID_CATEGORY_IDS[number])) {
    errors.push({ field: "jobCategoryId", message: "Invalid job category" });
  }

  if (b.jobCategoryId === "others") {
    if (!b.customRole || typeof b.customRole !== "string" || b.customRole.trim().length === 0) {
      errors.push({ field: "customRole", message: "Custom role is required when category is 'others'" });
    } else if (b.customRole.trim().length > CUSTOM_ROLE_MAX_LENGTH) {
      errors.push({ field: "customRole", message: `Custom role must be under ${CUSTOM_ROLE_MAX_LENGTH} characters` });
    }
  }

  if (!b.experienceLevel || !VALID_EXPERIENCE_LEVELS.includes(b.experienceLevel as ExperienceLevel)) {
    errors.push({ field: "experienceLevel", message: "Must be 'fresh', '1-3', or '3+'" });
  }

  if (b.jobDescription !== undefined && b.jobDescription !== null) {
    if (typeof b.jobDescription !== "string") {
      errors.push({ field: "jobDescription", message: "Must be a string" });
    } else if (b.jobDescription.length > JOB_DESCRIPTION_MAX_LENGTH) {
      errors.push({ field: "jobDescription", message: `Must be under ${JOB_DESCRIPTION_MAX_LENGTH} characters` });
    }
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      language: b.language as Language,
      jobCategoryId: b.jobCategoryId as string,
      customRole: b.jobCategoryId === "others" ? (b.customRole as string).trim() : undefined,
      experienceLevel: b.experienceLevel as ExperienceLevel,
      jobDescription: b.jobDescription ? (b.jobDescription as string).trim() : undefined,
    },
  };
}

// --- Session ID param ---

export function validateSessionId(sessionId: unknown): ValidationResult<string> {
  if (!sessionId || typeof sessionId !== "string" || sessionId.trim().length === 0) {
    return { ok: false, errors: [{ field: "session_id", message: "session_id is required" }] };
  }
  return { ok: true, data: sessionId.trim() };
}

// --- Plan code ---

const VALID_PLAN_CODES: PlanCode[] = ["basic_399", "bundle_999", "extend_149"];

export interface CreateCheckoutInput {
  sessionId: string;
  planCode: PlanCode;
}

export function validateCreateCheckout(body: unknown): ValidationResult<CreateCheckoutInput> {
  const errors: ValidationError[] = [];
  if (!body || typeof body !== "object") {
    return { ok: false, errors: [{ field: "body", message: "Request body is required" }] };
  }

  const b = body as Record<string, unknown>;

  if (!b.session_id || typeof b.session_id !== "string") {
    errors.push({ field: "session_id", message: "session_id is required" });
  }

  if (!b.plan_code || !VALID_PLAN_CODES.includes(b.plan_code as PlanCode)) {
    errors.push({ field: "plan_code", message: "Must be 'basic_399', 'bundle_999', or 'extend_149'" });
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      sessionId: (b.session_id as string).trim(),
      planCode: b.plan_code as PlanCode,
    },
  };
}

// --- Email ---

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SendEmailInput {
  sessionId: string;
  email: string;
}

export function validateSendEmail(body: unknown): ValidationResult<SendEmailInput> {
  const errors: ValidationError[] = [];
  if (!body || typeof body !== "object") {
    return { ok: false, errors: [{ field: "body", message: "Request body is required" }] };
  }

  const b = body as Record<string, unknown>;

  if (!b.session_id || typeof b.session_id !== "string") {
    errors.push({ field: "session_id", message: "session_id is required" });
  }

  if (!b.email || typeof b.email !== "string" || !EMAIL_REGEX.test(b.email)) {
    errors.push({ field: "email", message: "Valid email address is required" });
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      sessionId: (b.session_id as string).trim(),
      email: (b.email as string).trim().toLowerCase(),
    },
  };
}

// --- Grade ---

export interface GradeInput {
  sessionId: string;
  questionId: string;
  answer: string;
}

export function validateGradeInput(body: unknown): ValidationResult<GradeInput> {
  const errors: ValidationError[] = [];
  if (!body || typeof body !== "object") {
    return { ok: false, errors: [{ field: "body", message: "Request body is required" }] };
  }

  const b = body as Record<string, unknown>;

  if (!b.session_id || typeof b.session_id !== "string") {
    errors.push({ field: "session_id", message: "session_id is required" });
  }

  if (!b.question_id || typeof b.question_id !== "string") {
    errors.push({ field: "question_id", message: "question_id is required" });
  }

  if (!b.answer || typeof b.answer !== "string" || b.answer.trim().length === 0) {
    errors.push({ field: "answer", message: "answer is required" });
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      sessionId: (b.session_id as string).trim(),
      questionId: (b.question_id as string).trim(),
      answer: (b.answer as string).trim(),
    },
  };
}
