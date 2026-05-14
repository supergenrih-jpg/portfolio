'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { Suspense } from 'react';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 to-purple-950/20" />
  ),
});

const heroWords = "I build AI-powered SaaS that converts.".split(' ');

export default function Hero() {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 to-purple-950/20" />}>
        <HeroScene />
      </Suspense>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(10,10,15,0.7) 70%, rgba(10,10,15,0.95) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-eyebrow inline-block mb-6"
        >
          Full-Stack Developer · AI Specialist · Available for Hire
        </motion.p>

        {/* H1 with word reveal */}
        <h1
          className="font-bold leading-none mb-8"
          style={{
            fontSize: 'clamp(3rem, 8vw, 9rem)',
            letterSpacing: '-0.03em',
          }}
          aria-label="I build AI-powered SaaS that converts."
        >
          {heroWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={
                word === 'AI-powered' || word === 'converts.'
                  ? 'gradient-text inline-block mr-[0.25em]'
                  : 'inline-block mr-[0.25em]'
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          From idea to production in 2–3 weeks. Custom AI automation, chatbots,
          and micro-SaaS for businesses ready to scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <button onClick={scrollToProjects} className="btn-primary">
            View My Work
          </button>
          <a
            href="https://www.upwork.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Hire Me on Upwork <ExternalLink size={16} />
          </a>
        </motion.div>

        {/* Availability badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full mr-2 animate-pulse"
            style={{ backgroundColor: '#22c55e' }}
          />
          Currently accepting 2 new clients
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} style={{ color: 'var(--cyan)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
