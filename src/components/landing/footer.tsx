"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Translations } from "@/lib/i18n";

interface FooterProps {
  t: Translations["footer"];
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="border-t border-gray-100 bg-gray-50/50">
      <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">{t.cta}</h2>
        <Link href="/start">
          <Button
            size="lg"
            className="h-12 gap-2 rounded-xl bg-indigo-600 px-8 text-base font-semibold hover:bg-indigo-700"
          >
            {t.ctaButton}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} {t.copyright}
      </div>
    </footer>
  );
}
