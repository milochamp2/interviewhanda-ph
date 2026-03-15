import { NextRequest, NextResponse } from "next/server";
import { validateSessionId } from "@/server/validators";
import { getSession } from "@/server/services/session-service";
import { getStatusForSession } from "@/server/services/entitlement-service";
import { getContentRepo } from "@/server/repositories";
import { generatePdf } from "@/server/services/pdf";
import { validationError, notFound, forbidden, serverError } from "@/server/api-response";

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
    if (!status.allowedActions.downloadPdf) {
      return forbidden(`PDF download not allowed. Current state: ${status.status}`);
    }

    const contentRepo = getContentRepo();
    const content = await contentRepo.getFull(result.data);
    if (!content) {
      return notFound("Content not generated yet");
    }

    const pdfBuffer = await generatePdf(session, content);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="interviewhanda-prep-kit.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error("[pdf/download]", err);
    return serverError();
  }
}
