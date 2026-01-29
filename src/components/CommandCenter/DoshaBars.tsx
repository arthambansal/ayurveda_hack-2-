import { motion } from 'framer-motion';
import { Wind, Flame, Droplets } from 'lucide-react';
import type { DoshaLevels, RiskLevel } from '@/types/health';

interface DoshaBarsProps {
  levels: DoshaLevels;
  getRiskLevel: (value: number) => RiskLevel;
  compact?: boolean;
}

export function DoshaBars({ levels, getRiskLevel, compact = false }: DoshaBarsProps) {
  const doshas = [
    { 
      name: 'Vata', 
      element: 'Air', 
      value: levels.vata, 
      icon: <Wind size={compact ? 12 : 16} />,
      baseColor: 'hsl(200, 70%, 55%)',
      bgColor: 'hsla(200, 70%, 55%, 0.15)',
    },
    { 
      name: 'Pitta', 
      element: 'Fire', 
      value: levels.pitta, 
      icon: <Flame size={compact ? 12 : 16} />,
      baseColor: 'hsl(25, 95%, 55%)',
      bgColor: 'hsla(25, 95%, 55%, 0.15)',
    },
    { 
      name: 'Kapha', 
      element: 'Earth', 
      value: levels.kapha, 
      icon: <Droplets size={compact ? 12 : 16} />,
      baseColor: 'hsl(147, 50%, 50%)',
      bgColor: 'hsla(147, 50%, 50%, 0.15)',
    },
  ];

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'critical': return 'hsl(0, 80%, 55%)';
      case 'warning': return 'hsl(30, 100%, 50%)';
      default: return null; // Use base color
    }
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex gap-3">
          {doshas.map((dosha) => {
            const riskLevel = getRiskLevel(dosha.value);
            const color = getRiskColor(riskLevel) || dosha.baseColor;
            return (
              <div key={dosha.name} className="flex items-center gap-2 flex-1">
                <div className="p-1 rounded" style={{ color }}>
                  {dosha.icon}
                </div>
                <div className="flex-1">
                  <div className="h-1.5 bg-secondary/40 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${dosha.value}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <span 
                  className="text-[10px] font-semibold tabular-nums w-8"
                  style={{ color }}
                >
                  {dosha.value}%
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <span className="text-[9px] text-muted-foreground">Total: {levels.vata + levels.pitta + levels.kapha}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Dosha Analysis
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground">
          Total: {levels.vata + levels.pitta + levels.kapha}%
        </span>
      </div>
      
      {doshas.map((dosha, index) => {
        const riskLevel = getRiskLevel(dosha.value);
        const color = getRiskColor(riskLevel) || dosha.baseColor;
        const bgColor = getRiskColor(riskLevel) ? `${getRiskColor(riskLevel)}20` : dosha.bgColor;
        
        return (
          <motion.div
            key={dosha.name}
            className="p-3 rounded-xl"
            style={{ background: 'hsla(150, 20%, 12%, 0.5)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div 
                  className="p-1.5 rounded-lg"
                  style={{ backgroundColor: bgColor, color }}
                >
                  {dosha.icon}
                </div>
                <div>
                  <span className="text-sm font-medium">{dosha.name}</span>
                  <span className="text-xs text-muted-foreground ml-1.5">
                    ({dosha.element})
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span 
                  className="text-sm font-semibold tabular-nums"
                  style={{ color }}
                >
                  {dosha.value}%
                </span>
                {riskLevel !== 'normal' && (
                  <div 
                    className="text-[9px] uppercase font-semibold px-2 py-0.5 rounded"
                    style={{ backgroundColor: bgColor, color }}
                  >
                    {riskLevel}
                  </div>
                )}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${dosha.value}%` }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
