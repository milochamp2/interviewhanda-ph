import type { Session, FullContent } from "../types";

// PDF generation service abstraction.
// TODO: Replace with real PDF generation (e.g. @react-pdf/renderer, puppeteer, or a cloud PDF API).

export async function generatePdf(
  session: Session,
  content: FullContent
): Promise<Buffer> {
  // TODO: Generate a real PDF from session + content data.
  // For now, return a mock PDF buffer with a text placeholder.

  const mockText = [
    `InterviewHanda PH — Interview Preparation Kit`,
    `Job: ${session.customRole || session.jobCategoryId}`,
    `Experience: ${session.experienceLevel}`,
    `Generated: ${new Date().toISOString()}`,
    ``,
    `Questions: ${content.questions.length}`,
    `Tips: ${content.tips.length}`,
    ...content.questions.map((q, i) => `\n${i + 1}. ${q.question}\nAnswer: ${q.sampleAnswer}`),
  ].join("\n");

  return Buffer.from(mockText, "utf-8");
}
