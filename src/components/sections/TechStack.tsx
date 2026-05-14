'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const groups = [
  {
    label: 'Frontend',
    color: 'var(--cyan)',
    items: [
      'Next.js 15',
      'TypeScript',
      'React 19',
      'Tailwind CSS',
      'shadcn/ui',
      'Framer Motion',
      'React Query',
    ],
  },
  {
    label: 'Backend',
    color: 'var(--purple)',
    items: [
      'Supabase',
      'PostgreSQL',
      'Node.js',
      'Edge Functions',
      'REST + tRPC',
      'Webhook handlers',
      'Row Level Security',
    ],
  },
  {
    label: 'AI',
    color: 'var(--cyan-light)',
    items: [
      'OpenAI (gpt-4o)',
      'Anthropic Claude',
      'LangChain',
      'Pinecone',
      'Zod (structured output)',
      'AI SDK by Vercel',
    ],
  },
  {
    label: 'Deploy & Tools',
    color: 'var(--purple-light)',
    items: [
      'Vercel',
      'Resend',
      'Stripe',
      'Twilio',
      'Meta Graph API',
      'Telegram Bot API',
      'Git + GitHub Actions',
    ],
  },
];

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="stack"
      ref={ref}
      className="py-24 px-6"
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">Stack</span>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
          >
            Tools I use to ship{' '}
            <span className="gradient-text">fast and reliable</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {groups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <h3
                className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: group.color }}
              >
                {group.label}
              </h3>
              <div className="flex flex-col gap-2">
                {group.items.map((item, ii) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: gi * 0.1 + ii * 0.05 }}
                    className="tech-badge justify-start font-mono"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: group.color }}
                    />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
