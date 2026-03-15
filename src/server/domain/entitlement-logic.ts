import type { Entitlement, EntitlementStatus, AllowedActions, EntitlementStatusResponse } from "../types";
import {
  GRACE_PERIOD_MS,
  NEAR_EXPIRY_THRESHOLD_MS,
  MAX_EXTENSIONS,
  EXTENSION_DURATION_MS,
  ACCESS_DURATION_MS,
} from "../constants";

export function computeStatus(entitlement: Entitlement | null): EntitlementStatus {
  if (!entitlement) return "none";

  const now = Date.now();
  const expiresAt = new Date(entitlement.expiresAt).getTime();
  const diff = expiresAt - now;

  if (diff > NEAR_EXPIRY_THRESHOLD_MS) return "active";
  if (diff > 0) return "near_expiry";
  if (Math.abs(diff) <= GRACE_PERIOD_MS) return "in_grace";
  return "expired";
}

export function computeAllowedActions(status: EntitlementStatus, extensionsUsed: number): AllowedActions {
  switch (status) {
    case "active":
    case "near_expiry":
      return {
        viewContent: true,
        downloadPdf: true,
        sendEmail: true,
        grade: true,
        purchaseExtension: extensionsUsed < MAX_EXTENSIONS,
      };
    case "in_grace":
      return {
        viewContent: true,
        downloadPdf: false,
        sendEmail: false,
        grade: false,
        purchaseExtension: extensionsUsed < MAX_EXTENSIONS,
      };
    case "expired":
      return {
        viewContent: false,
        downloadPdf: false,
        sendEmail: false,
        grade: false,
        purchaseExtension: false,
      };
    case "none":
    default:
      return {
        viewContent: false,
        downloadPdf: false,
        sendEmail: false,
        grade: false,
        purchaseExtension: false,
      };
  }
}

export function buildStatusResponse(entitlement: Entitlement | null): EntitlementStatusResponse {
  const status = computeStatus(entitlement);
  const expiresAt = entitlement?.expiresAt ?? null;
  const timeRemainingMs = expiresAt
    ? Math.max(0, new Date(expiresAt).getTime() - Date.now())
    : 0;
  const extensionsUsed = entitlement?.extensionsUsed ?? 0;

  return {
    status,
    expiresAt,
    timeRemainingMs,
    extensionsUsed,
    maxExtensions: MAX_EXTENSIONS,
    allowedActions: computeAllowedActions(status, extensionsUsed),
  };
}

export function activateEntitlement(
  sessionId: string,
  plan: Entitlement["plan"],
  paymentReference: string
): Entitlement {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    sessionId,
    plan,
    status: "active",
    activatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + ACCESS_DURATION_MS).toISOString(),
    extensionsUsed: 0,
    paymentReferences: [paymentReference],
  };
}

export function applyExtension(entitlement: Entitlement, paymentReference: string): Entitlement {
  const status = computeStatus(entitlement);
  const now = Date.now();
  const currentExpiry = new Date(entitlement.expiresAt).getTime();

  let newExpiry: number;
  if (status === "in_grace" || status === "expired") {
    newExpiry = now + EXTENSION_DURATION_MS;
  } else {
    newExpiry = currentExpiry + EXTENSION_DURATION_MS;
  }

  return {
    ...entitlement,
    status: "active",
    expiresAt: new Date(newExpiry).toISOString(),
    extensionsUsed: entitlement.extensionsUsed + 1,
    paymentReferences: [...entitlement.paymentReferences, paymentReference],
  };
}

export function canPurchaseExtension(entitlement: Entitlement | null): boolean {
  if (!entitlement) return false;
  const status = computeStatus(entitlement);
  if (status === "expired" || status === "none") return false;
  return entitlement.extensionsUsed < MAX_EXTENSIONS;
}
