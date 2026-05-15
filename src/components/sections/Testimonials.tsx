'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const logos = [
  { name: 'Vercel', text: 'VERCEL' },
  { name: 'OpenAI', text: 'OPENAI' },
  { name: 'Anthropic', text: 'ANTHROPIC' },
  { name: 'Supabase', text: 'SUPABASE' },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="w-full px-4 sm:px-6 lg:px-8 py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">What clients say</span>
          <h2
            className="font-bold mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
          >
            Building my reputation{' '}
            <span className="gradient-text">one project at a time.</span>
          </h2>

          <p className="mb-12 text-lg" style={{ color: 'var(--text-secondary)' }}>
            3 production apps shipped. Zero client complaints. Ready to make you the next success story.
          </p>

          {/* Tech logos as social proof */}
          <p
            className="text-xs uppercase tracking-widest mb-8 font-bold"
            style={{ color: 'var(--text-muted)' }}
          >
            Built with industry-leading tools
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
            {logos.map((logo) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: logos.indexOf(logo) * 0.1 }}
                className="glass-card px-6 py-3"
              >
                <span
                  className="font-mono font-bold text-sm tracking-widest"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {logo.text}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="https://www.upwork.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Be my first 5-star review → Hire me on Upwork{' '}
            <ExternalLink size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
