import { NextRequest } from "next/server";
import { validateSessionId } from "@/server/validators";
import { getSession } from "@/server/services/session-service";
import { getStatusForSession } from "@/server/services/entitlement-service";
import { ok, validationError, notFound, serverError } from "@/server/api-response";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");
    const result = validateSessionId(sessionId);

    if (!result.ok) {
      return validationError(result.errors);
    }

    const session = await getSession(result.data);
    if (!session) {
      return notFound("Session not found");
    }

    const status = await getStatusForSession(result.data);

    return ok(status);
  } catch (err) {
    console.error("[entitlement/status]", err);
    return serverError();
  }
}
