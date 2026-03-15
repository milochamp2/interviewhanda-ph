import { NextRequest } from "next/server";
import { validateGradeInput } from "@/server/validators";
import { getSession } from "@/server/services/session-service";
import { getStatusForSession } from "@/server/services/entitlement-service";
import { gradeAnswer } from "@/server/services/grading";
import { getContentRepo } from "@/server/repositories";
import { ok, validationError, notFound, forbidden, serverError } from "@/server/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateGradeInput(body);

    if (!result.ok) {
      return validationError(result.errors);
    }

    const { sessionId, questionId, answer } = result.data;

    const session = await getSession(sessionId);
    if (!session) {
      return notFound("Session not found");
    }

    const status = await getStatusForSession(sessionId);
    if (!status.allowedActions.grade) {
      return forbidden(`Grading not allowed. Current state: ${status.status}`);
    }

    const contentRepo = getContentRepo();
    const content = await contentRepo.getFull(sessionId);
    const question = content?.questions.find((q) => q.id === questionId);

    if (!question) {
      return notFound("Question not found");
    }

    const gradeResult = await gradeAnswer(questionId, question.question, answer);

    return ok(gradeResult);
  } catch (err) {
    console.error("[interview/grade]", err);
    return serverError();
  }
}
