"use client";

import { JOB_CATEGORIES } from "@/lib/constants";
import type { Language } from "@/types";
import {
  Headset, Laptop, ClipboardList, ShoppingBag, UtensilsCrossed,
  Share2, TrendingUp, Palette, Code, BookOpen, HeartPulse,
  Calculator, Users, Home, Truck, PlusCircle,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  headset: Headset,
  laptop: Laptop,
  clipboard: ClipboardList,
  "shopping-bag": ShoppingBag,
  utensils: UtensilsCrossed,
  "share-2": Share2,
  "trending-up": TrendingUp,
  palette: Palette,
  code: Code,
  "book-open": BookOpen,
  "heart-pulse": HeartPulse,
  calculator: Calculator,
  users: Users,
  home: Home,
  truck: Truck,
  "plus-circle": PlusCircle,
};

interface JobCategoryGridProps {
  selected: string | undefined;
  onSelect: (id: string) => void;
  language: Language;
  compact?: boolean;
}

export function JobCategoryGrid({ selected, onSelect, language, compact }: JobCategoryGridProps) {
  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
      {JOB_CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.icon] || PlusCircle;
        const isSelected = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm font-medium transition-all ${
              compact ? "p-2.5" : "p-3 sm:p-4"
            } ${
              isSelected
                ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <Icon className={`h-5 w-5 flex-shrink-0 ${isSelected ? "text-indigo-600" : "text-gray-400"}`} />
            <span className="leading-tight">{cat.label[language]}</span>
          </button>
        );
      })}
    </div>
  );
}
