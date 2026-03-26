import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import { AppProvider } from "@/components/providers";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "InterviewHanda PH — Ace Your Next Job Interview",
  description:
    "Personalized interview prep kit for Filipino job seekers. 15 tailored questions, sample answers, recruiter traps & more. Just ₱249. Instant delivery via GCash/Maya.",
  keywords:
    "interview prep Philippines, BPO interview questions, virtual assistant interview, job interview tips, Filipino job seekers",
  openGraph: {
    title: "InterviewHanda PH — Ace Your Next Job Interview",
    description:
      "Stop stressing. Start preparing. Get your personalized interview prep kit for ₱249. Trusted by 2,400+ Filipino job seekers.",
    type: "website",
    url: "https://interviewhanda-ph.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${libreFranklin.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
