import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature, parseWebhookPayload } from "@/server/services/paymongo";
import { getCheckoutRepo } from "@/server/repositories";
import { fulfillPayment } from "@/server/services/entitlement-service";
import type { PlanCode } from "@/server/types";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("paymongo-signature") || "";

    // Step 1: Verify webhook signature
    if (!verifyWebhookSignature(rawBody, signature)) {
      console.error("[webhook] Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Step 2: Parse payload
    const payload = parseWebhookPayload(rawBody);
    if (!payload) {
      console.error("[webhook] Failed to parse payload");
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Step 3: Only process payment success events
    if (payload.eventType !== "checkout_session.payment.paid") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Step 4: Look up checkout record to get session_id and plan
    const checkoutRepo = getCheckoutRepo();
    const checkout = await checkoutRepo.findByPaymongoId(payload.checkoutId);

    const sessionId = checkout?.sessionId || payload.metadata.session_id;
    const planCode = (checkout?.plan || payload.metadata.plan_code) as PlanCode;

    if (!sessionId || !planCode) {
      console.error("[webhook] Missing session_id or plan_code in metadata");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    // Step 5: Fulfill payment (idempotent)
    const result = await fulfillPayment(
      sessionId,
      planCode,
      payload.paymentReference,
      payload.amountCents
    );

    if (!result.success) {
      console.error("[webhook] Fulfillment failed:", result.error);
      return NextResponse.json({ error: result.error }, { status: 422 });
    }

    return NextResponse.json({ received: true, fulfilled: true }, { status: 200 });
  } catch (err) {
    console.error("[webhook] Unhandled error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
