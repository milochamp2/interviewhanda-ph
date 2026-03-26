"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Copy, Check, MessageCircle } from "lucide-react";
import {
  PRICE,
  PAYMENT,
  MESSENGER,
  JOB_CATEGORIES,
} from "@/lib/mvp-config";

type PayMethod = "gcash" | "maya";

export default function PayPage() {
  const [method, setMethod] = useState<PayMethod>("gcash");
  const [copied, setCopied] = useState(false);
  const [job, setJob] = useState("others");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const jobParam = params.get("job");
    if (jobParam) setJob(jobParam);
  }, []);

  const jobLabel =
    JOB_CATEGORIES.find((c) => c.id === job)?.label ?? "Others";

  const refCode = `IH-${job.toUpperCase()}-${Date.now().toString(36).toUpperCase().slice(-5)}`;

  const number = method === "gcash" ? PAYMENT.gcashNumber : PAYMENT.mayaNumber;
  const name = method === "gcash" ? PAYMENT.gcashName : PAYMENT.mayaName;
  const qrSrc = method === "gcash" ? PAYMENT.gcashQr : PAYMENT.mayaQr;

  function handleCopy() {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const messengerUrl = `${MESSENGER.url}?ref=${encodeURIComponent(refCode)}&text=${encodeURIComponent(
    MESSENGER.prefill(jobLabel, refCode)
  )}`;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] px-6 py-4">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Link href="/" className="text-[var(--text-dim)] transition-colors hover:text-[var(--text)]">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Interview<span className="text-[var(--green)]">Handa</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-6 py-10">
        {/* Order summary */}
        <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Interview Prep Kit</p>
              <p className="text-xs text-[var(--text-muted)]">{jobLabel}</p>
            </div>
            <span className="text-xl font-extrabold text-[var(--green)]">{PRICE.formatted}</span>
          </div>
        </div>

        {/* Payment method tabs */}
        <h2 className="mb-4 text-lg font-bold text-white">Pay via</h2>
        <div className="mb-8 flex gap-3">
          {(["gcash", "maya"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-all ${
                method === m
                  ? "border-[var(--green)] bg-[var(--green-glow)] text-[var(--green)]"
                  : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--border-hover)]"
              }`}
            >
              {m === "gcash" ? "GCash" : "Maya"}
            </button>
          ))}
        </div>

        {/* QR Code */}
        <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center">
          <div className="mx-auto mb-5 flex h-52 w-52 items-center justify-center rounded-xl bg-[var(--surface)]">
            <Image
              src={qrSrc}
              alt={`${method === "gcash" ? "GCash" : "Maya"} QR Code`}
              width={200}
              height={200}
              className="rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.innerHTML =
                  '<div class="flex flex-col items-center gap-2" style="color: var(--text-dim)"><span style="font-size: 2.5rem">📱</span><span style="font-size: 0.75rem">QR Code</span></div>';
              }}
            />
          </div>
          <p className="mb-1 text-sm font-semibold text-white">{name}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-[var(--text-muted)]">{number}</span>
            <button
              onClick={handleCopy}
              className="rounded-md p-1 text-[var(--text-dim)] transition-colors hover:text-[var(--green)]"
              title="Copy number"
            >
              {copied ? <Check className="h-4 w-4 text-[var(--green)]" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-4 text-xs text-[var(--text-dim)]">
            Send exactly <strong className="text-white">{PRICE.formatted}</strong> to the number above
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h3 className="mb-4 text-sm font-bold text-white">After paying:</h3>
          <ol className="space-y-3 text-sm text-[var(--text-muted)]">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--green-glow)] text-xs font-bold text-[var(--green)]">1</span>
              Take a screenshot of your payment receipt
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--green-glow)] text-xs font-bold text-[var(--green)]">2</span>
              Tap &ldquo;I&rsquo;ve Paid&rdquo; below to message us on Messenger
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--green-glow)] text-xs font-bold text-[var(--green)]">3</span>
              Send the screenshot — we&rsquo;ll verify and send your kit!
            </li>
          </ol>
        </div>

        {/* Reference code */}
        <div className="mb-8 rounded-2xl border border-dashed border-[rgba(74,222,128,0.2)] bg-[var(--green-glow)] p-5 text-center">
          <p className="mb-1 text-xs text-[var(--text-muted)]">Your Reference Code</p>
          <p className="font-mono text-sm font-bold text-white">{refCode}</p>
          <p className="mt-1 text-xs text-[var(--text-dim)]">Include this in your message to us</p>
        </div>

        {/* I've Paid CTA */}
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--green)] px-8 py-4 text-base font-bold text-[var(--bg)] shadow-[0_4px_24px_var(--green-glow)] transition-all hover:bg-[#6ee7a0] hover:-translate-y-0.5"
        >
          <MessageCircle className="h-5 w-5" />
          I&rsquo;ve Paid — Send via Messenger
        </a>

        <p className="mt-5 text-center text-xs text-[var(--text-dim)]">
          We&rsquo;ll verify your payment and send the Google Drive link within 5–15 minutes.
        </p>
      </main>
    </div>
  );
}
