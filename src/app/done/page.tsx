"use client";

import Link from "next/link";
import { CheckCircle, MessageCircle, Clock } from "lucide-react";
import { SITE, MESSENGER } from "@/lib/mvp-config";

export default function DonePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] px-5 py-3">
        <div className="mx-auto flex max-w-[680px] items-center justify-center">
          <span className="text-[1.15rem] font-extrabold text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
            Interview<span className="text-[var(--green)]">Handa</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[680px] px-5 py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green-light)]">
          <CheckCircle className="h-8 w-8 text-[var(--green)]" />
        </div>

        <h1 className="mb-2 text-2xl font-extrabold text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
          Payment Sent!
        </h1>
        <p className="mb-8 text-sm text-[var(--text-muted)]">
          We&rsquo;re verifying your payment. Your interview prep kit will be sent to you via Messenger shortly.
        </p>

        <div className="mb-8 rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
            <Clock className="h-4 w-4 text-[var(--green)]" />
            <span>Typical verification time: <strong className="text-[var(--text)]">5–15 minutes</strong></span>
          </div>
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            During business hours (8 AM – 10 PM PHT)
          </p>
        </div>

        <div className="space-y-3">
          <a
            href={MESSENGER.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--blue-messenger)] px-8 py-4 text-base font-bold text-white shadow-[0_4px_16px_rgba(0,132,255,0.2)] transition-all hover:bg-[#0070e0]"
          >
            <MessageCircle className="h-5 w-5" />
            Open Messenger
          </a>

          <Link
            href="/"
            className="block text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-12 rounded-[14px] border border-[rgba(22,163,74,0.15)] bg-[var(--green-bg)] p-5">
          <h3 className="mb-2 text-sm font-bold text-[var(--green)]">
            Haven&rsquo;t messaged us yet?
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Make sure to send your payment screenshot on Messenger so we can verify and send your kit.
          </p>
        </div>
      </main>

      <footer className="px-5 py-6 text-center">
        <p className="text-[0.75rem] text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
