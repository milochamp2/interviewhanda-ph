import type { PlanCode } from "../types";
import { PLAN_CONFIG } from "../constants";

// PayMongo service abstraction.
// TODO: Replace with real PayMongo API calls using their REST API.

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY || "";
const PAYMONGO_WEBHOOK_SECRET = process.env.PAYMONGO_WEBHOOK_SECRET || "";
const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export interface PaymongoCheckoutResult {
  checkoutId: string;
  checkoutUrl: string;
}

export async function createPaymongoCheckout(
  sessionId: string,
  plan: PlanCode
): Promise<PaymongoCheckoutResult> {
  const config = PLAN_CONFIG[plan];

  // TODO: Replace with real PayMongo API call:
  // POST https://api.paymongo.com/v1/checkout_sessions
  // Authorization: Basic base64(PAYMONGO_SECRET_KEY)
  // Body: {
  //   data: {
  //     attributes: {
  //       line_items: [{ name: config.label, amount: config.amountCents, currency: "PHP", quantity: 1 }],
  //       payment_method_types: ["gcash", "paymaya", "card"],
  //       success_url: `${APP_BASE_URL}/success?session=${sessionId}`,
  //       cancel_url: `${APP_BASE_URL}/checkout?session=${sessionId}`,
  //       metadata: { session_id: sessionId, plan_code: plan },
  //     }
  //   }
  // }

  const mockCheckoutId = `cs_mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return {
    checkoutId: mockCheckoutId,
    checkoutUrl: `${APP_BASE_URL}/success?session=${sessionId}&plan=${plan}&mock_checkout=${mockCheckoutId}`,
  };
}

export interface WebhookPayload {
  eventType: string;
  checkoutId: string;
  paymentReference: string;
  amountCents: number;
  metadata: Record<string, string>;
}

export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string
): boolean {
  if (!PAYMONGO_WEBHOOK_SECRET) {
    // In development without a secret, skip verification
    return true;
  }

  // TODO: Implement real HMAC-SHA256 verification:
  // 1. Extract timestamp and signature from header
  // 2. Compute HMAC-SHA256 of `${timestamp}.${rawBody}` using PAYMONGO_WEBHOOK_SECRET
  // 3. Compare computed signature with received signature
  // 4. Verify timestamp is within acceptable window (e.g. 5 minutes)

  return true;
}

export function parseWebhookPayload(rawBody: string): WebhookPayload | null {
  try {
    const event = JSON.parse(rawBody);

    // TODO: Parse real PayMongo webhook structure:
    // event.data.attributes.type === "checkout_session.payment.paid"
    // event.data.attributes.data.attributes.checkout_session_id
    // event.data.attributes.data.attributes.payment_intent.attributes.payments[0].id
    // event.data.attributes.data.attributes.line_items[0].amount

    // Mock parsing for development
    return {
      eventType: event.data?.attributes?.type || "checkout_session.payment.paid",
      checkoutId: event.data?.attributes?.data?.id || "mock_checkout_id",
      paymentReference: event.data?.attributes?.data?.attributes?.payments?.[0]?.id || `pay_mock_${Date.now()}`,
      amountCents: event.data?.attributes?.data?.attributes?.amount || 39900,
      metadata: event.data?.attributes?.data?.attributes?.metadata || {},
    };
  } catch {
    return null;
  }
}
