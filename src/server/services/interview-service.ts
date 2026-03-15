import type { Session, TeaserContent, FullContent, EntitlementStatus } from "../types";
import { getContentRepo, getEntitlementRepo } from "../repositories";
import { generateTeaserContent, generateFullContent } from "./generation";
import { computeStatus, computeAllowedActions } from "../domain/entitlement-logic";

export async function getTeaserForSession(session: Session): Promise<TeaserContent> {
  const contentRepo = getContentRepo();

  const cached = await contentRepo.getTeaser(session.id);
  if (cached) return cached;

  const teaser = await generateTeaserContent(session);
  await contentRepo.saveTeaser(session.id, teaser);
  return teaser;
}

export interface FullContentResult {
  content: FullContent | null;
  accessState: EntitlementStatus;
  viewOnly: boolean;
}

export async function getFullForSession(sessionId: string, session: Session): Promise<FullContentResult> {
  const entitlementRepo = getEntitlementRepo();
  const contentRepo = getContentRepo();

  const entitlement = await entitlementRepo.findBySessionId(sessionId);
  const status = computeStatus(entitlement);
  const actions = computeAllowedActions(status, entitlement?.extensionsUsed ?? 0);

  if (!actions.viewContent) {
    return { content: null, accessState: status, viewOnly: false };
  }

  let content = await contentRepo.getFull(sessionId);
  if (!content) {
    const isBundle = entitlement?.plan === "bundle_999";
    content = await generateFullContent(session, isBundle);
    await contentRepo.saveFull(sessionId, content);
  }

  return {
    content,
    accessState: status,
    viewOnly: status === "in_grace",
  };
}
