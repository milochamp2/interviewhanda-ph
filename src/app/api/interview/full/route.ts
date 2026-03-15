import { NextRequest } from "next/server";
import { validateSessionId } from "@/server/validators";
import { getSession } from "@/server/services/session-service";
import { getFullForSession } from "@/server/services/interview-service";
import { ok, validationError, notFound, forbidden, serverError } from "@/server/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateSessionId(body?.session_id);

    if (!result.ok) {
      return validationError(result.errors);
    }

    const session = await getSession(result.data);
    if (!session) {
      return notFound("Session not found");
    }

    const { content, accessState, viewOnly } = await getFullForSession(result.data, session);

    if (!content) {
      return forbidden(`Access denied. Current state: ${accessState}`);
    }

    return ok({
      content,
      access_state: accessState,
      view_only: viewOnly,
    });
  } catch (err) {
    console.error("[interview/full]", err);
    return serverError();
  }
}
