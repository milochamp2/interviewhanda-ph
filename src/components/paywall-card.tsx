"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PaywallCardProps {
  title: string;
  ctaText: string;
  subtitle: string;
  onCta: () => void;
}

export function PaywallCard({ title, ctaText, subtitle, onCta }: PaywallCardProps) {
  return (
    <Card className="border-indigo-200 bg-gradient-to-b from-indigo-50 to-white">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
          <Lock className="h-6 w-6 text-indigo-600" />
        </div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mb-4 text-sm text-gray-500">{subtitle}</p>
        <Button
          onClick={onCta}
          size="lg"
          className="w-full bg-indigo-600 text-base font-semibold hover:bg-indigo-700"
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
}
