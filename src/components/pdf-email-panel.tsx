"use client";

import { useState } from "react";
import { Download, Mail, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { downloadPdf, sendResultsEmail } from "@/lib/api";
import type { Translations } from "@/lib/i18n";

interface PdfEmailPanelProps {
  sessionId: string;
  t: Translations["success"];
  disabled?: boolean;
}

export function PdfEmailPanel({ sessionId, t, disabled }: PdfEmailPanelProps) {
  const [email, setEmail] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      await downloadPdf(sessionId);
    } finally {
      setDownloading(false);
    }
  }

  async function handleSendEmail() {
    if (!email) return;
    setSending(true);
    try {
      await sendResultsEmail(sessionId, email);
      setEmailSent(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <Card className="glow-card border-gray-100/80 bg-white dark:border-white/10 dark:bg-white/5">
      <CardContent className="space-y-4 p-5 sm:p-6">
        <Button
          onClick={handleDownload}
          disabled={disabled || downloading}
          className="glow-button touch-target w-full rounded-xl bg-indigo-600 font-medium hover:bg-indigo-700"
        >
          {downloading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          {t.downloadPdf}
        </Button>

        <div className="space-y-2.5">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.sendEmail}</p>
          <div className="flex gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.enterEmail}
              className="h-11 flex-1 rounded-xl border-gray-200/80 text-sm focus:border-indigo-300 focus:ring-indigo-200/50 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
              disabled={disabled}
            />
            <Button
              onClick={handleSendEmail}
              disabled={disabled || sending || !email || emailSent}
              variant="outline"
              className="h-11 rounded-xl border-gray-200/80 dark:border-white/10"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : emailSent ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
