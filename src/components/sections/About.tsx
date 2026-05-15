'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
  { value: 3, label: 'Production apps shipped', suffix: '' },
  { value: 100, label: 'Git commits this month', suffix: '+' },
  { value: 25, label: 'Lines of code written', suffix: 'K+' },
  { value: 3, label: 'Average MVP delivery', suffix: ' weeks' },
];

const languages = [
  { flag: '🇬🇧', name: 'English', level: 'Fluent' },
  { flag: '🇺🇦', name: 'Ukrainian', level: 'Native' },
  { flag: '🇷🇺', name: 'Russian', level: 'Native' },
  { flag: '🇵🇱', name: 'Polish', level: 'Conversational' },
];

function StatCard({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className="glass-card p-6 text-center">
      <div
        className="text-4xl font-bold mb-2"
        style={{
          background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {count}{suffix}
      </div>
      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="w-full px-4 sm:px-6 lg:px-8 py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Centered heading — matches all other sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">About Me</span>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
          >
            I turn ideas into{' '}
            <span className="gradient-text">shipped products.</span>
          </h2>
        </motion.div>

        {/* 2-col: bio text left, stats right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: bio + languages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="space-y-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                I&apos;m genrih — a full-stack developer with deep specialization in AI
                integration and SaaS development. Over the past months I&apos;ve shipped 3
                production-grade AI applications: a lead generation platform with OpenAI
                integration, a real-estate CRM with AI listing generator, and a
                multi-channel messaging assistant connecting WhatsApp, Instagram, and
                Telegram.
              </p>
              <p>
                My focus is simple: deliver working software fast. While other developers
                spend months on enterprise platforms, I ship complete micro-SaaS in 2–3
                weeks using a focused stack — Next.js, TypeScript, Supabase, and OpenAI.
              </p>
              <p>
                I work mostly with founders, agencies, and small businesses who need
                custom AI solutions tailored to their industry. Whether you need a chatbot
                for your dental clinic, a CRM for your real estate agency, or lead
                automation for your B2B sales team — I build it from scratch, deploy to
                production, and hand you the keys.
              </p>
            </div>

            {/* Languages */}
            <div className="mt-8">
              <p
                className="text-sm font-semibold mb-4 uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                Languages
              </p>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <div key={lang.name} className="glass-card px-4 py-2 flex items-center gap-2">
                    <span role="img" aria-label={lang.name}>{lang.flag}</span>
                    <span className="font-medium text-sm">{lang.name}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: stat cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <StatCard {...stat} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
