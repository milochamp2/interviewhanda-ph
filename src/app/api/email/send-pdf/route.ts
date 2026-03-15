import { NextRequest } from "next/server";
import { validateSendEmail } from "@/server/validators";
import { getSession } from "@/server/services/session-service";
import { getStatusForSession } from "@/server/services/entitlement-service";
import { getContentRepo } from "@/server/repositories";
import { generatePdf } from "@/server/services/pdf";
import { sendPdfEmail } from "@/server/services/email";
import { ok, validationError, notFound, forbidden, serverError } from "@/server/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateSendEmail(body);

    if (!result.ok) {
      return validationError(result.errors);
    }

    const { sessionId, email } = result.data;

    const session = await getSession(sessionId);
    if (!session) {
      return notFound("Session not found");
    }

    const status = await getStatusForSession(sessionId);
    if (!status.allowedActions.sendEmail) {
      return forbidden(`Email sending not allowed. Current state: ${status.status}`);
    }

    const contentRepo = getContentRepo();
    const content = await contentRepo.getFull(sessionId);
    if (!content) {
      return notFound("Content not generated yet");
    }

    const pdfBuffer = await generatePdf(session, content);
    const roleLabel = session.customRole || session.jobCategoryId;

    const { success, messageId } = await sendPdfEmail(
      email,
      `Your Interview Prep Kit — ${roleLabel}`,
      pdfBuffer,
      "interviewhanda-prep-kit.pdf"
    );

    if (!success) {
      return serverError("Failed to send email");
    }

    return ok({ sent: true, message_id: messageId });
  } catch (err) {
    console.error("[email/send-pdf]", err);
    return serverError();
  }
}
