'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HeroBackground from '@/components/3d/HeroBackground';

export default function Hero() {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative text-center px-6 max-w-5xl mx-auto" style={{ zIndex: 10 }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-eyebrow inline-block mb-6"
        >
          Full-Stack Developer · AI Specialist · Available for Hire
        </motion.p>

        {/* H1 */}
        <h1
          className="font-bold mb-8"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 8rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
          aria-label="AI Automation for Business that Works 24/7"
        >
          <motion.span
            className="bg-clip-text text-transparent inline"
            style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #a855f7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            AI Automation
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {' '}for Business that Works{' '}
          </motion.span>
          <motion.span
            className="bg-clip-text text-transparent inline"
            style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #a855f7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            24/7
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          Chatbots, lead generation, and custom SaaS that grow your revenue while you sleep.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <button onClick={scrollToProjects} className="btn-primary">
            See My Work
          </button>
          <button onClick={scrollToContact} className="btn-secondary">
            Get in Touch
          </button>
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
          Open for 2 new projects this month
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden="true"
        style={{ zIndex: 10 }}
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
