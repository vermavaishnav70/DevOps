import React from 'react';
import { motion } from 'motion/react';

export const LifeGraph = () => (
  <motion.div 
    className="col-span-6 bg-surface-low p-6 rounded-xl flex flex-col paper-shadow"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
  >
    <h3 className="font-mono text-[0.7rem] uppercase tracking-widest mb-6">Life Graph: Focus (30d)</h3>
    <div className="flex-1 flex items-end gap-1.5 h-20">
      {[30, 45, 40, 60, 75, 65, 85, 70, 90, 95, 100].map((h, i) => (
        <div 
          key={i} 
          className={`flex-1 rounded-t-sm transition-all duration-500 ${i === 10 ? 'bg-tertiary' : 'bg-primary'}`} 
          style={{ height: `${h}%`, opacity: 0.2 + (h/100) * 0.8 }}
        ></div>
      ))}
    </div>
  </motion.div>
);
