import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Settings } from 'lucide-react';
import { SegmentControl } from './SegmentControl';
import { DoshaBars } from './DoshaBars';
import type { HealthInputs, DoshaLevels, RiskLevel } from '@/types/health';

interface CommandCenterProps {
  inputs: HealthInputs;
  onInputChange: <K extends keyof HealthInputs>(key: K, value: HealthInputs[K]) => void;
  doshaLevels: DoshaLevels;
  getRiskLevel: (value: number) => RiskLevel;
}

export function CommandCenter({ inputs, onInputChange, doshaLevels, getRiskLevel }: CommandCenterProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      className="glass-panel w-full flex flex-col h-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-4 lg:p-5 w-full hover:bg-primary/5 transition-colors rounded-t-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h2 className="font-display text-base font-semibold tracking-wide text-primary">
              Command Center
            </h2>
            <p className="text-[10px] text-muted-foreground tracking-wide font-body">
              {isExpanded ? 'Tap to minimize' : 'Tap to expand'}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-1"
        >
          <ChevronUp className="w-5 h-5 text-primary/60" />
        </motion.div>
      </button>

      {/* Dosha Bars - Always visible */}
      <div className="px-4 lg:px-5 pb-4 border-b border-primary/10">
        <DoshaBars levels={doshaLevels} getRiskLevel={getRiskLevel} compact={!isExpanded} />
      </div>

      {/* Collapsible Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 lg:p-5 space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
              <SegmentControl
                label="Sleep Duration"
                options={['< 4 hrs', '5-6 hrs', '7-8 hrs', '> 9 hrs'] as const}
                value={inputs.sleep}
                onChange={(value) => onInputChange('sleep', value)}
              />

              <SegmentControl
                label="Stress Level"
                options={['Very Low', 'Low', 'Moderate', 'High', 'Extreme'] as const}
                value={inputs.stress}
                onChange={(value) => onInputChange('stress', value)}
              />

              <SegmentControl
                label="Activity Level"
                options={['Sedentary', 'Light Active', 'Active', 'Athlete'] as const}
                value={inputs.activity}
                onChange={(value) => onInputChange('activity', value)}
              />

              <SegmentControl
                label="Diet Quality"
                options={['Processed/Junk', 'Mixed', 'Home Cooked/Fresh'] as const}
                value={inputs.diet}
                onChange={(value) => onInputChange('diet', value)}
              />

              <SegmentControl
                label="Body Frame"
                options={['Petite/Thin', 'Medium/Athletic', 'Heavy/Broad'] as const}
                value={inputs.bodyFrame}
                onChange={(value) => onInputChange('bodyFrame', value)}
              />

              <SegmentControl
                label="Skin Type"
                options={['Dry/Rough', 'Oily/Sensitive', 'Soft/Moist'] as const}
                value={inputs.skinType}
                onChange={(value) => onInputChange('skinType', value)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
