"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "@/components/motion";

interface PaywallCardProps {
  title: string;
  ctaText: string;
  subtitle: string;
  onCta: () => void;
}

export function PaywallCard({ title, ctaText, subtitle, onCta }: PaywallCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="shimmer-border overflow-hidden border-indigo-200/60 bg-gradient-to-b from-indigo-50/80 to-white">
        <CardContent className="flex flex-col items-center p-7 text-center sm:p-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 pulse-glow">
            <Lock className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="mb-1.5 text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mb-5 text-sm text-gray-500">{subtitle}</p>
          <Button
            onClick={onCta}
            size="lg"
            className="glow-button w-full rounded-xl bg-indigo-600 text-base font-semibold hover:bg-indigo-700"
          >
            {ctaText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
