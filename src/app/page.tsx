"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import {
  SITE,
  PRICE,
  MESSENGER,
  JOB_CATEGORIES,
  KIT_CONTENTS,
  PRICE_FEATURES,
  TRUST_ITEMS,
  TESTIMONIALS,
  PAYMENT_BADGES,
  FAQ_ITEMS,
  HOW_IT_WORKS,
} from "@/lib/mvp-config";

export default function LandingPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Sticky mobile CTA — show after scrolling past hero
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const selectedLabel = JOB_CATEGORIES.find((c) => c.id === selectedJob)?.label;
  const messengerHref = selectedLabel
    ? `${MESSENGER.url}?text=${encodeURIComponent(MESSENGER.prefill(selectedLabel))}`
    : MESSENGER.url;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* ═══ STICKY TOP BAR ═══ */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[var(--green)] px-5 py-2.5 text-center text-[0.82rem] font-semibold text-white">
        🎯 <strong className="font-extrabold">2,400+</strong> kits delivered &nbsp;·&nbsp; <strong className="font-extrabold">93%</strong> got interview callbacks
      </div>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-[38px] left-0 right-0 z-[99] border-b border-[var(--border)] bg-[rgba(250,250,247,0.92)] px-5 py-3 backdrop-blur-[16px] backdrop-saturate-[1.5]">
        <div className="mx-auto flex max-w-[680px] items-center justify-between">
          <a href="#" className="text-[1.15rem] font-extrabold text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
            Interview<span className="text-[var(--green)]">Handa</span>
          </a>
          <Link
            href="#categories"
            className="rounded-full bg-[var(--green)] px-5 py-2 text-[0.82rem] font-bold text-white transition-colors hover:bg-[#15803d]"
          >
            Get Kit — {PRICE.formatted}
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" className="px-5 pt-[120px] pb-12 text-center">
        <div className="mx-auto max-w-[680px]">
          {/* Trust badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(202,138,4,0.15)] bg-[var(--gold-light)] px-4 py-1.5 text-[0.78rem] font-semibold text-[var(--gold)]"
            style={{ animation: "fadeUp 0.5s ease both" }}
          >
            ⭐ 4.9/5 from 2,400+ Filipino job seekers
          </div>

          <h1
            className="mb-4 text-[clamp(2rem,7vw,2.8rem)] font-extrabold leading-[1.15] text-[var(--text)]"
            style={{ fontFamily: "var(--font-display)", animation: "fadeUp 0.5s 0.1s ease both" }}
          >
            Alam mo na ba kung ano{" "}
            <span className="text-[var(--green)] underline decoration-[rgba(22,163,74,0.3)] underline-offset-4">
              sasabihin mo
            </span>{" "}
            sa interview?
          </h1>

          <p
            className="mx-auto mb-7 max-w-[500px] text-[1.05rem] leading-[1.7] text-[var(--text-secondary)]"
            style={{ animation: "fadeUp 0.5s 0.2s ease both" }}
          >
            Get a personalized prep kit with 15 real interview questions, strong sample answers, and tips for your exact job — delivered instantly for just {PRICE.formatted}.
          </p>

          <div style={{ animation: "fadeUp 0.5s 0.3s ease both" }}>
            <Link
              href="#categories"
              className="inline-flex w-full max-w-[380px] items-center justify-center gap-2.5 rounded-full bg-[var(--green)] px-9 py-4 text-[1.05rem] font-bold text-white shadow-[0_4px_16px_rgba(22,163,74,0.2)] transition-all hover:bg-[#15803d] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(22,163,74,0.25)]"
            >
              Get Your Kit — {PRICE.formatted}
              <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
            <span className="mt-2.5 block text-[0.8rem] text-[var(--text-muted)]">
              GCash or Maya · <strong className="text-[var(--text-secondary)]">Instant delivery</strong>
            </span>
          </div>

          {/* Proof strip */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[0.82rem] font-medium text-[var(--text-muted)]"
            style={{ animation: "fadeUp 0.5s 0.4s ease both" }}
          >
            <span><strong className="font-bold text-[var(--text)]">2,400+</strong> kits sold</span>
            <span><span className="tracking-[1px] text-[var(--gold)]">★★★★★</span> <strong className="font-bold text-[var(--text)]">4.9</strong></span>
            <span><strong className="font-bold text-[var(--text)]">93%</strong> got callbacks</span>
          </div>
        </div>
      </section>

      {/* ═══ SAMPLE CARD ═══ */}
      <section className="px-5 pb-12">
        <div className="reveal mx-auto max-w-[680px] overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-warm)] px-5 py-3.5">
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">Preview from your kit</span>
            <span className="rounded-full bg-[var(--green-light)] px-2.5 py-0.5 text-[0.7rem] font-bold text-[var(--green)]">Q1 of 15</span>
          </div>
          <div className="p-5">
            <div className="mb-3 rounded-[10px] border-l-[3px] border-[var(--green)] bg-[var(--bg-warm)] px-4 py-3.5 text-[0.95rem] font-bold text-[var(--text)]">
              &ldquo;Tell me about yourself.&rdquo;
            </div>
            <div className="rounded-[10px] border-l-[3px] border-[rgba(22,163,74,0.25)] bg-[var(--green-bg)] px-4 py-3.5 text-[0.88rem] leading-[1.7] text-[var(--text-secondary)]">
              &ldquo;I&rsquo;m a customer service professional with 2 years in BPO. I specialize in handling escalations and maintaining a 95% CSAT score&hellip;&rdquo;
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--bg-warm)] px-5 py-3.5">
            <span className="text-[0.82rem] font-bold text-[var(--green)]">14 more questions inside →</span>
            <div className="flex gap-1">
              <span className="h-[7px] w-[7px] rounded-full bg-[var(--text-muted)] opacity-30" />
              <span className="h-[7px] w-[7px] rounded-full bg-[var(--text-muted)] opacity-30" />
              <span className="h-[7px] w-[7px] rounded-full bg-[var(--text-muted)] opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ URGENCY BANNER ═══ */}
      <section className="reveal border-y border-[rgba(220,38,38,0.08)] bg-[var(--red-light)] px-5 py-9 text-center">
        <div className="mx-auto max-w-[680px]">
          <div className="text-[clamp(2.5rem,10vw,4rem)] font-extrabold leading-none text-[var(--red)]" style={{ fontFamily: "var(--font-display)" }}>
            70%
          </div>
          <p className="mx-auto mt-2.5 max-w-[480px] text-base leading-[1.6] text-[var(--text-secondary)]">
            of candidates lose the job — not because they&rsquo;re unqualified, but because they <strong className="text-[var(--text)]">weren&rsquo;t prepared.</strong>
          </p>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section id="categories" className="px-5 py-14">
        <div className="mx-auto max-w-[680px]">
          <div className="mb-6 text-center">
            <div className="section-tag">Step 1</div>
            <h2 className="text-[clamp(1.6rem,5vw,2.2rem)] font-extrabold leading-[1.2] text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
              Anong job ang papasukan mo?
            </h2>
            <p className="mt-2 text-[0.95rem] text-[var(--text-muted)]">
              Pick your category. We&rsquo;ll tailor your kit to this role.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {JOB_CATEGORIES.map((cat) => {
              const isSelected = selectedJob === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedJob(cat.id)}
                  className={`reveal select-none rounded-[10px] border-2 p-4 text-center transition-all sm:p-5 ${
                    isSelected
                      ? "border-[var(--green)] bg-[var(--green-bg)] shadow-[0_0_0_1px_var(--green)]"
                      : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--green)] hover:bg-[var(--green-bg)]"
                  }`}
                >
                  <span className="mb-1.5 block text-[1.3rem] sm:text-[1.5rem]">{cat.emoji}</span>
                  <span className="text-[0.72rem] font-semibold leading-tight text-[var(--text-secondary)] sm:text-[0.78rem]">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Messenger CTA */}
          <div className="mt-6 text-center">
            <a
              href={messengerHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-[380px] items-center justify-center gap-2.5 rounded-full bg-[var(--blue-messenger)] px-9 py-4 text-base font-bold text-white shadow-[0_4px_16px_rgba(0,132,255,0.2)] transition-all hover:bg-[#0070e0]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.15 7.2V22l2.96-1.63c.84.23 1.72.36 2.65.36h.24c5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.05 13.07-2.55-2.73L5.5 15.2l5.45-5.78 2.55 2.73 4.94-2.85-5.39 5.77z"/>
              </svg>
              Message Us on Messenger
            </a>
            <span className="mt-2.5 block text-[0.8rem] text-[var(--text-muted)]">
              Send your <strong className="text-[var(--text-secondary)]">category + GCash/Maya receipt</strong> → get your kit
            </span>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="px-5 pb-14">
        <div className="mx-auto max-w-[680px]">
          <div className="mb-0 text-center">
            <div className="section-tag">How it works</div>
            <h2 className="text-[clamp(1.6rem,5vw,2.2rem)] font-extrabold leading-[1.2] text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
              3 steps lang &rsquo;yan
            </h2>
          </div>
          <div className="reveal mt-6">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={item.step} className={`flex gap-4 py-4 ${i < HOW_IT_WORKS.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--green-light)] text-[1.1rem] font-extrabold text-[var(--green)]" style={{ fontFamily: "var(--font-display)" }}>
                  {item.step}
                </div>
                <div>
                  <h3 className="text-[0.95rem] font-bold text-[var(--text)]">{item.title}</h3>
                  <p className="text-[0.85rem] leading-[1.5] text-[var(--text-muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT'S INSIDE ═══ */}
      <section className="px-5 py-14">
        <div className="mx-auto max-w-[680px]">
          <div className="text-center">
            <div className="section-tag">What you get</div>
            <h2 className="text-[clamp(1.6rem,5vw,2.2rem)] font-extrabold leading-[1.2] text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
              Everything inside your kit
            </h2>
          </div>
          <div className="mt-6">
            {KIT_CONTENTS.map((item, i) => (
              <div key={i} className="reveal flex items-start gap-3 py-3.5">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--green-light)] text-[var(--green)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="text-[0.92rem] font-bold text-[var(--text)]">{item.title}</h4>
                  <p className="mt-0.5 text-[0.82rem] leading-[1.5] text-[var(--text-muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="px-5 pb-14">
        <div className="mx-auto max-w-[680px]">
          <div className="reveal relative overflow-hidden rounded-[20px] border-2 border-[var(--green)] bg-[var(--bg-card)] p-9 text-center shadow-[var(--shadow-lg)] sm:p-12">
            {/* Best Value ribbon */}
            <div className="absolute top-4 -right-8 rotate-45 bg-[var(--green)] px-10 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.08em] text-white">
              Best Value
            </div>

            <div className="text-[3.5rem] font-extrabold leading-none text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
              <sup className="text-[1.2rem] align-super text-[var(--green)]">₱</sup>249
            </div>
            <p className="mt-2 mb-6 text-[0.85rem] text-[var(--text-muted)]">
              One-time payment · No subscription · No hidden fees
            </p>

            <div className="mb-7 space-y-1.5 text-left">
              {PRICE_FEATURES.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1.5 text-[0.88rem] text-[var(--text-secondary)]">
                  <Check className="h-[18px] w-[18px] shrink-0 text-[var(--green)]" strokeWidth={2.5} />
                  {feat}
                </div>
              ))}
            </div>

            <Link
              href="#categories"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--green)] px-9 py-4 text-[1.05rem] font-bold text-white shadow-[0_4px_16px_rgba(22,163,74,0.2)] transition-all hover:bg-[#15803d] hover:-translate-y-px"
            >
              Get Your Kit Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="px-5 py-14">
        <div className="mx-auto max-w-[680px]">
          <div className="text-center">
            <div className="section-tag">Real results</div>
            <h2 className="text-[clamp(1.6rem,5vw,2.2rem)] font-extrabold leading-[1.2] text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
              What job seekers are saying
            </h2>
          </div>

          {/* Stats */}
          <div className="reveal mt-6 grid grid-cols-3 gap-2.5">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] px-3 py-5 text-center">
                <div className="text-[1.8rem] font-extrabold text-[var(--green)]" style={{ fontFamily: "var(--font-display)" }}>
                  {item.stat}
                </div>
                <div className="text-[0.75rem] text-[var(--text-muted)]">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial cards */}
          <div className="mt-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="reveal mb-3 rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-all hover:shadow-[var(--shadow)]">
                <div className="mb-2.5 text-[0.82rem] tracking-[2px] text-[var(--gold)]">★★★★★</div>
                <blockquote className="mb-3 text-[0.92rem] italic leading-[1.6] text-[var(--text)]">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <p className="text-[0.78rem] font-bold text-[var(--text-muted)]">
                  {t.name} — {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAYMENT BADGES ═══ */}
      <section className="px-5 py-5">
        <div className="mx-auto flex max-w-[680px] flex-wrap items-center justify-center gap-2">
          {PAYMENT_BADGES.map((badge, i) => (
            <div key={i} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-2 text-[0.75rem] font-semibold text-[var(--text-muted)]">
              {badge.emoji} {badge.label}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="px-5 py-14">
        <div className="mx-auto max-w-[680px]">
          <div className="text-center">
            <div className="section-tag">FAQ</div>
            <h2 className="text-[clamp(1.6rem,5vw,2.2rem)] font-extrabold leading-[1.2] text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
              May tanong ka?
            </h2>
          </div>
          <div className="mt-6">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border-b border-[var(--border)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between py-[18px] text-left"
                >
                  <span className="text-[0.92rem] font-bold text-[var(--text)]">{item.q}</span>
                  <ChevronDown
                    className={`h-[18px] w-[18px] shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-350 ${openFaq === i ? "max-h-[200px] pb-[18px]" : "max-h-0"}`}>
                  <p className="text-[0.85rem] leading-[1.7] text-[var(--text-muted)]">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="border-t border-[rgba(22,163,74,0.1)] bg-[var(--green-bg)] px-5 py-14 text-center">
        <div className="mx-auto max-w-[680px]">
          <h2 className="mb-2 text-[clamp(1.6rem,5vw,2.2rem)] font-extrabold leading-[1.2] text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
            Ready ka na ba?
          </h2>
          <p className="mb-6 text-[0.95rem] text-[var(--text-muted)]">
            Get your kit now. Walk in with confidence.
          </p>
          <Link
            href="#categories"
            className="inline-flex max-w-[380px] items-center justify-center gap-2.5 rounded-full bg-[var(--green)] px-9 py-4 text-[1.05rem] font-bold text-white shadow-[0_4px_16px_rgba(22,163,74,0.2)] transition-all hover:bg-[#15803d] hover:-translate-y-px"
          >
            Get Your Kit — {PRICE.formatted}
            <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-5 py-6 pb-24 text-center sm:pb-6">
        <p className="text-[0.75rem] text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </footer>

      {/* ═══ STICKY MOBILE CTA ═══ */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-center gap-2.5 border-t border-[var(--border)] bg-[rgba(250,250,247,0.95)] px-5 py-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] backdrop-blur-[16px] transition-transform duration-300 sm:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="shrink-0 whitespace-nowrap">
          <span className="text-[1.3rem] font-extrabold text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>₱249</span>
          <span className="block text-[0.7rem] font-medium text-[var(--text-muted)]">one-time</span>
        </div>
        <Link
          href="#categories"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--green)] px-5 py-3.5 text-[0.95rem] font-bold text-white transition-colors hover:bg-[#15803d]"
        >
          Get Your Kit →
        </Link>
      </div>
    </div>
  );
}
