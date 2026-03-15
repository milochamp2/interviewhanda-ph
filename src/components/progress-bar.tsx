"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-xs text-gray-400">
        <span>{current} / {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ boxShadow: "0 0 12px oklch(0.55 0.22 264 / 0.3)" }}
        />
      </div>
    </div>
  );
}
