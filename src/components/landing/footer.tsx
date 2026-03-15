"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/motion";
import type { Translations } from "@/lib/i18n";

interface FooterProps {
  t: Translations["footer"];
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="luminous-bg relative border-t border-gray-100/50 dark:border-white/10">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <FadeUp>
          <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{t.cta}</h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <Link href="/start">
            <Button
              size="lg"
              className="glow-button h-13 gap-2.5 rounded-2xl bg-indigo-600 px-10 text-base font-semibold hover:bg-indigo-700"
            >
              {t.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </FadeUp>
      </div>
      <div className="border-t border-gray-100/50 py-6 text-center text-xs text-gray-400 dark:border-white/10 dark:text-gray-500">
        &copy; {new Date().getFullYear()} {t.copyright}
      </div>
    </footer>
  );
}
