import type { Session } from "../types";
import type { CreateSessionInput } from "../validators";
import { getSessionRepo } from "../repositories";

export async function createSession(input: CreateSessionInput): Promise<Session> {
  const repo = getSessionRepo();

  const session: Session = {
    id: crypto.randomUUID(),
    language: input.language,
    jobCategoryId: input.jobCategoryId,
    customRole: input.customRole,
    experienceLevel: input.experienceLevel,
    jobDescription: input.jobDescription,
    createdAt: new Date().toISOString(),
  };

  return repo.create(session);
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const repo = getSessionRepo();
  return repo.findById(sessionId);
}
