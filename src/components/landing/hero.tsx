"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, motion } from "@/components/motion";
import type { Translations } from "@/lib/i18n";

interface HeroProps {
  t: Translations["hero"];
}

export function Hero({ t }: HeroProps) {
  return (
    <section className="hero-mesh luminous-bg relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-32 sm:pt-24">
      <div className="mx-auto max-w-2xl text-center">
        <FadeUp>
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/60 px-4 py-1.5 text-xs font-medium text-indigo-700 shadow-sm backdrop-blur-sm dark:border-indigo-500/30 dark:bg-white/10 dark:text-indigo-300"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            InterviewHanda PH
          </motion.div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            {t.title}
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-gray-500 dark:text-gray-400 sm:text-lg">
            {t.subtitle}
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <Link href="/start">
            <Button
              size="lg"
              className="glow-button h-14 gap-2.5 rounded-2xl bg-indigo-600 px-10 text-base font-semibold hover:bg-indigo-700 sm:h-13 sm:px-8"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </FadeUp>
      </div>

      {/* Decorative floating orbs */}
      <div className="pointer-events-none absolute -bottom-16 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-indigo-400/5 blur-3xl" />
    </section>
  );
}
