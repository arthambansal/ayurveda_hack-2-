import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Flower2, Leaf } from 'lucide-react';
import { CONDITIONS, type BodyPart } from '@/types/health';

interface HoverCardProps {
  part: BodyPart;
  level: 'warning' | 'critical';
  position: { x: number; y: number };
  onClose: () => void;
}

type TabType = 'diet' | 'yoga' | 'remedy';

export function HoverCard({ part, level, position, onClose }: HoverCardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('diet');
const condition = CONDITIONS[part];

if (!condition) {
  return null;
}

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'diet', label: 'Diet', icon: <Utensils size={14} /> },
    { id: 'yoga', label: 'Yoga', icon: <Flower2 size={14} /> },
    { id: 'remedy', label: 'Remedy', icon: <Leaf size={14} /> },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-50 pointer-events-auto"
        style={{
          left: Math.min(position.x + 20, window.innerWidth - 320),
          top: Math.min(position.y - 100, window.innerHeight - 280),
        }}
        initial={{ opacity: 0, scale: 0.9, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: -10 }}
        transition={{ duration: 0.2 }}
      >
        {/* Tech Line Connection */}
        <svg
          className="absolute -left-5 top-1/2 -translate-y-1/2"
          width="24"
          height="40"
          viewBox="0 0 24 40"
        >
          <path
            d="M24 20 L12 20 L6 10 L0 10 M6 10 L6 30 L0 30"
            fill="none"
            stroke="hsl(var(--neon-cyan))"
            strokeWidth="1"
            style={{ filter: 'drop-shadow(0 0 3px hsl(var(--neon-cyan)))' }}
          />
          <circle cx="0" cy="10" r="2" fill="hsl(var(--neon-cyan))" />
          <circle cx="0" cy="30" r="2" fill="hsl(var(--neon-cyan))" />
        </svg>

        <div 
          className="glass-panel p-4 w-[280px] border-l-2"
          style={{
            borderLeftColor: level === 'critical' ? 'hsl(var(--neon-red))' : 'hsl(var(--neon-orange))',
          }}
          onMouseLeave={onClose}
        >
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <div 
                className={`w-2 h-2 rounded-full animate-pulse ${
                  level === 'critical' ? 'bg-neon-red' : 'bg-neon-orange'
                }`}
              />
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Risk Detected
              </span>
            </div>
            <h3 className={`text-sm font-bold ${level === 'critical' ? 'neon-text-red' : 'neon-text-orange'}`}>
              {condition.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Severity:
              </span>
              <span className={`text-[10px] uppercase font-bold ${
                level === 'critical' ? 'text-neon-red' : 'text-neon-orange'
              }`}>
                {level.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 px-2 py-1 text-[10px] uppercase tracking-wider rounded transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary/20 text-primary neon-border border'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="text-xs text-muted-foreground leading-relaxed min-h-[60px]">
            {activeTab === 'diet' && condition.remedy.diet}
            {activeTab === 'yoga' && condition.remedy.yoga}
            {activeTab === 'remedy' && condition.remedy.herb}
          </div>

          {/* Dosha Badge */}
          <div className="mt-3 pt-2 border-t border-border/30">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Imbalance: <span className="text-primary font-bold">{condition.dosha.toUpperCase()}</span>
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
