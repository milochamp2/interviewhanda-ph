"use client";

import Link from "next/link";
import { CheckCircle, MessageCircle, Clock } from "lucide-react";
import { SITE, MESSENGER } from "@/lib/mvp-config";

export default function DonePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center justify-center">
          <span className="text-base font-bold text-gray-900">
            Interview<span className="text-blue-600">Handa</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Payment Sent!
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          We&rsquo;re verifying your payment. Your interview prep kit will be sent to you via Messenger shortly.
        </p>

        <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Typical verification time: <strong>5–15 minutes</strong></span>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            During business hours (8 AM – 10 PM PHT)
          </p>
        </div>

        <div className="space-y-3">
          <a
            href={MESSENGER.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Open Messenger
          </a>

          <Link
            href="/"
            className="block text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-12 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h3 className="mb-2 text-sm font-semibold text-blue-900">
            Haven&rsquo;t messaged us yet?
          </h3>
          <p className="text-xs text-blue-700">
            Make sure to send your payment screenshot on Messenger so we can verify and send your kit.
          </p>
        </div>
      </main>

      <footer className="border-t border-gray-100 px-4 py-6">
        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
