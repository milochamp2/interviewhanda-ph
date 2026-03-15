"use client";

import { useAppState } from "@/lib/store";
import { getTranslations } from "@/lib/i18n";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CategoriesPreview } from "@/components/landing/categories-preview";
import { TrustSection } from "@/components/landing/trust-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  const { language } = useAppState();
  const t = getTranslations(language);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="glass sticky top-0 z-50 border-b border-gray-100/50 dark:border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:py-3.5">
          <span className="text-base font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Interview<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Handa</span>
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main>
        <Hero t={t.hero} />
        <HowItWorks t={t.howItWorks} />
        <CategoriesPreview t={t.categories} language={language} />
        <TrustSection t={t.trust} />
        <FaqSection title={t.faq.title} items={t.faq.items} />
        <div className="py-8" />
      </main>

      <Footer t={t.footer} />
    </div>
  );
}
