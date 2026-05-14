import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "genrih — Full-Stack Developer & AI Specialist",
  description:
    "I build AI-powered SaaS that converts. Custom AI automation, chatbots, and micro-SaaS for businesses ready to scale. From idea to production in 2-3 weeks.",
  keywords: [
    "AI developer",
    "SaaS developer",
    "chatbot development",
    "AI automation",
    "Next.js developer",
    "full-stack developer",
    "Upwork",
  ],
  openGraph: {
    title: "genrih — Full-Stack Developer & AI Specialist",
    description:
      "I build AI-powered SaaS that converts. From idea to production in 2-3 weeks.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "genrih — Full-Stack Developer & AI Specialist",
    description:
      "I build AI-powered SaaS that converts. From idea to production in 2-3 weeks.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
