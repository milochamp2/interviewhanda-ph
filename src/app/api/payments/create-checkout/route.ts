import { NextRequest } from "next/server";
import { validateCreateCheckout } from "@/server/validators";
import { createCheckoutSession } from "@/server/services/payment-service";
import { ok, validationError, serverError } from "@/server/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateCreateCheckout(body);

    if (!result.ok) {
      return validationError(result.errors);
    }

    const checkout = await createCheckoutSession(result.data.sessionId, result.data.planCode);

    if (!checkout.success) {
      return validationError([{ field: "plan_code", message: checkout.error || "Checkout creation failed" }]);
    }

    return ok({ checkout_url: checkout.checkoutUrl });
  } catch (err) {
    console.error("[payments/create-checkout]", err);
    return serverError();
  }
}
