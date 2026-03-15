"use client";

import { JOB_CATEGORIES } from "@/lib/constants";
import type { Language } from "@/types";
import {
  Headset, Laptop, ClipboardList, ShoppingBag, UtensilsCrossed,
  Share2, TrendingUp, Palette, Code, BookOpen, HeartPulse,
  Calculator, Users, Home, Truck, PlusCircle,
} from "lucide-react";
import { motion } from "framer-motion";

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
    <div className={`grid gap-2.5 ${compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
      {JOB_CATEGORIES.map((cat, i) => {
        const Icon = iconMap[cat.icon] || PlusCircle;
        const isSelected = selected === cat.id;
        return (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(cat.id)}
            className={`touch-target flex items-center gap-3 rounded-xl border text-left text-sm font-medium transition-all ${
              compact ? "p-3" : "p-3.5 sm:p-4"
            } ${
              isSelected
                ? "glow-card border-indigo-500/50 bg-indigo-50 text-indigo-700"
                : "border-gray-200/60 bg-white text-gray-700 hover:border-gray-300/80"
            }`}
          >
            <Icon className={`h-5 w-5 flex-shrink-0 transition-colors ${isSelected ? "text-indigo-600" : "text-gray-400"}`} />
            <span className="leading-tight">{cat.label[language]}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
