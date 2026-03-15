import type {
  Session,
  Entitlement,
  TeaserContent,
  FullContent,
  PaymentCheckout,
} from "../types";
import type {
  SessionRepository,
  EntitlementRepository,
  ContentRepository,
  CheckoutRepository,
} from "./interfaces";

export class InMemorySessionRepository implements SessionRepository {
  private store = new Map<string, Session>();

  async create(session: Session): Promise<Session> {
    this.store.set(session.id, session);
    return session;
  }

  async findById(id: string): Promise<Session | null> {
    return this.store.get(id) ?? null;
  }
}

export class InMemoryEntitlementRepository implements EntitlementRepository {
  private store = new Map<string, Entitlement>();
  private paymentRefs = new Set<string>();

  async create(entitlement: Entitlement): Promise<Entitlement> {
    this.store.set(entitlement.sessionId, entitlement);
    entitlement.paymentReferences.forEach((ref) => this.paymentRefs.add(ref));
    return entitlement;
  }

  async findBySessionId(sessionId: string): Promise<Entitlement | null> {
    return this.store.get(sessionId) ?? null;
  }

  async update(entitlement: Entitlement): Promise<Entitlement> {
    this.store.set(entitlement.sessionId, entitlement);
    entitlement.paymentReferences.forEach((ref) => this.paymentRefs.add(ref));
    return entitlement;
  }

  async hasPaymentReference(reference: string): Promise<boolean> {
    return this.paymentRefs.has(reference);
  }
}

export class InMemoryContentRepository implements ContentRepository {
  private teasers = new Map<string, TeaserContent>();
  private fulls = new Map<string, FullContent>();

  async saveTeaser(sessionId: string, content: TeaserContent): Promise<void> {
    this.teasers.set(sessionId, content);
  }

  async getTeaser(sessionId: string): Promise<TeaserContent | null> {
    return this.teasers.get(sessionId) ?? null;
  }

  async saveFull(sessionId: string, content: FullContent): Promise<void> {
    this.fulls.set(sessionId, content);
  }

  async getFull(sessionId: string): Promise<FullContent | null> {
    return this.fulls.get(sessionId) ?? null;
  }
}

export class InMemoryCheckoutRepository implements CheckoutRepository {
  private store = new Map<string, PaymentCheckout>();

  async create(checkout: PaymentCheckout): Promise<PaymentCheckout> {
    this.store.set(checkout.paymongoCheckoutId, checkout);
    return checkout;
  }

  async findByPaymongoId(paymongoCheckoutId: string): Promise<PaymentCheckout | null> {
    return this.store.get(paymongoCheckoutId) ?? null;
  }
}
