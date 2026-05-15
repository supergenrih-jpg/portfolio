import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Studio Developer | AI SaaS, Chatbots & Automation',
  description:
    'Custom AI automation, chatbots, and micro-SaaS for businesses. From idea to production in 2–3 weeks. Next.js, OpenAI, Supabase expert.',
  openGraph: {
    title: 'AI Studio Developer',
    description:
      'I build AI-powered SaaS that converts. Custom automation, chatbots, and micro-SaaS in 2–3 weeks.',
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
