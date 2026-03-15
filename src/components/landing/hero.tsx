"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Translations } from "@/lib/i18n";

interface HeroProps {
  t: Translations["hero"];
}

export function Hero({ t }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/50 to-white" />
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          <Sparkles className="h-3.5 w-3.5" />
          InterviewHanda PH
        </div>
        <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
          {t.title}
        </h1>
        <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
          {t.subtitle}
        </p>
        <Link href="/start">
          <Button
            size="lg"
            className="h-14 gap-2 rounded-xl bg-indigo-600 px-8 text-base font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 sm:h-12"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
