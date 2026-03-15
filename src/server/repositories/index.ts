import type {
  SessionRepository,
  EntitlementRepository,
  ContentRepository,
  CheckoutRepository,
} from "./interfaces";
import {
  InMemorySessionRepository,
  InMemoryEntitlementRepository,
  InMemoryContentRepository,
  InMemoryCheckoutRepository,
} from "./in-memory";

// Singleton repository instances.
// Replace these with database-backed implementations (e.g. Supabase) later.
// Only this file needs to change — all services depend on interfaces, not implementations.

let sessionRepo: SessionRepository;
let entitlementRepo: EntitlementRepository;
let contentRepo: ContentRepository;
let checkoutRepo: CheckoutRepository;

export function getSessionRepo(): SessionRepository {
  if (!sessionRepo) sessionRepo = new InMemorySessionRepository();
  return sessionRepo;
}

export function getEntitlementRepo(): EntitlementRepository {
  if (!entitlementRepo) entitlementRepo = new InMemoryEntitlementRepository();
  return entitlementRepo;
}

export function getContentRepo(): ContentRepository {
  if (!contentRepo) contentRepo = new InMemoryContentRepository();
  return contentRepo;
}

export function getCheckoutRepo(): CheckoutRepository {
  if (!checkoutRepo) checkoutRepo = new InMemoryCheckoutRepository();
  return checkoutRepo;
}

export type { SessionRepository, EntitlementRepository, ContentRepository, CheckoutRepository };
