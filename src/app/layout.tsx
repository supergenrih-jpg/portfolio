import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Automation for Business | Custom Chatbots & SaaS in 2–3 Weeks',
  description:
    'Custom AI automation that grows your revenue 24/7. WhatsApp/Instagram chatbots, lead generation tools, and micro-SaaS. From idea to production in 2–3 weeks.',
  openGraph: {
    title: 'AI Automation for Business — AI Studio Developer',
    description:
      'Custom AI automation that grows your revenue 24/7. WhatsApp/Instagram chatbots, lead generation tools, and micro-SaaS.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0a0a0f] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
