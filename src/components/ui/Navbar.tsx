'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Stack', href: '#stack' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const scrollTo = (href: string) => {
  const el = document.getElementById(href.replace('#', ''));
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-glass)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-bold text-lg gradient-text"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          aria-label="Scroll to top"
        >
          genrih
        </button>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium transition-colors duration-200 hover:underline"
              style={{
                color: 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://www.upwork.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mt-4 pb-4 border-t flex flex-col gap-3"
          style={{ borderColor: 'var(--border-glass)' }}
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => { scrollTo(link.href); setMenuOpen(false); }}
              className="text-sm font-medium py-2 text-left"
              style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://www.upwork.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm text-center"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
          >
            Hire Me
          </a>
        </motion.nav>
      )}
    </motion.header>
  );
}
