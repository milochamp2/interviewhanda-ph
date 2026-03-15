"use client";

import { useAppState } from "@/lib/store";
import type { Language } from "@/types";

export function LanguageSelector() {
  const { language, setLanguage } = useAppState();

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white p-0.5 text-sm">
      <button
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1 font-medium transition-colors ${
          language === "en"
            ? "bg-indigo-600 text-white"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("tl")}
        className={`rounded-full px-3 py-1 font-medium transition-colors ${
          language === "tl"
            ? "bg-indigo-600 text-white"
            : "text-gray-500 hover:text-gray-700"
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
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          value === "en"
            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
            : "border-gray-200 text-gray-500 hover:border-gray-300"
        }`}
      >
        🇺🇸 English
      </button>
      <button
        onClick={() => onChange("tl")}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          value === "tl"
            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
            : "border-gray-200 text-gray-500 hover:border-gray-300"
        }`}
      >
        🇵🇭 Tagalog
      </button>
    </div>
  );
}
