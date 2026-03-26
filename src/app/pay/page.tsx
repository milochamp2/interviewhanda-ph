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

  const messengerUrl = `${MESSENGER.url}?text=${encodeURIComponent(
    MESSENGER.paidPrefill(jobLabel, refCode)
  )}`;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] px-5 py-3">
        <div className="mx-auto flex max-w-[680px] items-center gap-3">
          <Link href="/" className="text-[var(--text-muted)] transition-colors hover:text-[var(--text)]">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-[1.15rem] font-extrabold text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
            Interview<span className="text-[var(--green)]">Handa</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[680px] px-5 py-8">
        {/* Order summary */}
        <div className="mb-6 rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text)]">Interview Prep Kit</p>
              <p className="text-xs text-[var(--text-muted)]">{jobLabel}</p>
            </div>
            <span className="text-xl font-extrabold text-[var(--green)]">{PRICE.formatted}</span>
          </div>
        </div>

        {/* Payment method tabs */}
        <h2 className="mb-3 text-lg font-bold text-[var(--text)]">Pay via</h2>
        <div className="mb-6 flex gap-2.5">
          {(["gcash", "maya"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 rounded-[10px] border-2 px-4 py-3 text-sm font-bold transition-all ${
                method === m
                  ? "border-[var(--green)] bg-[var(--green-bg)] text-[var(--green)]"
                  : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--green)] hover:bg-[var(--green-bg)]"
              }`}
            >
              {m === "gcash" ? "GCash" : "Maya"}
            </button>
          ))}
        </div>

        {/* QR Code */}
        <div className="mb-6 rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] p-6 text-center shadow-[var(--shadow-sm)]">
          <div className="mx-auto mb-4 flex h-52 w-52 items-center justify-center rounded-xl bg-[var(--bg-warm)]">
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
                  '<div class="flex flex-col items-center gap-2"><span style="font-size: 2.5rem">📱</span><span style="font-size: 0.75rem; color: var(--text-muted)">QR Code</span></div>';
              }}
            />
          </div>
          <p className="mb-1 text-sm font-bold text-[var(--text)]">{name}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-[var(--text-secondary)]">{number}</span>
            <button
              onClick={handleCopy}
              className="rounded-md p-1 text-[var(--text-muted)] transition-colors hover:text-[var(--green)]"
              title="Copy number"
            >
              {copied ? <Check className="h-4 w-4 text-[var(--green)]" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Send exactly <strong className="text-[var(--text)]">{PRICE.formatted}</strong> to the number above
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-6 rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-sm)]">
          <h3 className="mb-3 text-sm font-bold text-[var(--text)]">After paying:</h3>
          <ol className="space-y-2.5 text-sm text-[var(--text-secondary)]">
            {[
              "Take a screenshot of your payment receipt",
              "Tap \"I've Paid\" below to message us on Messenger",
              "Send the screenshot — we'll verify and send your kit!",
            ].map((text, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--green-light)] text-xs font-bold text-[var(--green)]">{i + 1}</span>
                {text}
              </li>
            ))}
          </ol>
        </div>

        {/* Reference code */}
        <div className="mb-6 rounded-[14px] border-2 border-dashed border-[var(--green-glow)] bg-[var(--green-bg)] p-4 text-center">
          <p className="mb-1 text-xs text-[var(--text-muted)]">Your Reference Code</p>
          <p className="font-mono text-sm font-bold text-[var(--text)]">{refCode}</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Include this in your message to us</p>
        </div>

        {/* I've Paid CTA */}
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--blue-messenger)] px-8 py-4 text-base font-bold text-white shadow-[0_4px_16px_rgba(0,132,255,0.2)] transition-all hover:bg-[#0070e0]"
        >
          <MessageCircle className="h-5 w-5" />
          I&rsquo;ve Paid — Send via Messenger
        </a>

        <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
          We&rsquo;ll verify your payment and send the Google Drive link within 5–15 minutes.
        </p>
      </main>
    </div>
  );
}
