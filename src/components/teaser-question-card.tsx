"use client";

import { Card, CardContent } from "@/components/ui/card";

interface TeaserQuestionCardProps {
  index: number;
  question: string;
}

export function TeaserQuestionCard({ index, question }: TeaserQuestionCardProps) {
  return (
    <Card className="glow-card border-gray-100/80 bg-white dark:border-white/10 dark:bg-white/5">
      <CardContent className="p-4 sm:p-5">
        <div className="flex gap-3">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 text-sm font-semibold text-indigo-700 dark:from-indigo-900/40 dark:to-indigo-800/20 dark:text-indigo-300">
            {index}
          </span>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{question}</p>
        </div>
      </CardContent>
    </Card>
  );
}
