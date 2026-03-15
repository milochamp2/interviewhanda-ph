import type { QuestionnaireData, TeaserResult, FullResult, PlanType, SessionState } from "@/types";
import { mockTeaserResult, mockFullResult, getMockSession } from "./mock-data";

// Placeholder API service — replace with real endpoints when backend is ready

export async function createSession(data: QuestionnaireData): Promise<{ sessionId: string }> {
  await simulateDelay();
  return { sessionId: "mock-session-001" };
}

export async function generateTeaser(sessionId: string): Promise<TeaserResult> {
  await simulateDelay(1500);
  return mockTeaserResult;
}

export async function createCheckout(sessionId: string, plan: PlanType): Promise<{ checkoutUrl: string }> {
  await simulateDelay();
  return { checkoutUrl: `/success?session=${sessionId}&plan=${plan}` };
}

export async function getEntitlementStatus(sessionId: string): Promise<SessionState> {
  await simulateDelay(500);
  return getMockSession("base", "active");
}

export async function getFullResults(sessionId: string): Promise<FullResult> {
  await simulateDelay(500);
  return mockFullResult;
}

export async function downloadPdf(sessionId: string): Promise<{ url: string }> {
  await simulateDelay();
  return { url: "#mock-pdf-download" };
}

export async function sendResultsEmail(sessionId: string, email: string): Promise<{ success: boolean }> {
  await simulateDelay();
  return { success: true };
}

export async function createExtension(sessionId: string, type: "extend7" | "renew30" | "upgrade"): Promise<{ checkoutUrl: string }> {
  await simulateDelay();
  return { checkoutUrl: `/checkout?session=${sessionId}&type=${type}` };
}

function simulateDelay(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
