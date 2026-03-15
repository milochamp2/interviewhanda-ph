import type { Entitlement, EntitlementStatusResponse, PlanCode } from "../types";
import { getEntitlementRepo } from "../repositories";
import {
  buildStatusResponse,
  activateEntitlement,
  applyExtension,
  canPurchaseExtension,
  computeStatus,
} from "../domain/entitlement-logic";
import { PLAN_CONFIG } from "../constants";

export async function getStatusForSession(sessionId: string): Promise<EntitlementStatusResponse> {
  const repo = getEntitlementRepo();
  const entitlement = await repo.findBySessionId(sessionId);
  return buildStatusResponse(entitlement);
}

export interface FulfillmentResult {
  success: boolean;
  error?: string;
  entitlement?: Entitlement;
}

export async function fulfillPayment(
  sessionId: string,
  plan: PlanCode,
  paymentReference: string,
  amountCents: number
): Promise<FulfillmentResult> {
  const repo = getEntitlementRepo();

  // Idempotency: check if this payment reference was already processed
  const alreadyProcessed = await repo.hasPaymentReference(paymentReference);
  if (alreadyProcessed) {
    return { success: true }; // Already fulfilled, no error
  }

  // Validate amount matches plan
  const expectedAmount = PLAN_CONFIG[plan]?.amountCents;
  if (expectedAmount && amountCents !== expectedAmount) {
    return { success: false, error: `Amount mismatch: expected ${expectedAmount}, got ${amountCents}` };
  }

  const existing = await repo.findBySessionId(sessionId);

  if (plan === "extend_149") {
    return handleExtension(existing, sessionId, paymentReference);
  }

  return handleActivation(existing, sessionId, plan, paymentReference);
}

async function handleActivation(
  existing: Entitlement | null,
  sessionId: string,
  plan: PlanCode,
  paymentReference: string
): Promise<FulfillmentResult> {
  const repo = getEntitlementRepo();

  if (existing) {
    const status = computeStatus(existing);
    if (status === "active" || status === "near_expiry") {
      // Already active — upgrade plan if higher tier
      if (plan === "bundle_999" && existing.plan === "basic_399") {
        const upgraded = {
          ...existing,
          plan: plan,
          paymentReferences: [...existing.paymentReferences, paymentReference],
        };
        const result = await repo.update(upgraded);
        return { success: true, entitlement: result };
      }
      return { success: true, entitlement: existing };
    }
  }

  const entitlement = activateEntitlement(sessionId, plan, paymentReference);
  const result = await repo.create(entitlement);
  return { success: true, entitlement: result };
}

async function handleExtension(
  existing: Entitlement | null,
  sessionId: string,
  paymentReference: string
): Promise<FulfillmentResult> {
  const repo = getEntitlementRepo();

  if (!existing) {
    return { success: false, error: "No entitlement found to extend" };
  }

  if (!canPurchaseExtension(existing)) {
    return { success: false, error: "Extension not available (max extensions reached or fully expired)" };
  }

  const extended = applyExtension(existing, paymentReference);
  const result = await repo.update(extended);
  return { success: true, entitlement: result };
}
