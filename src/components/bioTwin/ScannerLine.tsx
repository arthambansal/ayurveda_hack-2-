import { motion } from 'framer-motion';

export function ScannerLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, hsl(var(--neon-green)) 20%, hsl(var(--neon-green)) 80%, transparent 100%)',
        boxShadow: '0 0 10px hsl(var(--neon-green)), 0 0 20px hsl(var(--neon-green)), 0 0 40px hsl(var(--neon-green))',
      }}
      animate={{
        top: ['5%', '95%', '5%'],
      }}
      transition={{
        duration: 4,
        ease: 'linear',
        repeat: Infinity,
      }}
    />
  );
}
