import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const SystemConsciousness = () => (
  <motion.div 
    className="col-span-5 bg-surface-highest p-8 rounded-xl relative overflow-hidden paper-shadow"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3 }}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center">
        <Sparkles size={14} className="text-primary" />
      </div>
      <h3 className="font-serif text-xl">System Consciousness</h3>
    </div>
    <div className="space-y-6">
      <div className="relative pl-6 border-l border-primary/10">
        <p className="font-serif italic text-xl leading-relaxed text-on-background/80">
          "You've focused heavily on 'Clarity' this week. Perhaps today is for 'Presence'? Your schedule has a gap at 14:00."
        </p>
        <span className="font-mono text-[0.65rem] text-tertiary mt-2 inline-block">Suggestion Engine v4.2</span>
      </div>
      <div className="flex gap-2">
        <button className="font-mono text-[0.65rem] uppercase tracking-wider px-4 py-2 bg-background ghost-border rounded-full hover:bg-surface-highest transition-all">
          Accept Gap
        </button>
        <button className="font-mono text-[0.65rem] uppercase tracking-wider px-4 py-2 bg-background ghost-border rounded-full hover:bg-surface-highest transition-all">
          Details
        </button>
      </div>
    </div>
    <div className="absolute -right-12 -bottom-12 w-48 h-48 opacity-5 pointer-events-none">
      <div className="w-full h-full bg-primary rotate-45 transform origin-center"></div>
    </div>
  </motion.div>
);
