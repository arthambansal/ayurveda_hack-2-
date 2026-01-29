import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { BioTwin2D } from '@/components/bioTwin/BioTwin2D';
import { CommandCenter } from '@/components/CommandCenter/CommandCenter';
import { SystemGuide } from '@/components/SystemGuide/SystemGuide';
import { useDoshaCalculator } from '@/hooks/useDoshaCalculator';
import type { HealthInputs } from '@/types/health';

// Start with moderate preset
const INITIAL_INPUTS: HealthInputs = {
  sleep: '7-8 hrs',
  stress: 'Moderate',
  activity: 'Active',
  diet: 'Mixed',
  bodyFrame: 'Medium/Athletic',
  skinType: 'Oily/Sensitive',
};

const Index = () => {
  const [inputs, setInputs] = useState<HealthInputs>(INITIAL_INPUTS);
  
  const { doshaLevels, bodyPartRisks, getRiskLevel } = useDoshaCalculator(inputs);

  const handleInputChange = useCallback(<K extends keyof HealthInputs>(
    key: K, 
    value: HealthInputs[K]
  ) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: '#1a3d2a' }}
    >
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 lg:px-8 lg:py-5 border-b border-emerald-900/30">
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div 
            className="w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl"
            style={{ 
              background: 'linear-gradient(135deg, rgba(80, 200, 120, 0.15), rgba(80, 200, 120, 0.05))',
              border: '1px solid rgba(80, 200, 120, 0.3)'
            }}
          >
            <Leaf className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold tracking-wide text-emerald-400">
              Veda-Vision
            </h1>
            <p className="text-[10px] lg:text-xs text-gray-500 tracking-wide">
              Digital Bio-Twin Simulator
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <SystemGuide />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col lg:flex-row items-stretch gap-4 lg:gap-6 p-4 lg:p-6 min-h-[calc(100vh-140px)]">
        {/* Bio-Twin Section - Left (larger) */}
        <motion.div 
          className="flex-1 min-h-[500px] lg:min-h-0 order-2 lg:order-1"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BioTwin2D risks={bodyPartRisks} />
        </motion.div>

        {/* Command Center Section - Right */}
        <motion.div 
          className="w-full lg:w-[380px] xl:w-[420px] shrink-0 order-1 lg:order-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CommandCenter
            inputs={inputs}
            onInputChange={handleInputChange}
            doshaLevels={doshaLevels}
            getRiskLevel={getRiskLevel}
          />
        </motion.div>
      </main>

      {/* Footer Status Bar */}
      <footer className="relative z-10 border-t border-emerald-900/30 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 lg:px-8 py-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">System Active</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                bodyPartRisks.some(r => r.level === 'critical') 
                  ? 'bg-red-500' 
                  : bodyPartRisks.some(r => r.level === 'warning')
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
              }`} />
              <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                {bodyPartRisks.filter(r => r.level !== 'normal').length} Issues Detected
              </span>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 tracking-wide">
            Veda-Vision • Ancient Wisdom, Modern Insights
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
