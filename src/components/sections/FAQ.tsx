'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How fast can you build my project?',
    a: 'Most micro-SaaS MVPs take 2–3 weeks. AI chatbots take 1–2 weeks. Smaller integrations can be done in days. After our discovery call, you\'ll get a fixed timeline.',
  },
  {
    q: 'What if I don\'t have a tech background?',
    a: 'That\'s actually preferred — I do all technical decisions and handle deployment. You only need to know your business and your customers. I translate your vision into working software.',
  },
  {
    q: 'Do you do post-launch support?',
    a: 'Yes. Every project includes 30 days of free bug fixes and minor tweaks. Beyond that, ongoing support is $100–200/month depending on complexity.',
  },
  {
    q: 'Can you sign an NDA?',
    a: 'Absolutely. I sign NDAs before any project starts. Your business idea and customer data stay 100% confidential.',
  },
  {
    q: 'What happens if I\'m not happy with the result?',
    a: 'You see the work daily on a staging URL. We adjust direction until you\'re happy — that\'s part of the process. If something fundamental is wrong, we restructure or refund the remaining budget.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do. Once final payment is made, all source code, designs, and deliverables transfer to you. I keep no proprietary lock-in.',
  },
  {
    q: 'Can you work with my existing team or developer?',
    a: 'Yes. I can integrate as a contractor working alongside your team, take handover from a previous developer, or build a standalone component that plugs into your existing system.',
  },
  {
    q: 'What\'s NOT in your wheelhouse?',
    a: "I focus on web-based SaaS, AI integration, and automation. I don't do native mobile apps (iOS/Android), legacy enterprise systems, blockchain, or pure design without development.",
  },
];

function FaqItem({ faq, isOpen, onToggle }: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="glass-card overflow-hidden"
      style={{ borderColor: isOpen ? 'var(--cyan)' : undefined }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2"
        style={{ color: 'var(--text-primary)' }}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg pr-4">{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} style={{ color: isOpen ? 'var(--cyan)' : 'var(--text-muted)' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div
              className="px-6 pb-6 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">FAQ</span>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
          >
            Frequently asked
          </h2>
          <p className="mt-4" style={{ color: 'var(--text-secondary)' }}>
            Honest answers to common questions
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <FaqItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
