import { NextRequest } from "next/server";
import { validateCreateSession } from "@/server/validators";
import { createSession } from "@/server/services/session-service";
import { ok, validationError, serverError } from "@/server/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateCreateSession(body);

    if (!result.ok) {
      return validationError(result.errors);
    }

    const session = await createSession(result.data);

    return ok({ session_id: session.id, created_at: session.createdAt });
  } catch (err) {
    console.error("[session/create]", err);
    return serverError();
  }
}
