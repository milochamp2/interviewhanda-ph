"use client";

import Link from "next/link";
import { CheckCircle, MessageCircle, Clock } from "lucide-react";
import { SITE, MESSENGER } from "@/lib/mvp-config";

export default function DonePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] px-6 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-center">
          <span className="text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Interview<span className="text-[var(--green)]">Handa</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-6 py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green-glow)] border border-[rgba(74,222,128,0.2)]">
          <CheckCircle className="h-8 w-8 text-[var(--green)]" />
        </div>

        <h1 className="mb-3 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Payment Sent!
        </h1>
        <p className="mb-10 text-sm text-[var(--text-muted)]">
          We&rsquo;re verifying your payment. Your interview prep kit will be sent to you via Messenger shortly.
        </p>

        <div className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <div className="flex items-center justify-center gap-2.5 text-sm text-[var(--text)]">
            <Clock className="h-4 w-4 text-[var(--green)]" />
            <span>Typical verification time: <strong className="text-white">5–15 minutes</strong></span>
          </div>
          <p className="mt-2 text-xs text-[var(--text-dim)]">
            During business hours (8 AM – 10 PM PHT)
          </p>
        </div>

        <div className="space-y-4">
          <a
            href={MESSENGER.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--green)] px-8 py-4 text-base font-bold text-[var(--bg)] shadow-[0_4px_24px_var(--green-glow)] transition-all hover:bg-[#6ee7a0] hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5" />
            Open Messenger
          </a>

          <Link
            href="/"
            className="block text-sm text-[var(--text-muted)] transition-colors hover:text-white"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-14 rounded-2xl border border-[rgba(74,222,128,0.15)] bg-[var(--green-glow)] p-6">
          <h3 className="mb-2 text-sm font-semibold text-[var(--green)]">
            Haven&rsquo;t messaged us yet?
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Make sure to send your payment screenshot on Messenger so we can verify and send your kit.
          </p>
        </div>
      </main>

      <footer className="border-t border-[var(--border)] py-8 px-6 text-center">
        <p className="text-[0.8rem] text-[var(--text-dim)]">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
