'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 'leadpilot',
    number: '01',
    title: 'LeadPilot — AI Lead Generator',
    description:
      'B2B prospect discovery + AI cold email writing. Connects Apollo.io, Google Maps, and OpenAI gpt-4o-mini to replace 3 separate tools with one workflow.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI', 'Apollo', 'Resend'],
    metrics: [
      { value: '25', label: 'leads found in 4 seconds' },
      { value: '3', label: 'AI email variants per lead' },
      { value: '94%', label: 'AI quality score' },
    ],
    screenshot: '/screenshots/leadpilot-hero.png',
    demo: 'https://leadpilot-genrih.vercel.app',
    github: 'https://github.com/supergenrih-jpg/leadpilot',
    caseStudy: '/projects/leadpilot',
    accentColor: 'var(--cyan)',
  },
  {
    id: 'estateflow',
    number: '02',
    title: 'EstateFlow — Real Estate CRM',
    description:
      'Purpose-built CRM for real estate agents. Properties with photos and AI descriptions, drag-drop deal pipeline, showings calendar, buyer-property matching.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI', 'Leaflet Maps', '@dnd-kit'],
    metrics: [
      { value: '3', label: 'views: Grid / List / Map' },
      { value: '7', label: 'stages in visual pipeline' },
      { value: 'AI', label: 'buyer-property matching' },
    ],
    screenshot: '/screenshots/estateflow-hero.png',
    demo: 'https://estateflow.aistudio-saas.com',
    github: 'https://github.com/supergenrih-jpg/estateflow',
    caseStudy: '/projects/estateflow',
    accentColor: 'var(--purple)',
  },
  {
    id: 'chatpilot',
    number: '03',
    title: 'ChatPilot — AI Multi-Channel Assistant',
    description:
      'AI receptionist for small businesses. Connects WhatsApp, Instagram, Telegram, Messenger. Configurable for any industry (salon, dental, retail, fitness, legal) in 15 minutes.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI', 'Twilio', 'Meta Graph API', 'Telegram Bot API'],
    metrics: [
      { value: '4', label: 'channels in unified inbox' },
      { value: '6', label: 'industry pre-built templates' },
      { value: '8s', label: 'avg AI response time' },
    ],
    screenshot: '/screenshots/chatpilot-hero.png',
    demo: 'https://chatpilot.aistudio-saas.com',
    github: 'https://github.com/supergenrih-jpg/chatpilot',
    caseStudy: '/projects/chatpilot',
    accentColor: 'var(--cyan-light)',
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: 'transform 0.15s ease', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={ref}
      className="w-full px-4 sm:px-6 lg:px-8 py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">Featured Projects</span>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
          >
            Production-ready apps{' '}
            <span className="gradient-text">I&apos;ve shipped</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <TiltCard className="glass-card overflow-hidden group">
                {/* Screenshot */}
                <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>
                  <Image
                    src={project.screenshot}
                    alt={`${project.title} interface`}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,15,0.85) 100%)',
                      boxShadow: `inset 0 0 80px ${project.accentColor}18`,
                    }}
                  />
                  {/* Accent glow border */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-px opacity-60"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
                  />
                </div>

                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    {/* Left content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span
                          className="text-sm font-mono font-bold"
                          style={{ color: project.accentColor }}
                        >
                          Project {project.number}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                      <p
                        className="text-base leading-relaxed mb-6"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {project.description}
                      </p>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t) => (
                          <span key={t} className="tech-badge font-mono text-xs">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-sm py-2 px-4"
                          style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
                        >
                          Live Demo <ExternalLink size={14} />
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-sm"
                          style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
                        >
                          GitHub <Github size={14} />
                        </a>
                        <Link
                          href={project.caseStudy}
                          className="btn-secondary text-sm"
                          style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
                        >
                          Case Study <BookOpen size={14} />
                        </Link>
                      </div>
                    </div>

                    {/* Right: metrics */}
                    <div className="lg:w-64 grid grid-cols-3 lg:grid-cols-1 gap-3">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="glass-card p-4 text-center"
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: `1px solid ${project.accentColor}22`,
                          }}
                        >
                          <div
                            className="text-2xl font-bold font-mono"
                            style={{ color: project.accentColor }}
                          >
                            {m.value}
                          </div>
                          <div
                            className="text-xs mt-1 leading-tight"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
