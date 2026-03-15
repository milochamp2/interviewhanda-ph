import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterviewHanda PH — Ace Your Next Job Interview",
  description:
    "Get personalized interview questions, expert answers, and preparation tips tailored to your dream job in the Philippines.",
  openGraph: {
    title: "InterviewHanda PH",
    description:
      "Personalized interview preparation for Filipino job seekers.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
