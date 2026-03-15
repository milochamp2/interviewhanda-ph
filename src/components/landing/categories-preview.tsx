"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JOB_CATEGORIES } from "@/lib/constants";
import { FadeUp, StaggerGroup, StaggerItem, motion } from "@/components/motion";
import type { Language } from "@/types";
import type { Translations } from "@/lib/i18n";

interface CategoriesPreviewProps {
  t: Translations["categories"];
  language: Language;
}

export function CategoriesPreview({ t, language }: CategoriesPreviewProps) {
  const featured = JOB_CATEGORIES.slice(0, 8);

  return (
    <section id="categories" className="luminous-bg relative bg-gray-50/30 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeUp>
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            {t.title}
          </h2>
          <p className="mb-10 text-center text-sm text-gray-500">{t.subtitle}</p>
        </FadeUp>

        <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featured.map((cat) => (
            <StaggerItem key={cat.id}>
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="glow-card cursor-default rounded-xl border border-gray-100/80 bg-white px-4 py-3.5 text-center text-sm font-medium text-gray-700"
              >
                {cat.label[language]}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeUp delay={0.3}>
          <div className="mt-8 text-center">
            <Link href="/start">
              <Button variant="ghost" className="gap-2 text-indigo-600 hover:text-indigo-700">
                View all categories <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
