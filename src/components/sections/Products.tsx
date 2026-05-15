'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';

const products = [
  {
    id: 'leadpilot',
    title: 'LeadPilot',
    tagline: 'AI Lead Generation SaaS — Replace Apollo + Hunter + HubSpot with one tool',
    image: '/screenshots/leadpilot-hero.png',
    accentColor: 'var(--cyan)',
    includes: [
      'Full source code + database schema',
      'Custom branding (your logo, colors, domain)',
      'Production deployment on your account',
      '30 days post-launch support',
      'Exclusive license — never resold',
    ],
    inquiryMessage:
      "I'm interested in licensing LeadPilot. Please send terms and timeline.",
  },
  {
    id: 'estateflow',
    title: 'EstateFlow',
    tagline:
      'Real Estate CRM SaaS — Industry-specific tool that beats Salesforce for realtors',
    image: '/screenshots/estateflow-hero.png',
    accentColor: 'var(--purple)',
    includes: [
      'Full source code + Supabase schema',
      'Custom branding for your brokerage',
      'Production deployment with maps integration',
      '30 days post-launch support',
      'Exclusive license — never resold',
    ],
    inquiryMessage:
      "I'm interested in licensing EstateFlow. Please send terms and timeline.",
  },
  {
    id: 'chatpilot',
    title: 'ChatPilot',
    tagline:
      'AI Multi-Channel Assistant — WhatsApp + Instagram + Telegram + Messenger receptionist',
    image: '/screenshots/chatpilot-hero.png',
    accentColor: 'var(--cyan-light)',
    includes: [
      'Full source code + 4 channel providers',
      'Custom branding + industry templates',
      'Real Telegram bot included',
      '30 days post-launch support',
      'Exclusive license — never resold',
    ],
    inquiryMessage:
      "I'm interested in licensing ChatPilot. Please send terms and timeline.",
  },
];

const benefits = [
  {
    emoji: '⚡',
    title: 'Skip 3+ Months',
    desc: 'Launch in 1 week instead of building from scratch',
  },
  {
    emoji: '🔒',
    title: 'Exclusive Rights',
    desc: 'Once sold, removed from site. You own it 100%',
  },
  {
    emoji: '🚀',
    title: 'Production Ready',
    desc: 'Real users, real data, real deployment',
  },
];

function scrollToContact(productTitle: string, message: string) {
  sessionStorage.setItem(
    'contact-prefill',
    JSON.stringify({
      projectType: 'Buy Existing Product (LeadPilot / EstateFlow / ChatPilot)',
      message,
    })
  );
  const el = document.getElementById('contact');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Products() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="products"
      ref={ref}
      className="w-full px-4 sm:px-6 lg:px-8 py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">Exclusive Licensing</span>
          <h2
            className="font-bold mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
          >
            <span className="gradient-text">Own a Production-Ready</span>{' '}
            SaaS Today
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Skip 3 months of development. Acquire a complete AI product — source code,
            branding, and exclusive rights. Yours alone, ready to launch under your brand.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              className="glass-card overflow-hidden flex flex-col group"
            >
              {/* Screenshot */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={product.image}
                  alt={`${product.title} screenshot`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 55%, rgba(10,10,15,0.75) 100%)',
                  }}
                />
                {/* Exclusive badge */}
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}
                >
                  EXCLUSIVE · 1 AVAILABLE
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {product.tagline}
                </p>

                {/* What's included */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {product.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check
                        size={15}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: product.accentColor }}
                      />
                      <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => scrollToContact(product.title, product.inquiryMessage)}
                  className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%)',
                  }}
                >
                  Request Licensing Terms →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {benefits.map((b) => (
            <div key={b.title} className="glass-card p-6 text-center">
              <div className="text-3xl mb-3" aria-hidden="true">
                {b.emoji}
              </div>
              <h3 className="font-bold mb-2">{b.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {b.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
