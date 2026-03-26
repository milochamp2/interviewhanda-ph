"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import {
  SITE,
  PRICE,
  JOB_CATEGORIES,
  TEASER_QUESTIONS,
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

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".anim-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Nav scroll effect
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaHref = selectedJob ? `/pay?job=${selectedJob}` : "#categories";

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* ═══ NAV ═══ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] backdrop-blur-[20px] backdrop-saturate-[1.4] transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(10,10,15,0.95)] py-3"
            : "bg-[rgba(10,10,15,0.8)] py-4"
        }`}
      >
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6">
          <a href="#" className="font-[var(--font-display)] text-[1.3rem] font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Interview<span className="text-[var(--green)]">Handa</span>
          </a>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--green)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)] transition-all hover:bg-[#6ee7a0] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_var(--green-glow)]"
          >
            Get Kit — {PRICE.formatted}
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-40 pb-24 md:pb-28" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(74,222,128,0.06) 0%, transparent 70%)" }}>
        {/* Glow orb */}
        <div className="pointer-events-none absolute -top-[200px] -right-[200px] h-[600px] w-[600px]" style={{ background: "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)" }} />

        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
          {/* Hero content */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(74,222,128,0.2)] bg-[var(--green-glow)] px-3.5 py-1.5 text-[0.78rem] font-medium text-[var(--green)]" style={{ animation: "fadeUp 0.6s ease both" }}>
              <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--green)]" />
              Trusted by 2,400+ job seekers
            </div>

            <h1
              className="mb-5 text-[clamp(2.5rem,5.5vw,3.8rem)] font-extrabold leading-[1.12] text-white"
              style={{ fontFamily: "var(--font-display)", animation: "fadeUp 0.6s 0.1s ease both" }}
            >
              Stop Stressing.
              <br />
              Start <em className="shimmer-text not-italic">Preparing.</em>
            </h1>

            <p className="mb-9 max-w-[480px] text-[1.1rem] leading-[1.75] text-[var(--text-muted)]" style={{ animation: "fadeUp 0.6s 0.2s ease both" }}>
              Get a personalized interview prep kit for your exact job — tailored questions, expert answers, and tips Filipino employers actually ask.
            </p>

            <div className="flex flex-wrap items-center gap-4" style={{ animation: "fadeUp 0.6s 0.3s ease both" }}>
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--green)] px-8 py-4 text-base font-bold text-[var(--bg)] shadow-[0_4px_24px_var(--green-glow)] transition-all hover:bg-[#6ee7a0] hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(74,222,128,0.25)]"
              >
                Get Your Kit — {PRICE.formatted}
                <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
              <a
                href="#preview"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] bg-transparent px-7 py-4 text-[0.95rem] font-medium text-[var(--text)] transition-all hover:border-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.03)]"
              >
                See sample questions
              </a>
            </div>
          </div>

          {/* Hero card */}
          <div className="relative order-first md:order-last" style={{ animation: "fadeUp 0.8s 0.4s ease both" }}>
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--green)] via-[var(--blue)] to-[var(--green)]" />
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-dim)]">
                Sample from your kit
              </p>
              <div className="mb-3.5 rounded-[10px] border-l-[3px] border-[var(--green)] bg-[rgba(255,255,255,0.04)] px-4 py-3.5 text-[1.05rem] font-semibold text-white">
                &ldquo;Tell me about yourself.&rdquo;
              </div>
              <div className="rounded-[10px] border-l-[3px] border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.04)] px-4 py-3.5 text-[0.92rem] leading-[1.7] text-[var(--text-muted)]">
                &ldquo;I&rsquo;m a customer service professional with 2 years in BPO. I specialize in handling escalations and maintaining a 95% CSAT score&hellip;&rdquo;
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4">
                <span className="text-[0.82rem] font-semibold text-[var(--green)]">14 more questions inside →</span>
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-[var(--text-dim)] opacity-50" />
                  <span className="h-2 w-2 rounded-full bg-[var(--text-dim)] opacity-50" />
                  <span className="h-2 w-2 rounded-full bg-[var(--text-dim)] opacity-50" />
                </div>
              </div>
            </div>
            {/* Floating stats */}
            <div className="float-anim absolute -top-2.5 -right-5 hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-[0.82rem] text-[var(--text)] shadow-[0_10px_30px_rgba(0,0,0,0.3)] md:block">
              <strong className="font-bold text-[var(--green)]">93%</strong> got callbacks
            </div>
            <div className="float-anim-delay absolute -bottom-2 -left-7 hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-[0.82rem] text-[var(--text)] shadow-[0_10px_30px_rgba(0,0,0,0.3)] md:block">
              ⭐ <strong className="font-bold text-[var(--green)]">4.9</strong>/5 rating
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section id="categories" className="py-24 px-6">
        <div className="mx-auto max-w-[1120px]">
          <div className="section-label">Choose your role</div>
          <h2 className="mb-4 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.2] text-white" style={{ fontFamily: "var(--font-display)" }}>
            What job are you preparing for?
          </h2>
          <p className="mb-10 max-w-[560px] text-[1.05rem] leading-[1.7] text-[var(--text-muted)]">
            Pick your category. Your kit will be tailored to this role with industry-specific questions and answers.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {JOB_CATEGORIES.map((cat) => {
              const isSelected = selectedJob === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedJob(cat.id)}
                  className={`anim-up group relative overflow-hidden rounded-[10px] border p-5 text-center transition-all duration-300 ${
                    isSelected
                      ? "border-[var(--green)] bg-[rgba(74,222,128,0.06)] shadow-[0_8px_30px_rgba(74,222,128,0.1)]"
                      : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--green)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(74,222,128,0.1)]"
                  }`}
                >
                  <span className="relative z-10 mb-2 block text-[1.6rem]">{cat.emoji}</span>
                  <span className="relative z-10 text-[0.92rem] font-medium text-[var(--text)]">{cat.label}</span>
                </button>
              );
            })}
          </div>
          {selectedJob && (
            <div className="mt-8 text-center" style={{ animation: "fadeUp 0.4s ease both" }}>
              <Link
                href={`/pay?job=${selectedJob}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--green)] px-8 py-4 text-base font-bold text-[var(--bg)] shadow-[0_4px_24px_var(--green-glow)] transition-all hover:bg-[#6ee7a0] hover:-translate-y-0.5"
              >
                Continue — {PRICE.formatted}
                <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-[1120px] text-center">
          <div className="section-label justify-center">How it works</div>
          <h2 className="mb-10 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.2] text-white" style={{ fontFamily: "var(--font-display)" }}>
            Ready in 3 simple steps
          </h2>
          <div className="anim-up rounded-3xl bg-[var(--surface)] p-10 md:p-14">
            <div className="grid gap-10 md:grid-cols-3 md:gap-10">
              {HOW_IT_WORKS.map((item, i) => (
                <div key={item.step} className="relative text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[rgba(74,222,128,0.2)] bg-[var(--green-glow)] text-[1.3rem] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-display)" }}>
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-[1.1rem] font-bold text-white">{item.title}</h3>
                  <p className="text-[0.9rem] leading-[1.6] text-[var(--text-muted)]">{item.description}</p>
                  {/* Connector line */}
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="absolute top-7 left-[calc(50%+40px)] hidden h-0.5 w-[calc(100%-80px)] bg-gradient-to-r from-[rgba(74,222,128,0.3)] to-[rgba(74,222,128,0.05)] md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUESTIONS PREVIEW ═══ */}
      <section id="preview" className="py-12 px-6">
        <div className="mx-auto max-w-[1120px]">
          <div className="section-label">Preview</div>
          <h2 className="mb-4 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.2] text-white" style={{ fontFamily: "var(--font-display)" }}>
            Questions you&rsquo;ll get
          </h2>
          <p className="mb-10 max-w-[560px] text-[1.05rem] leading-[1.7] text-[var(--text-muted)]">
            Here&rsquo;s a taste of what&rsquo;s inside your prep kit.
          </p>
          <div className="space-y-2">
            {TEASER_QUESTIONS.map((item, i) => (
              <div
                key={i}
                className={`anim-up flex items-center gap-4 rounded-[10px] border bg-[var(--bg-card)] px-5 py-4 transition-all duration-300 ${
                  item.locked
                    ? "border-[var(--border)] opacity-40"
                    : "border-[var(--border)] hover:border-[var(--border-hover)] hover:translate-x-1"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[0.78rem] font-bold ${
                    item.locked
                      ? "bg-[rgba(255,255,255,0.05)] text-[var(--text-dim)]"
                      : "bg-[var(--green-glow)] text-[var(--green)]"
                  }`}
                >
                  {item.locked ? "🔒" : i + 1}
                </span>
                <span className={`text-[0.95rem] font-medium ${item.locked ? "text-[var(--text-dim)]" : "text-[var(--text)]"}`}>
                  {item.locked ? "Unlock this question" : item.question}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-[10px] border border-dashed border-[rgba(74,222,128,0.2)] bg-[var(--green-glow)] px-5 py-4 text-center text-[0.88rem] font-medium text-[var(--green)]">
            + strong sample answers, recruiter traps, and tips for each question
          </div>
        </div>
      </section>

      {/* ═══ STAT BANNER ═══ */}
      <section className="anim-up py-20 px-6 text-center" style={{ background: "linear-gradient(180deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%)" }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[1.1] text-[var(--red)]" style={{ fontFamily: "var(--font-display)" }}>
            70%
          </div>
          <p className="mx-auto mt-5 max-w-[600px] text-[1.2rem] leading-[1.7] text-[var(--text-muted)]">
            of candidates lose the job — not because they&rsquo;re unqualified, but because they <strong className="text-white">weren&rsquo;t prepared.</strong>
          </p>
          <p className="mx-auto mt-4 max-w-[600px] text-[var(--text)]">
            Don&rsquo;t walk in hoping for the best. Walk in{" "}
            <strong className="text-[var(--green)]">knowing exactly what to say.</strong>
          </p>
        </div>
      </section>

      {/* ═══ KIT CONTENTS ═══ */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-[1120px] text-center">
          <div className="section-label justify-center">What&rsquo;s inside</div>
          <h2 className="mb-4 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.2] text-white" style={{ fontFamily: "var(--font-display)" }}>
            Everything you need to get hired
          </h2>
          <p className="mx-auto mb-10 max-w-[560px] text-[1.05rem] leading-[1.7] text-[var(--text-muted)]">
            Walk in confident. Walk out hired.
          </p>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {KIT_CONTENTS.map((item, i) => (
              <div
                key={i}
                className="anim-up flex items-start gap-3.5 rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] p-5 text-left transition-all hover:border-[var(--border-hover)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--green-glow)] text-[1.1rem]">
                  {item.emoji}
                </div>
                <div>
                  <h4 className="mb-1 text-[0.92rem] font-semibold text-white">{item.title}</h4>
                  <p className="text-[0.82rem] leading-[1.5] text-[var(--text-muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-[1120px] text-center">
          <div className="section-label justify-center">Pricing</div>
          <h2 className="mb-0 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.2] text-white" style={{ fontFamily: "var(--font-display)" }}>
            All of this for just
          </h2>
          <div className="anim-up mx-auto mt-10 max-w-[480px] overflow-hidden rounded-3xl border-2 border-[rgba(74,222,128,0.2)] bg-[var(--bg-card)] p-12 shadow-[0_20px_60px_rgba(74,222,128,0.06)]">
            {/* Top gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--green)] via-[var(--blue)] to-[var(--green)]" />
            <div className="text-[4rem] font-extrabold text-white" style={{ fontFamily: "var(--font-display)" }}>
              <sup className="text-[1.5rem] align-super text-[var(--green)]">₱</sup>249
            </div>
            <p className="mb-8 text-[0.9rem] text-[var(--text-muted)]">
              One-time payment · No subscription · No hidden fees
            </p>
            <div className="mb-8 space-y-2 text-left">
              {PRICE_FEATURES.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 py-2 text-[0.9rem] text-[var(--text)]">
                  <Check className="h-[18px] w-[18px] shrink-0 text-[var(--green)]" />
                  {feat}
                </div>
              ))}
            </div>
            <Link
              href={ctaHref}
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--green)] px-8 py-4 text-base font-bold text-[var(--bg)] shadow-[0_4px_24px_var(--green-glow)] transition-all hover:bg-[#6ee7a0] hover:-translate-y-0.5"
            >
              Get Your Kit Now
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-[1120px] text-center">
          <div className="section-label justify-center">Results</div>
          <h2 className="mb-10 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.2] text-white" style={{ fontFamily: "var(--font-display)" }}>
            Trusted by thousands
          </h2>
          {/* Stats */}
          <div className="anim-up mb-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-8 text-center">
                <div className="text-[2.2rem] font-extrabold text-[var(--green)]" style={{ fontFamily: "var(--font-display)" }}>
                  {item.stat}
                </div>
                <div className="text-[0.85rem] text-[var(--text-muted)]">{item.label}</div>
              </div>
            ))}
          </div>
          {/* Testimonials */}
          <div className="anim-up grid gap-4 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-left transition-all hover:border-[var(--border-hover)] hover:-translate-y-0.5">
                <div className="mb-3 text-[0.85rem] tracking-[2px] text-[var(--gold)]">★★★★★</div>
                <p className="mb-3.5 text-[0.9rem] italic leading-[1.65] text-[var(--text)]">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-[0.8rem] font-semibold text-[var(--text-muted)]">
                  {t.name} — {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAYMENT METHODS ═══ */}
      <section className="py-10 px-6">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-3">
          {PAYMENT_BADGES.map((badge, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3 text-[0.82rem] font-medium text-[var(--text-muted)]"
            >
              <span className="text-base">{badge.emoji}</span>
              {badge.label}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-[1120px] text-center">
          <div className="section-label justify-center">FAQ</div>
          <h2 className="mb-10 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.2] text-white" style={{ fontFamily: "var(--font-display)" }}>
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-[700px]">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border-b border-[var(--border)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-white"
                >
                  <span className="text-base font-semibold text-[var(--text)]">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[var(--text-dim)] transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    openFaq === i ? "max-h-[200px] pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-[0.9rem] leading-[1.7] text-[var(--text-muted)]">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 px-6 text-center" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(74,222,128,0.06) 0%, transparent 70%)" }}>
        <div className="mx-auto max-w-[1120px]">
          <h2 className="mb-3 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.2] text-white" style={{ fontFamily: "var(--font-display)" }}>
            Ready to ace your interview?
          </h2>
          <p className="mb-9 text-[1.05rem] text-[var(--text-muted)]">
            Get your personalized prep kit now and walk in with confidence.
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2.5 rounded-full bg-[var(--green)] px-8 py-4 text-base font-bold text-[var(--bg)] shadow-[0_4px_24px_var(--green-glow)] transition-all hover:bg-[#6ee7a0] hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(74,222,128,0.25)]"
          >
            Get Your Kit — {PRICE.formatted}
            <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[var(--border)] py-8 px-6 text-center">
        <p className="text-[0.8rem] text-[var(--text-dim)]">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
