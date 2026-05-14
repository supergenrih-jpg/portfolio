'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, FileText, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Discovery',
    day: 'Day 0',
    description:
      '15-minute call to understand your business, goals, and constraints. Free, no commitment. You walk away with a clear roadmap.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Specs & Design',
    day: 'Day 1–3',
    description:
      'Detailed project spec with mockups, tech stack, and milestones. Fixed price quote. We agree on scope before any code is written.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Development',
    day: 'Day 4–21',
    description:
      'Daily updates via Slack/email. You see progress live on a staging URL. Adjust direction anytime — I\'m flexible until ship date.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Support',
    day: 'Day 22+',
    description:
      'Deploy to production. Hand over admin access, docs, and video walkthrough. Free 30 days of bug fixes and minor tweaks included.',
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" ref={ref} className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">How I work</span>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
          >
            From first call to live product{' '}
            <span className="gradient-text">in 2–3 weeks</span>
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid md:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <motion.div
            className="absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, var(--cyan), var(--purple))' }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div
                  className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '2px solid var(--border-glass-hover)',
                    boxShadow: '0 0 20px rgba(6,182,212,0.1)',
                  }}
                >
                  <Icon size={32} style={{ color: 'var(--cyan)' }} />
                </div>

                <div className="glass-card p-6 w-full">
                  <span
                    className="text-xs font-mono font-bold mb-1 block"
                    style={{ color: 'var(--cyan)' }}
                  >
                    {step.day}
                  </span>
                  <div
                    className="text-3xl font-black mb-2"
                    style={{ color: 'var(--border-glass-hover)' }}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 flex gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: 'rgba(6,182,212,0.1)',
                    border: '1px solid rgba(6,182,212,0.2)',
                  }}
                >
                  <Icon size={20} style={{ color: 'var(--cyan)' }} />
                </div>
                <div>
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: 'var(--cyan)' }}
                  >
                    {step.day} · {step.number}
                  </span>
                  <h3 className="font-bold mb-2 mt-1">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
