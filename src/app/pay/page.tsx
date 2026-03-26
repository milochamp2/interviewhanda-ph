"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Copy, Check, MessageCircle, QrCode } from "lucide-react";
import {
  SITE,
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-base font-bold text-gray-900">
            Interview<span className="text-blue-600">Handa</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-8">
        {/* Order summary */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">Interview Prep Kit</p>
              <p className="text-xs text-gray-500">{jobLabel}</p>
            </div>
            <span className="text-xl font-extrabold text-blue-600">{PRICE.formatted}</span>
          </div>
        </div>

        {/* Payment method tabs */}
        <h2 className="mb-3 text-lg font-bold text-gray-900">Pay via</h2>
        <div className="mb-6 flex gap-3">
          {(["gcash", "maya"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                method === m
                  ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/20"
                  : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
              }`}
            >
              {m === "gcash" ? "GCash" : "Maya"}
            </button>
          ))}
        </div>

        {/* QR Code */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto mb-4 flex h-52 w-52 items-center justify-center rounded-xl bg-gray-100">
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
                  '<div class="flex flex-col items-center gap-2 text-gray-400"><svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span class="text-xs">QR Code</span></div>';
              }}
            />
          </div>
          <p className="mb-1 text-sm font-semibold text-gray-900">{name}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-gray-600">{number}</span>
            <button
              onClick={handleCopy}
              className="rounded-md p-1 text-gray-400 hover:text-blue-600 transition-colors"
              title="Copy number"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Send exactly <strong className="text-gray-700">{PRICE.formatted}</strong> to the number above
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-3 text-sm font-bold text-gray-900">After paying:</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">1</span>
              Take a screenshot of your payment receipt
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">2</span>
              Tap &ldquo;I&rsquo;ve Paid&rdquo; below to message us on Messenger
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">3</span>
              Send the screenshot — we&rsquo;ll verify and send your kit!
            </li>
          </ol>
        </div>

        {/* Reference code */}
        <div className="mb-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Your Reference Code</p>
          <p className="text-sm font-mono font-bold text-gray-900">{refCode}</p>
          <p className="text-xs text-gray-400 mt-1">Include this in your message to us</p>
        </div>

        {/* I've Paid CTA */}
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          I&rsquo;ve Paid — Send via Messenger
        </a>

        <p className="mt-4 text-center text-xs text-gray-400">
          We&rsquo;ll verify your payment and send the Google Drive link within 5–15 minutes.
        </p>
      </main>
    </div>
  );
}
