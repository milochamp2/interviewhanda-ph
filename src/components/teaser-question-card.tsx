"use client";

import { Card, CardContent } from "@/components/ui/card";

interface TeaserQuestionCardProps {
  index: number;
  question: string;
}

export function TeaserQuestionCard({ index, question }: TeaserQuestionCardProps) {
  return (
    <Card className="border-gray-200 bg-white">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
            {index}
          </span>
          <p className="text-sm leading-relaxed text-gray-700">{question}</p>
        </div>
      </CardContent>
    </Card>
  );
}
