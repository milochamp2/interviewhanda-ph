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
            {/* Golden Laurel Wreath Badge */}
            <div className="mb-10 flex flex-col items-center">
              <div className="relative mb-4">
                {/* Laurel wreath SVG */}
                <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-500">
                  {/* Left branch */}
                  <path d="M38 110C30 95 28 78 32 62C28 72 22 82 24 96C26 106 32 112 38 110Z" fill="currentColor" opacity="0.7"/>
                  <path d="M42 100C36 88 34 74 37 60C34 68 28 77 30 89C32 98 37 103 42 100Z" fill="currentColor" opacity="0.6"/>
                  <path d="M46 90C42 80 40 68 42 56C40 63 35 71 36 82C37 90 42 94 46 90Z" fill="currentColor" opacity="0.5"/>
                  <path d="M50 82C47 73 46 63 47 52C46 58 42 65 42 75C43 82 47 86 50 82Z" fill="currentColor" opacity="0.5"/>
                  <path d="M54 74C52 66 52 57 53 48C52 53 49 59 49 68C49 75 52 78 54 74Z" fill="currentColor" opacity="0.4"/>
                  {/* Right branch (mirrored) */}
                  <path d="M102 110C110 95 112 78 108 62C112 72 118 82 116 96C114 106 108 112 102 110Z" fill="currentColor" opacity="0.7"/>
                  <path d="M98 100C104 88 106 74 103 60C106 68 112 77 110 89C108 98 103 103 98 100Z" fill="currentColor" opacity="0.6"/>
                  <path d="M94 90C98 80 100 68 98 56C100 63 105 71 104 82C103 90 98 94 94 90Z" fill="currentColor" opacity="0.5"/>
                  <path d="M90 82C93 73 94 63 93 52C94 58 98 65 98 75C97 82 93 86 90 82Z" fill="currentColor" opacity="0.5"/>
                  <path d="M86 74C88 66 88 57 87 48C88 53 91 59 91 68C91 75 88 78 86 74Z" fill="currentColor" opacity="0.4"/>
                  {/* Bottom ribbon */}
                  <path d="M45 108L35 130L42 124L48 132L52 112Z" fill="currentColor" opacity="0.6"/>
                  <path d="M95 108L105 130L98 124L92 132L88 112Z" fill="currentColor" opacity="0.6"/>
                </svg>
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-yellow-600">4.9</span>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium text-gray-500 mt-0.5">RATING</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-700">Trusted by 2,400+ job seekers</p>
            </div>

            {/* Stats row */}
            <div className="mb-10 grid grid-cols-3 gap-4 text-center">
              {TRUST_ITEMS.map((item, i) => (
                <div key={i}>
                  <div className="text-2xl font-extrabold text-gray-900">{item.stat}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Testimonials */}
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

        {/* Infinite Payment Logos Marquee */}
        <section className="overflow-hidden border-y border-gray-100 bg-gray-50 py-6">
          <div className="marquee-track">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex shrink-0 items-center gap-10 px-5">
                {/* GCash */}
                <div className="flex items-center gap-2 shrink-0">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#007DFE"/>
                    <text x="16" y="21" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">G</text>
                  </svg>
                  <span className="text-sm font-bold text-[#007DFE]">GCash</span>
                </div>
                {/* Maya */}
                <div className="flex items-center gap-2 shrink-0">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#00B274"/>
                    <text x="16" y="21" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">M</text>
                  </svg>
                  <span className="text-sm font-bold text-[#00B274]">Maya</span>
                </div>
                {/* Secure Payment */}
                <div className="flex items-center gap-2 shrink-0">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#F3F4F6"/>
                    <path d="M16 8L10 11V16C10 20.4 12.6 24.5 16 26C19.4 24.5 22 20.4 22 16V11L16 8Z" fill="#22C55E" opacity="0.9"/>
                    <path d="M14 17L15.5 18.5L19 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">Secure Payment</span>
                </div>
                {/* Instant Delivery */}
                <div className="flex items-center gap-2 shrink-0">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#F3F4F6"/>
                    <path d="M17 9L12 18H16L15 23L20 14H16L17 9Z" fill="#F59E0B"/>
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">Instant Delivery</span>
                </div>
                {/* Google Drive */}
                <div className="flex items-center gap-2 shrink-0">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#F3F4F6"/>
                    <path d="M12 10L8 18H14L18 10H12Z" fill="#4285F4"/>
                    <path d="M18 10L14 18L17 23H23L27 18H18Z" fill="#FBBC04" opacity="0.9"/>
                    <path d="M8 18L11 23H17L14 18H8Z" fill="#34A853"/>
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">Google Drive</span>
                </div>
                {/* Messenger */}
                <div className="flex items-center gap-2 shrink-0">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#F3F4F6"/>
                    <path d="M16 8C11.6 8 8 11.2 8 15.2C8 17.4 9.1 19.3 10.8 20.6V24L14 22.2C14.6 22.4 15.3 22.5 16 22.5C20.4 22.5 24 19.3 24 15.2C24 11.2 20.4 8 16 8Z" fill="#0084FF"/>
                    <path d="M12 16.5L15 13L17 16L20 13" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">Messenger</span>
                </div>
                {/* No Account Needed */}
                <div className="flex items-center gap-2 shrink-0">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#F3F4F6"/>
                    <circle cx="16" cy="14" r="4" fill="#6366F1" opacity="0.8"/>
                    <path d="M10 24C10 20.7 12.7 18 16 18C19.3 18 22 20.7 22 24" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                    <path d="M9 9L23 23" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">No Account Needed</span>
                </div>
              </div>
            ))}
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
