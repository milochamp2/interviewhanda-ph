import { NextRequest } from "next/server";
import { validateSessionId } from "@/server/validators";
import { getSession } from "@/server/services/session-service";
import { getTeaserForSession } from "@/server/services/interview-service";
import { ok, validationError, notFound, serverError } from "@/server/api-response";

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

    const teaser = await getTeaserForSession(session);

    return ok(teaser);
  } catch (err) {
    console.error("[interview/teaser]", err);
    return serverError();
  }
}
