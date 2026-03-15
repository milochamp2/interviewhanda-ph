import type {
  Session,
  Entitlement,
  TeaserContent,
  FullContent,
  PaymentCheckout,
} from "../types";

export interface SessionRepository {
  create(session: Session): Promise<Session>;
  findById(id: string): Promise<Session | null>;
}

export interface EntitlementRepository {
  create(entitlement: Entitlement): Promise<Entitlement>;
  findBySessionId(sessionId: string): Promise<Entitlement | null>;
  update(entitlement: Entitlement): Promise<Entitlement>;
  hasPaymentReference(reference: string): Promise<boolean>;
}

export interface ContentRepository {
  saveTeaser(sessionId: string, content: TeaserContent): Promise<void>;
  getTeaser(sessionId: string): Promise<TeaserContent | null>;
  saveFull(sessionId: string, content: FullContent): Promise<void>;
  getFull(sessionId: string): Promise<FullContent | null>;
}

export interface CheckoutRepository {
  create(checkout: PaymentCheckout): Promise<PaymentCheckout>;
  findByPaymongoId(paymongoCheckoutId: string): Promise<PaymentCheckout | null>;
}
