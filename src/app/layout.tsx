import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { AppProvider } from "@/components/providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "InterviewHanda PH — Ace Your Next Job Interview",
  description:
    "Get a personalized interview prep kit for ₱249. Tailored questions, expert answers, and tips for your dream job in the Philippines.",
  keywords:
    "interview prep Philippines, BPO interview questions, virtual assistant interview, job interview tips, Filipino job seekers",
  openGraph: {
    title: "InterviewHanda PH — Ace Your Next Job Interview",
    description:
      "Personalized interview prep kits for Filipino job seekers. 15 tailored questions, sample answers, and tips for ₱249.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
