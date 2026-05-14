'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/sections/Footer';

interface Metric {
  value: string;
  label: string;
}

interface CaseStudyLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  demoUrl: string;
  githubUrl: string;
  problem: string;
  solution: string[];
  techStack: string[];
  architecture: string;
  metrics: Metric[];
  lessons: { title: string; body: string }[];
  accentColor: string;
}

export default function CaseStudyLayout({
  eyebrow,
  title,
  subtitle,
  demoUrl,
  githubUrl,
  problem,
  solution,
  techStack,
  architecture,
  metrics,
  lessons,
  accentColor,
}: CaseStudyLayoutProps) {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="relative min-h-[50vh] flex items-end py-24 px-6 overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 50% 0%, ${accentColor}18 0%, transparent 70%), var(--bg-base)`,
          }}
        >
          <div className="max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:underline"
                style={{ color: 'var(--text-muted)' }}
              >
                <ArrowLeft size={16} />
                Back to Portfolio
              </Link>

              <span
                className="block text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                {eyebrow}
              </span>

              <h1
                className="font-black mb-4"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  lineHeight: 1.1,
                  background: `linear-gradient(135deg, ${accentColor}, var(--purple))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {title}
              </h1>

              <p className="text-xl mb-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                {subtitle}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '0.625rem 1.5rem', fontSize: '0.9rem' }}
                >
                  Live Demo <ExternalLink size={15} />
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.625rem 1.5rem', fontSize: '0.9rem' }}
                >
                  GitHub <Github size={15} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-12 px-6" style={{ backgroundColor: 'var(--bg-elevated)' }}>
          <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="glass-card p-6 text-center"
                style={{ borderColor: `${accentColor}33` }}
              >
                <div
                  className="text-3xl font-black font-mono mb-2"
                  style={{ color: accentColor }}
                >
                  {m.value}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
          {/* Problem */}
          <section>
            <span
              className="block text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: accentColor }}
            >
              The Problem
            </span>
            <h2 className="text-3xl font-bold mb-6">Why this needed to be built</h2>
            <div
              className="glass-card p-8 text-lg leading-relaxed border-l-4"
              style={{ borderLeftColor: accentColor, color: 'var(--text-secondary)' }}
            >
              {problem}
            </div>
          </section>

          {/* Solution */}
          <section>
            <span
              className="block text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: accentColor }}
            >
              The Solution
            </span>
            <h2 className="text-3xl font-bold mb-6">How it works</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {solution.map((item, i) => (
                <div
                  key={i}
                  className="glass-card p-5 flex items-start gap-3"
                >
                  <span
                    className="text-lg font-black font-mono flex-shrink-0 mt-0.5"
                    style={{ color: accentColor }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <span
              className="block text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: accentColor }}
            >
              Tech Stack
            </span>
            <h2 className="text-3xl font-bold mb-6">Built with</h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <span key={t} className="tech-badge font-mono">
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section>
            <span
              className="block text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: accentColor }}
            >
              Architecture
            </span>
            <h2 className="text-3xl font-bold mb-6">System design</h2>
            <div
              className="glass-card p-8 font-mono text-sm leading-loose overflow-x-auto"
              style={{ color: 'var(--cyan-light)', whiteSpace: 'pre' }}
            >
              {architecture}
            </div>
          </section>

          {/* Lessons */}
          <section>
            <span
              className="block text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: accentColor }}
            >
              Key Decisions & Lessons
            </span>
            <h2 className="text-3xl font-bold mb-6">What I learned</h2>
            <div className="space-y-6">
              {lessons.map((lesson, i) => (
                <div key={i} className="glass-card p-6">
                  <h3
                    className="font-bold text-lg mb-3"
                    style={{ color: accentColor }}
                  >
                    {lesson.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{lesson.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center py-8">
            <p
              className="text-xl font-semibold mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Want me to build something similar for you?
            </p>
            <Link
              href="/#contact"
              className="btn-primary text-lg"
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
            >
              Hire me for your project →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
