"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JOB_CATEGORIES } from "@/lib/constants";
import type { Language } from "@/types";
import type { Translations } from "@/lib/i18n";

interface CategoriesPreviewProps {
  t: Translations["categories"];
  language: Language;
}

export function CategoriesPreview({ t, language }: CategoriesPreviewProps) {
  const featured = JOB_CATEGORIES.slice(0, 8);

  return (
    <section id="categories" className="bg-gray-50/50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {t.title}
        </h2>
        <p className="mb-8 text-center text-sm text-gray-500">{t.subtitle}</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featured.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 shadow-sm"
            >
              {cat.label[language]}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/start">
            <Button variant="ghost" className="gap-2 text-indigo-600 hover:text-indigo-700">
              View all categories <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
