import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, Dumbbell, UtensilsCrossed } from 'lucide-react';
import type { BodyPartRisk, BodyPart } from '@/types/health';
import { CONDITIONS } from '@/types/health';

interface BioTwin2DProps {
  risks: BodyPartRisk[];
}

// Calibrated positions for the Gemini-generated human body image
// These percentages are relative to the FULL IMAGE dimensions
const BODY_POINT_POSITIONS: Record<BodyPart, { x: number; y: number }> = {
  head: { x: 50, y: 11 },      // Center of forehead
  chest: { x: 50, y: 28 },     // Center of chest/sternum
  stomach: { x: 50, y: 43 },   // Navel/abdomen area
  joints: { x: 44, y: 70 },    // Left knee cap
};

export function BioTwin2D({ risks }: BioTwin2DProps) {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

  const activeRisks = risks.filter(r => r.level !== 'normal');

  const handlePointClick = (part: BodyPart, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = event.currentTarget.closest('.body-panel')?.getBoundingClientRect();
    
    if (containerRect) {
      let x = rect.left - containerRect.left + 40;
      let y = rect.top - containerRect.top;
      
      if (x + 320 > containerRect.width) x = rect.left - containerRect.left - 340;
      if (x < 10) x = 10;
      if (y + 320 > containerRect.height) y = containerRect.height - 340;
      if (y < 10) y = 10;
      
      setCardPosition({ x, y });
    }
    
    setSelectedPart(selectedPart === part ? null : part);
  };

  const selectedRisk = selectedPart ? risks.find(r => r.part === selectedPart) : null;
  const selectedCondition = selectedPart ? CONDITIONS[selectedPart] : null;

  return (
    <div 
      className="body-panel relative w-full h-full flex flex-col overflow-hidden rounded-2xl"
      style={{ backgroundColor: '#1a3d2a' }}
    >
      {/* Main visualization area - image fills this completely */}
      <div className="flex-1 relative min-h-[500px]">
        {/* 
          The image container - fills the entire panel area
          Points are positioned as % of this container (which = the image)
        */}
        <div className="absolute inset-0">
          {/* Human body image - covers full area */}
          <img 
            src="/human-body.png" 
            alt="Human body"
            className="w-full h-full object-cover select-none"
            draggable={false}
          />

          {/* Problem Points - positioned relative to the image */}
          {activeRisks.map((risk) => {
            const pos = BODY_POINT_POSITIONS[risk.part];
            if (!pos) return null;

            const isWarning = risk.level === 'warning';
            const pointColor = isWarning ? '#ffb347' : '#ff6b6b';
            const ringColor = isWarning ? 'rgba(255, 179, 71, 0.8)' : 'rgba(255, 107, 107, 0.8)';

            return (
              <div
                key={risk.part}
                className="absolute cursor-pointer z-10"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={(e) => handlePointClick(risk.part, e)}
              >
                {/* Ring 1 - expanding outward */}
                <motion.div 
                  className="absolute rounded-full"
                  style={{
                    width: 60,
                    height: 60,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `2px solid ${ringColor}`,
                    transformOrigin: 'center center',
                  }}
                  animate={{ 
                    scale: [0.3, 1.8], 
                    opacity: [1, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: 'easeOut' 
                  }}
                />
                
                {/* Ring 2 - delayed */}
                <motion.div 
                  className="absolute rounded-full"
                  style={{
                    width: 60,
                    height: 60,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `2px solid ${ringColor}`,
                    transformOrigin: 'center center',
                  }}
                  animate={{ 
                    scale: [0.3, 1.8], 
                    opacity: [1, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: 'easeOut',
                    delay: 1 
                  }}
                />
                
                {/* Center glowing dot */}
                <motion.div 
                  className="relative rounded-full"
                  style={{
                    width: 20,
                    height: 20,
                    background: pointColor,
                    boxShadow: `0 0 15px ${ringColor}, 0 0 30px ${ringColor}, 0 0 45px ${ringColor}`,
                  }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Recommendation Card */}
        <AnimatePresence>
          {selectedPart && selectedCondition && (
            <motion.div
              className="absolute z-50 w-[300px] lg:w-[320px] rounded-2xl p-5"
              style={{ 
                left: cardPosition.x, 
                top: cardPosition.y,
                background: 'rgba(15, 35, 25, 0.97)',
                border: `1px solid ${selectedRisk?.level === 'warning' ? 'rgba(255, 179, 71, 0.5)' : 'rgba(255, 107, 107, 0.5)'}`,
                backdropFilter: 'blur(16px)',
                boxShadow: '0 10px 50px rgba(0, 0, 0, 0.5)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      background: selectedRisk?.level === 'warning' ? '#ffb347' : '#ff6b6b',
                      boxShadow: `0 0 10px ${selectedRisk?.level === 'warning' ? 'rgba(255, 179, 71, 0.8)' : 'rgba(255, 107, 107, 0.8)'}`
                    }}
                  />
                  <h3 
                    className="text-sm font-semibold"
                    style={{ color: selectedRisk?.level === 'warning' ? '#ffb347' : '#ff6b6b' }}
                  >
                    {selectedCondition.name}
                  </h3>
                </div>
                <button onClick={() => setSelectedPart(null)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={16} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell size={14} className="text-emerald-400" />
                    <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">Yoga</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed pl-4 border-l-2 border-emerald-500/40">
                    {selectedCondition.remedy.yoga}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf size={14} className="text-emerald-400" />
                    <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">Remedy</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed pl-4 border-l-2 border-emerald-500/40">
                    {selectedCondition.remedy.herb}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <UtensilsCrossed size={14} className="text-emerald-400" />
                    <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">Diet</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed pl-4 border-l-2 border-emerald-500/40">
                    {selectedCondition.remedy.diet}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <p className="text-[10px] text-gray-500">
                  Dosha: <span className="text-emerald-400 font-semibold uppercase">{selectedCondition.dosha}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status Bar */}
      <div className="px-5 py-4 border-t border-white/5 bg-black/20">
        <div className="flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Bio-Twin Status</div>
          <div className={`text-sm font-semibold ${
            risks.some(r => r.level === 'critical') ? 'text-red-400' 
            : risks.some(r => r.level === 'warning') ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {risks.some(r => r.level === 'critical') ? '⚠ Imbalance Detected'
            : risks.some(r => r.level === 'warning') ? '⚡ Elevated Risk' : '✓ Balanced'}
          </div>
        </div>
      </div>
    </div>
  );
}
