"use client";

import { useAppState } from "@/lib/store";
import type { Language } from "@/types";

export function LanguageSelector() {
  const { language, setLanguage } = useAppState();

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200/60 bg-white/80 p-0.5 text-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
      <button
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1 font-medium transition-all duration-200 ${
          language === "en"
            ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-sm"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("tl")}
        className={`rounded-full px-3 py-1 font-medium transition-all duration-200 ${
          language === "tl"
            ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-sm"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        }`}
      >
        TL
      </button>
    </div>
  );
}

export function LanguageSelectorStandalone({
  value,
  onChange,
}: {
  value: Language;
  onChange: (lang: Language) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange("en")}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
          value === "en"
            ? "border-indigo-500/50 bg-indigo-50 text-indigo-700 shadow-sm"
            : "border-gray-200 text-gray-500 hover:border-gray-300"
        }`}
      >
        EN English
      </button>
      <button
        onClick={() => onChange("tl")}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
          value === "tl"
            ? "border-indigo-500/50 bg-indigo-50 text-indigo-700 shadow-sm"
            : "border-gray-200 text-gray-500 hover:border-gray-300"
        }`}
      >
        TL Tagalog
      </button>
    </div>
  );
}
