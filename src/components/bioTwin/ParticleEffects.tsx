import { motion } from 'framer-motion';
import type { BodyPartRisk } from '@/types/health';

interface ParticleEffectsProps {
  risks: BodyPartRisk[];
}

export function ParticleEffects({ risks }: ParticleEffectsProps) {
  const hasStomachRisk = risks.some(r => r.part === 'stomach' && r.level !== 'normal');
  const hasChestRisk = risks.some(r => r.part === 'chest' && r.level !== 'normal');
  const hasJointRisk = risks.some(r => r.part === 'joints' && r.level !== 'normal');

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Fire Particles for Stomach */}
      {hasStomachRisk && (
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 w-20 h-16">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`fire-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 4,
                height: Math.random() * 6 + 4,
                left: `${Math.random() * 100}%`,
                bottom: 0,
                background: `radial-gradient(circle, hsl(var(--neon-orange)), hsl(var(--neon-red)))`,
                boxShadow: '0 0 6px hsl(var(--neon-orange)), 0 0 12px hsl(var(--neon-red))',
              }}
              animate={{
                y: [-5, -35],
                opacity: [1, 0],
                scale: [1, 0.3],
              }}
              transition={{
                duration: 1 + Math.random() * 0.5,
                repeat: Infinity,
                delay: Math.random() * 1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Mist Effect for Chest */}
      {hasChestRisk && (
        <div className="absolute left-1/2 top-[35%] -translate-x-1/2 w-32 h-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`mist-${i}`}
              className="absolute rounded-full"
              style={{
                width: 30 + Math.random() * 20,
                height: 15 + Math.random() * 10,
                left: `${i * 20}%`,
                top: `${Math.random() * 50}%`,
                background: 'radial-gradient(ellipse, hsla(0, 0%, 100%, 0.3), transparent)',
                filter: 'blur(8px)',
              }}
              animate={{
                x: [-10, 10, -10],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Static/Lightning for Joints */}
      {hasJointRisk && (
        <>
          {/* Left elbow area */}
          <div className="absolute left-[18%] top-[32%]">
            <StaticBolt />
          </div>
          {/* Right elbow area */}
          <div className="absolute right-[18%] top-[32%]">
            <StaticBolt />
          </div>
          {/* Left knee area */}
          <div className="absolute left-[35%] top-[72%]">
            <StaticBolt />
          </div>
          {/* Right knee area */}
          <div className="absolute right-[35%] top-[72%]">
            <StaticBolt />
          </div>
        </>
      )}
    </div>
  );
}

function StaticBolt() {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="text-neon-cyan"
      animate={{
        opacity: [0, 1, 0, 1, 0],
        scale: [0.8, 1, 0.9, 1.1, 0.8],
      }}
      transition={{
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: Math.random() * 0.5,
      }}
    >
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: 'drop-shadow(0 0 4px hsl(var(--neon-cyan))) drop-shadow(0 0 8px hsl(var(--neon-cyan)))',
        }}
      />
    </motion.svg>
  );
}
