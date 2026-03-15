import type { PlanCode, PaymentCheckout } from "../types";
import { getCheckoutRepo, getSessionRepo, getEntitlementRepo } from "../repositories";
import { createPaymongoCheckout } from "./paymongo";
import { canPurchaseExtension } from "../domain/entitlement-logic";

export interface CreateCheckoutResult {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
}

export async function createCheckoutSession(
  sessionId: string,
  plan: PlanCode
): Promise<CreateCheckoutResult> {
  const sessionRepo = getSessionRepo();
  const session = await sessionRepo.findById(sessionId);

  if (!session) {
    return { success: false, error: "Session not found" };
  }

  // For extensions, verify eligibility
  if (plan === "extend_149") {
    const entitlementRepo = getEntitlementRepo();
    const entitlement = await entitlementRepo.findBySessionId(sessionId);
    if (!canPurchaseExtension(entitlement)) {
      return { success: false, error: "Extension not available" };
    }
  }

  const { checkoutId, checkoutUrl } = await createPaymongoCheckout(sessionId, plan);

  const checkoutRecord: PaymentCheckout = {
    id: crypto.randomUUID(),
    sessionId,
    plan,
    amount: plan === "basic_399" ? 39900 : plan === "bundle_999" ? 99900 : 14900,
    checkoutUrl,
    paymongoCheckoutId: checkoutId,
    createdAt: new Date().toISOString(),
  };

  const checkoutRepo = getCheckoutRepo();
  await checkoutRepo.create(checkoutRecord);

  return { success: true, checkoutUrl };
}
