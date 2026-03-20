import React from 'react';
import { motion } from 'motion/react';

export const DeepWorkStreak = () => (
  <motion.div 
    className="col-span-4 bg-primary text-white p-8 rounded-xl flex flex-col paper-shadow"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2 }}
  >
    <div className="mb-auto">
      <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] mb-4 opacity-70">Deep Work Streak</h3>
      <div className="text-7xl font-serif">14</div>
      <p className="font-mono text-[0.7rem] mt-2 tracking-widest uppercase opacity-70">Consecutive Days</p>
    </div>
    <div className="mt-8">
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="aspect-square bg-white rounded-sm" style={{ opacity: 0.1 + (i * 0.06) }}></div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-mono text-[0.6rem] uppercase opacity-50">MTWTFSS</span>
        <span className="font-mono text-[0.6rem] uppercase bg-white/10 px-2 py-1 rounded">Next goal: 21</span>
      </div>
    </div>
  </motion.div>
);
