'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const orbs = [
  { w: 380, h: 380, top: '10%', left: '5%',  color: '#06b6d4', dur: 12 },
  { w: 300, h: 300, top: '60%', left: '75%', color: '#a855f7', dur: 15 },
  { w: 260, h: 260, top: '30%', left: '60%', color: '#06b6d4', dur: 10 },
  { w: 220, h: 220, top: '70%', left: '20%', color: '#a855f7', dur: 13 },
  { w: 340, h: 340, top: '5%',  left: '55%', color: '#a855f7', dur: 17 },
  { w: 200, h: 200, top: '50%', left: '40%', color: '#22d3ee', dur: 9  },
  { w: 280, h: 280, top: '80%', left: '60%', color: '#06b6d4', dur: 14 },
  { w: 180, h: 180, top: '20%', left: '30%', color: '#c084fc', dur: 11 },
];

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function HeroBackground() {
  const particles = useMemo(() => {
    const rand = seededRand(42);
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      size: 2 + rand() * 2,
      top: rand() * 100,
      left: rand() * 100,
      dur: 10 + rand() * 10,
      delay: rand() * -10,
      driftX: (rand() - 0.5) * 60,
      driftY: -(40 + rand() * 80),
      opacity: 0.3 + rand() * 0.5,
      color: rand() > 0.6 ? '#22d3ee' : '#ffffff',
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(6,182,212,0.25) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 20%, rgba(168,85,247,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 70% 40% at 50% 80%, rgba(168,85,247,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 10% 70%, rgba(34,211,238,0.1) 0%, transparent 60%)
          `,
          animation: 'gradientShift 20s ease infinite',
        }}
      />

      {/* Floating blur orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: orb.w,
            height: orb.h,
            top: orb.top,
            left: orb.left,
            borderRadius: '50%',
            background: orb.color,
            filter: 'blur(80px)',
            opacity: 0.18,
            zIndex: 1,
          }}
          animate={{
            y: [0, -30, 15, -20, 0],
            x: [0, 20, -15, 10, 0],
            opacity: [0.18, 0.28, 0.15, 0.25, 0.18],
            scale: [1, 1.08, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.3,
          }}
        />
      ))}

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            left: `${p.left}%`,
            borderRadius: '50%',
            background: p.color,
            zIndex: 2,
          }}
          animate={{
            y: [0, p.driftY],
            x: [0, p.driftX],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
            repeatType: 'reverse',
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          zIndex: 3,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(10,10,15,0.6) 70%, rgba(10,10,15,0.95) 100%)',
          zIndex: 4,
        }}
      />

      <style>{`
        @keyframes gradientShift {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.05) translate(2%, -2%); }
          66% { transform: scale(0.98) translate(-1%, 1%); }
        }
      `}</style>
    </div>
  );
}
