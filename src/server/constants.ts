import type { PlanCode } from "./types";

export const VALID_CATEGORY_IDS = [
  "bpo", "va", "admin", "sales", "service-crew", "social-media",
  "digital-marketing", "graphic-design", "web-dev", "teacher",
  "nurse", "accountant", "hr", "real-estate", "delivery", "others",
] as const;

export const VALID_EXPERIENCE_LEVELS = ["fresh", "1-3", "3+"] as const;

export const VALID_LANGUAGES = ["en", "tl"] as const;

export const PLAN_CONFIG: Record<PlanCode, { amountCents: number; label: string }> = {
  basic_399: { amountCents: 39900, label: "Interview Preparation Kit" },
  bundle_999: { amountCents: 99900, label: "Complete Career Bundle" },
  extend_149: { amountCents: 14900, label: "7-Day Extension" },
};

export const ACCESS_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
export const EXTENSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
export const GRACE_PERIOD_MS = 48 * 60 * 60 * 1000;
export const NEAR_EXPIRY_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000;
export const MAX_EXTENSIONS = 2;

export const JOB_DESCRIPTION_MAX_LENGTH = 3000;
export const CUSTOM_ROLE_MAX_LENGTH = 100;
