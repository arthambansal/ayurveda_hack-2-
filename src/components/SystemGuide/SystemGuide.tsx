import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Wind, Flame, Droplets } from 'lucide-react';

export function SystemGuide() {
  const [isOpen, setIsOpen] = useState(false);

  const doshas = [
    {
      name: 'Vata',
      element: 'Air / Space',
      icon: <Wind className="w-5 h-5" />,
      color: 'hsl(200, 70%, 55%)',
      bgColor: 'hsla(200, 70%, 55%, 0.12)',
      description: 'Governs movement, breathing, and nerve impulses. Excess causes anxiety, insomnia, joint pain, and dry skin.',
    },
    {
      name: 'Pitta',
      element: 'Fire / Water',
      icon: <Flame className="w-5 h-5" />,
      color: 'hsl(25, 95%, 55%)',
      bgColor: 'hsla(25, 95%, 55%, 0.12)',
      description: 'Governs metabolism, digestion, and body temperature. Excess causes acidity, inflammation, anger, and skin rashes.',
    },
    {
      name: 'Kapha',
      element: 'Earth / Water',
      icon: <Droplets className="w-5 h-5" />,
      color: 'hsl(147, 50%, 50%)',
      bgColor: 'hsla(147, 50%, 50%, 0.12)',
      description: 'Governs structure, stability, and lubrication. Excess causes weight gain, lethargy, congestion, and depression.',
    },
  ];

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="glass-panel px-4 py-2.5 flex items-center gap-2 text-xs font-medium hover:bg-primary/5 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <HelpCircle size={16} className="text-primary" />
        <span className="hidden sm:inline text-muted-foreground">Guide</span>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-primary/20"
              style={{
                background: 'linear-gradient(135deg, hsla(150, 20%, 8%, 0.98) 0%, hsla(150, 25%, 5%, 0.99) 100%)',
              }}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="p-6 lg:p-8">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-all"
                >
                  <X size={18} />
                </button>

                {/* Header */}
                <div className="mb-6">
                  <h2 className="font-display text-xl font-semibold tracking-wide text-primary mb-1">
                    Understanding Doshas
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    The Tridosha Framework in Ayurveda
                  </p>
                </div>

                {/* Dosha Cards */}
                <div className="space-y-3 mb-6">
                  {doshas.map((dosha, index) => (
                    <motion.div
                      key={dosha.name}
                      className="p-4 rounded-xl"
                      style={{ background: dosha.bgColor }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: dosha.bgColor, color: dosha.color }}
                        >
                          {dosha.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold" style={{ color: dosha.color }}>{dosha.name}</h3>
                            <span className="text-[10px] text-muted-foreground px-2 py-0.5 bg-white/5 rounded">
                              {dosha.element}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {dosha.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* How to Use Section */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-primary">
                    How to Use
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Adjust the lifestyle parameters in the Command Center</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Watch the dosha percentages update in real-time (always totaling 100%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Click on glowing problem points to view personalized recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Aim for balanced doshas (around 33% each) for optimal health</span>
                    </li>
                  </ul>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-white/5 text-center">
                  <p className="text-[10px] text-muted-foreground">
                    Based on Ayurvedic principles • For educational purposes only
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
