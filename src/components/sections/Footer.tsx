'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Linkedin, ExternalLink, Twitter } from 'lucide-react';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: Github, href: 'https://github.com/supergenrih-jpg', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: ExternalLink, href: 'https://www.upwork.com', label: 'Upwork' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter/X' },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id.replace('#', ''));
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer ref={ref} className="w-full" style={{ backgroundColor: 'var(--bg-elevated)' }}>
      {/* CTA Banner */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-24 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-2xl"
        >
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
          >
            Ready to ship{' '}
            <span className="gradient-text">your idea?</span>
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            Book a call. Tell me what you need. I&apos;ll tell you if I can build it
            (90% of the time, yes).
          </p>
          <a
            href="https://www.upwork.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg"
            style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
          >
            Hire Me on Upwork <ExternalLink size={18} />
          </a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full px-4 sm:px-6 lg:px-8 py-8 border-t"
        style={{ borderColor: 'var(--border-glass)' }}
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / name */}
          <div>
            <div className="font-bold text-lg gradient-text mb-1">genrih</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Full-Stack Developer & AI Specialist
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <ul className="flex gap-6">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center transition-colors hover:border-cyan-500"
                >
                  <Icon size={16} style={{ color: 'var(--text-secondary)' }} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mx-auto max-w-7xl mt-6 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderColor: 'var(--border-glass)', color: 'var(--text-muted)' }}
        >
          <span>© 2026 genrih · All rights reserved</span>
          <span>Built with Next.js, Framer Motion, and ☕</span>
        </div>
      </motion.div>
    </footer>
  );
}
