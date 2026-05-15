'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export function Select({
  label,
  name,
  options,
  value,
  onChange,
  required,
  placeholder = 'Select...',
  error,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: 'var(--cyan)' }}>
            *
          </span>
        )}
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full px-4 py-3 rounded-lg text-sm text-left flex items-center justify-between outline-none transition-all duration-200"
        style={{
          background: 'var(--bg-glass)',
          border: `1px solid ${error ? '#f87171' : isOpen ? 'var(--cyan)' : 'var(--border-glass)'}`,
          color: selected ? 'var(--text-primary)' : 'var(--text-muted)',
          cursor: 'pointer',
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex' }}
        >
          <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute w-full mt-1 rounded-lg overflow-hidden"
            style={{
              zIndex: 200,
              background: '#16161f',
              border: '1px solid var(--border-glass-hover)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              transformOrigin: 'top',
            }}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-sm text-left transition-colors duration-100 hover:bg-white/[0.06]"
                    style={{
                      color: isSelected ? 'var(--cyan)' : 'var(--text-primary)',
                      background: isSelected ? 'rgba(6,182,212,0.1)' : 'transparent',
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Hidden input so native form APIs still see the value */}
      <input type="hidden" name={name} value={value} />

      {error && (
        <p className="text-xs mt-1" style={{ color: '#f87171' }}>
          {error}
        </p>
      )}
    </div>
  );
}
