"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Lock,
  MessageCircle,
  Star,
  Headset,
  Laptop,
  ClipboardList,
  ShoppingBag,
  UtensilsCrossed,
  HeartPulse,
  BookOpen,
  Code,
  PlusCircle,
} from "lucide-react";
import {
  SITE,
  PRICE,
  JOB_CATEGORIES,
  TEASER_QUESTIONS,
  WHATS_INSIDE,
  TRUST_ITEMS,
  TESTIMONIALS,
  FAQ_ITEMS,
  HOW_IT_WORKS,
} from "@/lib/mvp-config";

const ICON_MAP: Record<string, React.ElementType> = {
  Headset,
  Laptop,
  ClipboardList,
  ShoppingBag,
  UtensilsCrossed,
  HeartPulse,
  BookOpen,
  Code,
  PlusCircle,
};

export default function LandingPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Interview<span className="text-blue-600">Handa</span>
          </span>
          <Link
            href={selectedJob ? `/pay?job=${selectedJob}` : "#categories"}
            className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Get Kit — {PRICE.formatted}
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="px-4 pt-12 pb-10 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              Stop Stressing About Your Interview.
              <br />
              <span className="text-blue-600">Start Preparing.</span>
            </h1>
            <p className="mb-6 text-base text-gray-500 sm:text-lg">
              Get a personalized interview prep kit for your exact job — tailored questions, expert answers, and tips Filipino employers actually ask.
            </p>

            {/* Preview card */}
            <div className="mx-auto max-w-sm rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Sample Question
              </p>
              <p className="mb-2 text-sm font-medium text-gray-900">
                &ldquo;Tell me about yourself.&rdquo;
              </p>
              <p className="text-sm text-gray-500">
                &ldquo;I&rsquo;m a customer service professional with 2 years in BPO. I specialize in handling escalations and maintaining a 95% CSAT score...&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                <Lock className="h-3 w-3" />
                14 more questions inside
              </div>
            </div>

            <Link
              href={selectedJob ? `/pay?job=${selectedJob}` : "#categories"}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Get Your Kit — {PRICE.formatted}
            </Link>
          </div>
        </section>

        {/* Job Categories */}
        <section id="categories" className="section-divider px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
              What job are you preparing for?
            </h2>
            <p className="mb-8 text-center text-sm text-gray-500">
              Pick your category. Your kit will be tailored to this role.
            </p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
              {JOB_CATEGORIES.map((cat) => {
                const Icon = ICON_MAP[cat.icon] || PlusCircle;
                const isSelected = selectedJob === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedJob(cat.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600/20"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${isSelected ? "text-blue-600" : "text-gray-400"}`} />
                    <span className={`text-xs font-medium leading-tight ${isSelected ? "text-blue-700" : "text-gray-700"}`}>
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedJob && (
              <div className="mt-6 text-center">
                <Link
                  href={`/pay?job=${selectedJob}`}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Continue — {PRICE.formatted}
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* How It Works */}
        <section className="section-divider px-4 py-12 bg-gray-50">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              How It Works
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {HOW_IT_WORKS.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mb-1 text-base font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teaser Questions */}
        <section className="section-divider px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
              Preview: Questions You&rsquo;ll Get
            </h2>
            <p className="mb-8 text-center text-sm text-gray-500">
              Here&rsquo;s a taste of what&rsquo;s inside your prep kit.
            </p>
            <div className="space-y-3">
              {TEASER_QUESTIONS.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                    item.locked
                      ? "border-gray-100 bg-gray-50/50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                    {i + 1}
                  </span>
                  {item.locked ? (
                    <span className="flex-1 text-sm text-gray-400 italic flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5" />
                      Unlock this question
                    </span>
                  ) : (
                    <span className="flex-1 text-sm font-medium text-gray-800">
                      {item.question}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-gray-400">
              + strong sample answers, recruiter traps, and tips for each question
            </p>
          </div>
        </section>

        {/* Confidence Gap */}
        <section className="section-divider px-4 py-12 bg-blue-50">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              70% of candidates lose the job — not because they&rsquo;re unqualified, but because they weren&rsquo;t prepared.
            </h2>
            <p className="text-base text-gray-600">
              Don&rsquo;t walk into your interview hoping for the best. Walk in <strong>knowing</strong> exactly what to say.
            </p>
          </div>
        </section>

        {/* What's Inside */}
        <section className="section-divider px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
              What&rsquo;s Inside Your Kit
            </h2>
            <p className="mb-8 text-center text-sm text-gray-500">
              Everything you need to walk in confident and walk out hired.
            </p>
            <div className="space-y-3">
              {WHATS_INSIDE.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-sm font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Price Section */}
        <section className="section-divider px-4 py-12 bg-gray-50">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              All of this for just
            </h2>
            <div className="mb-2 text-5xl font-extrabold text-blue-600">{PRICE.formatted}</div>
            <p className="mb-6 text-sm text-gray-500">One-time payment. No subscription. No hidden fees.</p>
            <Link
              href={selectedJob ? `/pay?job=${selectedJob}` : "#categories"}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Get Your Kit Now
            </Link>
          </div>
        </section>

        {/* Trust / Social Proof */}
        <section className="section-divider px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 grid grid-cols-3 gap-4 text-center">
              {TRUST_ITEMS.map((item, i) => (
                <div key={i}>
                  <div className="text-2xl font-extrabold text-gray-900">{item.stat}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="mb-2 flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-3 text-sm text-gray-700">&ldquo;{t.text}&rdquo;</p>
                  <p className="text-xs font-semibold text-gray-900">
                    {t.name} <span className="font-normal text-gray-400">— {t.role}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-divider px-4 py-12 bg-gray-50">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-gray-900">{item.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-gray-100 px-5 py-4">
                      <p className="text-sm text-gray-600">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Ready to ace your interview?
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Get your personalized prep kit now and walk in with confidence.
            </p>
            <Link
              href={selectedJob ? `/pay?job=${selectedJob}` : "#categories"}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Get Your Kit — {PRICE.formatted}
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-4 py-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Messenger CTA (mobile) */}
      <div className="fixed bottom-4 right-4 z-50 sm:hidden">
        <Link
          href={selectedJob ? `/pay?job=${selectedJob}` : "#categories"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
