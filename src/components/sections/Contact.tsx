'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Calendar, Github, Send, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { Select } from '@/components/ui/Select';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().optional(),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@aistudiodeveloper.com',
    href: 'mailto:hello@aistudiodeveloper.com',
    color: 'var(--cyan)',
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
    value: 'View on GitHub',
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

  useEffect(() => {
    const raw = sessionStorage.getItem('contact-prefill');
    if (!raw) return;
    try {
      const prefill = JSON.parse(raw) as Partial<FormData>;
      setFormData((prev) => ({ ...prev, ...prefill }));
    } catch {
      // ignore malformed data
    } finally {
      sessionStorage.removeItem('contact-prefill');
    }
  }, []);
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

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
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
      setSubmitError('Something went wrong. Please email us at hello@aistudiodeveloper.com');
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
    <section id="contact" ref={ref} className="w-full px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
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

                {/* Project type */}
                <Select
                  label="Project type"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleSelectChange('projectType')}
                  placeholder="Select type..."
                  error={errors.projectType}
                  options={[
                    { value: 'AI Chatbot', label: 'AI Chatbot' },
                    { value: 'Custom SaaS / MVP', label: 'Custom SaaS / MVP' },
                    { value: 'CRM System', label: 'CRM System' },
                    { value: 'Lead Generation Tool', label: 'Lead Generation Tool' },
                    { value: 'API Integration', label: 'API Integration' },
                    {
                      value: 'Buy Existing Product (LeadPilot / EstateFlow / ChatPilot)',
                      label: 'Buy Existing Product (LeadPilot / EstateFlow / ChatPilot)',
                    },
                    { value: 'Other', label: 'Other' },
                  ]}
                />

                {/* Budget (optional free text) */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Budget{' '}
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>(optional)</span>
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    value={formData.budget}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="e.g. $2,000–$5,000 or flexible"
                  />
                </div>

                {/* Timeline */}
                <Select
                  label="Timeline"
                  name="timeline"
                  required
                  value={formData.timeline}
                  onChange={handleSelectChange('timeline')}
                  placeholder="Select timeline..."
                  error={errors.timeline}
                  options={[
                    { value: 'ASAP (within 1 week)', label: 'ASAP (within 1 week)' },
                    { value: 'This month', label: 'This month' },
                    { value: 'Next 1-3 months', label: 'Next 1–3 months' },
                    { value: 'Just exploring', label: 'Just exploring' },
                  ]}
                />

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
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
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
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
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
