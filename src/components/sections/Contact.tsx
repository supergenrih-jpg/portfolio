'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Briefcase, Calendar, Github, Send, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'super.genrih@ukr.net',
    href: 'mailto:super.genrih@ukr.net',
    color: 'var(--cyan)',
  },
  {
    icon: Briefcase,
    label: 'Upwork',
    value: 'Hire on Upwork',
    href: 'https://www.upwork.com',
    color: 'var(--purple)',
  },
  {
    icon: Calendar,
    label: 'Discovery Call',
    value: 'Book 15-min call',
    href: 'https://calendly.com',
    color: 'var(--cyan-light)',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'supergenrih-jpg',
    href: 'https://github.com/supergenrih-jpg',
    color: 'var(--text-secondary)',
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as keyof FormErrors] = issue.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to send');
      setIsSuccess(true);
    } catch {
      setSubmitError('Something went wrong. Please try emailing me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 font-sans`;
  const inputStyle = {
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-glass)',
    color: 'var(--text-primary)',
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">Contact</span>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
          >
            Let&apos;s build{' '}
            <span className="gradient-text">something</span>
          </h2>
          <p className="mt-4" style={{ color: 'var(--text-secondary)' }}>
            Tell me about your project. I respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSuccess ? (
              <div className="glass-card p-10 flex flex-col items-center justify-center text-center h-full min-h-64">
                <CheckCircle2 size={48} className="mb-4" style={{ color: '#22c55e' }} />
                <h3 className="text-xl font-bold mb-2">Message sent!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  I&apos;ll respond within 24 hours. Talk soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5" noValidate>
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Name <span style={{ color: 'var(--cyan)' }}>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="John Smith"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Email <span style={{ color: 'var(--cyan)' }}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="john@company.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Company / Website{' '}
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>(optional)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="Acme Inc. or acme.com"
                  />
                </div>

                {/* Project type + Budget */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Project type <span style={{ color: 'var(--cyan)' }}>*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      aria-required="true"
                    >
                      <option value="">Select type...</option>
                      <option value="AI Chatbot">AI Chatbot</option>
                      <option value="Custom SaaS / MVP">Custom SaaS / MVP</option>
                      <option value="CRM System">CRM System</option>
                      <option value="Lead Generation Tool">Lead Generation Tool</option>
                      <option value="API Integration">API Integration</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.projectType && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.projectType}</p>}
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Budget <span style={{ color: 'var(--cyan)' }}>*</span>
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      aria-required="true"
                    >
                      <option value="">Select budget...</option>
                      <option value="$500 - $1,500">$500 – $1,500</option>
                      <option value="$1,500 - $3,000">$1,500 – $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 – $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 – $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                    </select>
                    {errors.budget && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.budget}</p>}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Timeline <span style={{ color: 'var(--cyan)' }}>*</span>
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    aria-required="true"
                  >
                    <option value="">Select timeline...</option>
                    <option value="ASAP (within 1 week)">ASAP (within 1 week)</option>
                    <option value="This month">This month</option>
                    <option value="Next 1-3 months">Next 1–3 months</option>
                    <option value="Just exploring">Just exploring</option>
                  </select>
                  {errors.timeline && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.timeline}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Message <span style={{ color: 'var(--cyan)' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="Describe your project, goals, and any specific requirements..."
                    aria-required="true"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.message}</p>}
                </div>

                {submitError && (
                  <p className="text-sm" style={{ color: '#f87171' }}>{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center"
                  aria-disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : <>Send Message → <Send size={16} /></>}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact methods */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center gap-4"
          >
            <p className="text-lg font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
              Or reach out directly
            </p>
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="glass-card p-5 flex items-center gap-4 group hover:no-underline"
                  aria-label={`${method.label}: ${method.value}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${method.color}15`,
                      border: `1px solid ${method.color}33`,
                    }}
                  >
                    <Icon size={20} style={{ color: method.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>
                      {method.label}
                    </div>
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {method.value}
                    </div>
                  </div>
                </motion.a>
              );
            })}

            <div
              className="glass-card p-5 mt-4"
              style={{ borderColor: 'rgba(6,182,212,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-block w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#22c55e' }}
                />
                <span className="text-sm font-semibold" style={{ color: '#22c55e' }}>
                  Available now
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Currently accepting 2 new clients. Reply within 24 hours guaranteed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
