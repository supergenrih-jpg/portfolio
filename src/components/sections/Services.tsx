'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, MessageSquare, Rocket, BarChart3, Search, Zap } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI Automation & Agents',
    description:
      'Build AI agents that automate customer service, qualify leads, book appointments, and process data 24/7. Integrate with your existing tools (CRM, email, calendar, payment systems).',
    price: '$1,500',
    color: 'var(--cyan)',
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    description:
      'Custom AI chatbots for WhatsApp, Instagram, Telegram, Messenger, or your website. Trained on your business knowledge. Handles 80% of customer inquiries automatically.',
    price: '$1,500',
    color: 'var(--purple)',
  },
  {
    icon: Rocket,
    title: 'Micro-SaaS MVP',
    description:
      'From idea to production-ready SaaS in 2–3 weeks. Full stack with auth, payments, dashboards, and AI features. You own 100% of the code.',
    price: '$3,000',
    color: 'var(--cyan)',
  },
  {
    icon: BarChart3,
    title: 'Custom CRM Systems',
    description:
      'Industry-specific CRMs that speak your business language. Real estate, salons, dental clinics, fitness studios — built for how YOU work, not generic templates.',
    price: '$2,500',
    color: 'var(--purple)',
  },
  {
    icon: Search,
    title: 'Lead Generation Tools',
    description:
      'AI-powered prospect discovery + automated cold outreach. Scrape, qualify, and personalize at scale. Replace 3 separate tools with one custom solution.',
    price: '$2,000',
    color: 'var(--cyan)',
  },
  {
    icon: Zap,
    title: 'API Integrations',
    description:
      'Connect OpenAI / Claude to any platform. Webhooks, custom endpoints, data pipelines. If two systems should talk to each other, I make them.',
    price: '$800',
    color: 'var(--purple)',
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = service.icon;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card p-8 flex flex-col group cursor-default"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${service.color}22, ${service.color}11)`,
          border: `1px solid ${service.color}33`,
        }}
      >
        <Icon size={22} style={{ color: service.color }} />
      </div>

      <h3 className="text-xl font-bold mb-3">{service.title}</h3>

      <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--text-secondary)' }}>
        {service.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'var(--border-glass)' }}>
        <span className="font-semibold" style={{ color: service.color }}>
          Starting at {service.price}
        </span>
        <button
          onClick={scrollToContact}
          className="text-sm font-medium transition-colors duration-200 hover:underline"
          style={{ color: 'var(--text-secondary)' }}
        >
          Learn more →
        </button>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">Services</span>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
          >
            Six things I do{' '}
            <span className="gradient-text">better than most</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
