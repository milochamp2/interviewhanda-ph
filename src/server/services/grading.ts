import type { GradeResult } from "../types";

// Answer grading service abstraction.
// TODO: Replace with real AI grading logic (e.g. Claude API evaluation).

export async function gradeAnswer(
  questionId: string,
  questionText: string,
  userAnswer: string
): Promise<GradeResult> {
  // TODO: Send to AI for evaluation with structured output:
  // - Score (1-10)
  // - Detailed feedback
  // - Strengths list
  // - Areas for improvement

  const wordCount = userAnswer.split(/\s+/).length;
  const mockScore = Math.min(10, Math.max(3, Math.round(wordCount / 10)));

  return {
    questionId,
    score: mockScore,
    feedback: `Your answer has ${wordCount} words. In production, AI will provide detailed feedback on content, structure, and delivery.`,
    strengths: [
      "You provided a response (mock evaluation).",
      wordCount > 30 ? "Good length and detail." : "Consider adding more detail.",
    ],
    improvements: [
      "Use the STAR method for behavioral answers.",
      "Include specific examples from your experience.",
    ],
  };
}
